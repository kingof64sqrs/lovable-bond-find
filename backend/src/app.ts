import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { initializeSchemas } from './models/WeaviateModels';
import adminRoutes from './routes/adminRoutes';
import referenceDataRoutes from './routes/referenceDataRoutes';
import userActivityRoutes from './routes/userActivityRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app: Express = express();

// Initialize Weaviate schemas and create admin user on startup
import createAdminUser from './scripts/createAdmin';
import fixUserSchema from './scripts/fixUserSchema';

initializeSchemas()
  .then(() => fixUserSchema())
  .then(() => createAdminUser())
  .catch((err: Error) => {
    console.error('Initialization error:', err.message);
  });

// Security middleware
app.use(helmet());

// CORS configuration - Allow all origins
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
console.log('✓ CORS enabled for all origins (0.0.0.0)');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Authentication routes (public)
app.use('/api/auth', authRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// Reference data routes
app.use('/api/reference', referenceDataRoutes);

// User activity routes
app.use('/api/user-activity', userActivityRoutes);

// User routes (profile, search, matches, etc.)
app.use('/api', userRoutes);

// 404 handler
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`
    }
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    }
  });
});

export default app;
