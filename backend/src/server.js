require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   Lovable Matrimony API Server Started   ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('Available Routes:');
  console.log('  - POST   /api/auth/register');
  console.log('  - POST   /api/auth/login');
  console.log('  - GET    /api/auth/me');
  console.log('  - GET    /api/profiles/me');
  console.log('  - PUT    /api/profiles/me');
  console.log('  - GET    /api/profiles/:id');
  console.log('  - POST   /api/profiles/search');
  console.log('  - GET    /api/matches');
  console.log('  - POST   /api/interests');
  console.log('  - GET    /api/interests');
  console.log('  - PUT    /api/interests/:id');
  console.log('  - POST   /api/profile-views');
  console.log('  - GET    /api/profile-views');
  console.log('  - GET    /api/notifications');
  console.log('  - PUT    /api/notifications/:id/read');
  console.log('  - GET    /api/settings');
  console.log('  - PUT    /api/settings');
  console.log('  - GET    /api/dashboard/stats');
  console.log('');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});
