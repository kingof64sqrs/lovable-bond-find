import express from 'express';
import { authenticate } from '../middleware/auth';

const router = express.Router();

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

    // TODO: Hash password and save to database
    // For now, return mock user with token
    const user = {
      id: Date.now().toString(),
      name,
      email,
      gender,
      profileFor,
      profileComplete: false,
      createdAt: new Date().toISOString()
    };

    const token = `mock_token_${user.id}`;

    res.status(201).json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Registration failed'
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

    // TODO: Verify credentials from database
    // For now, return mock user with token
    const user = {
      id: '1',
      name: 'Rahul Kumar',
      email,
      profileComplete: true,
      createdAt: new Date().toISOString()
    };

    const token = `mock_token_${user.id}`;

    res.json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

// Verify token (protected route)
router.get('/verify', authenticate, async (req: any, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token'
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
