import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth';
import client from '../config/weaviate';
import { classes } from '../models/WeaviateModels';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, gender, profileFor } = req.body;

    // Validate required fields
    if (!name || !email || !password || !gender || !profileFor) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Validate password strength (minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUsers = await client.graphql
      .get()
      .withClassName(classes.USER)
      .withFields('email')
      .withWhere({
        path: ['email'],
        operator: 'Equal',
        valueString: email.toLowerCase()
      })
      .do();

    if (existingUsers.data?.Get?.User?.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user in Weaviate
    const result = await client.data
      .creator()
      .withClassName(classes.USER)
      .withProperties({
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: 'user',
        gender,
        profileFor,
        profileComplete: false,
        verified: false,
        active: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      })
      .do();

    const userId = result.id;

    // Generate JWT token
    const token = jwt.sign(
      {
        userId,
        email: email.toLowerCase(),
        name,
        role: 'user'
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );

    // Return user data (without password)
    const user = {
      id: userId,
      name,
      email: email.toLowerCase(),
      gender,
      profileFor,
      profileComplete: false,
      role: 'user'
    };

    res.status(201).json({
      success: true,
      data: {
        user,
        token
      },
      message: 'Registration successful'
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Registration failed'
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find user by email
    const result = await client.graphql
      .get()
      .withClassName(classes.USER)
      .withFields('name email passwordHash role gender profileFor profileComplete verified active _additional { id }')
      .withWhere({
        path: ['email'],
        operator: 'Equal',
        valueString: email.toLowerCase()
      })
      .do();

    const users = result.data?.Get?.User || [];

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    const userData = users[0];
    const userId = (userData as any)._additional?.id;

    // Check if account is active
    if (!userData.active) {
      return res.status(403).json({
        success: false,
        error: 'Account has been deactivated'
      });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, userData.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Update last login
    await client.data
      .updater()
      .withId(userId)
      .withClassName(classes.USER)
      .withProperties({
        lastLogin: new Date().toISOString()
      })
      .do();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId,
        email: userData.email,
        name: userData.name,
        role: userData.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );

    // Return user data (without password)
    const user = {
      id: userId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      profileComplete: userData.profileComplete || false
    };

    res.json({
      success: true,
      data: {
        user,
        token
      },
      message: 'Login successful'
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Login failed'
    });
  }
});

// Verify token (protected route)
router.get('/verify', authenticate, async (req: any, res) => {
  try {
    // Get full user data from database
    const result = await client.graphql
      .get()
      .withClassName(classes.USER)
      .withFields('name email role profileComplete verified active')
      .withWhere({
        path: ['email'],
        operator: 'Equal',
        valueString: req.user.email
      })
      .do();

    const users = result.data?.Get?.User || [];

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    const userData = users[0];

    res.json({
      success: true,
      data: {
        user: {
          id: req.user.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          profileComplete: userData.profileComplete || false
        }
      }
    });
  } catch (error: any) {
    console.error('Verify error:', error);
    res.status(401).json({
      success: false,
      error: error.message || 'Token verification failed'
    });
  }
});

// Logout user
router.post('/logout', authenticate, async (_req, res) => {
  try {
    // TODO: Invalidate token in database
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Logout failed'
    });
  }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    // TODO: Send password reset email
    res.json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to send reset email'
    });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        error: 'Token and password are required'
      });
    }

    // TODO: Verify token and update password
    res.json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Password reset failed'
    });
  }
});

export default router;
