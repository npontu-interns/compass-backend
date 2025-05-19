<<<<<<< HEAD
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import indexRouter from './routes/index.js';
// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
import connectDB from './db/connection.js';
import 'dotenv/config';

const app = express();

// 1. Enhanced Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests
});
app.use('/api/', limiter);

// 2. Route Ordering (Most specific first)
app.use('/', indexRouter); // Base routes first
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);

// 3. Centralized Error Handling
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  
  // Handle JWT errors separately
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 4. Database & Server Startup
connectDB()
  .then(() => {
    const port = process.env.PORT || 3001;
    const server = app.listen(port, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
    });

    // Handle unhandled rejections
    process.on('unhandledRejection', (err) => {
      console.error('[UNHANDLED REJECTION]', err);
      server.close(() => process.exit(1));
    });
  })
  .catch(err => {
    console.error('[FATAL] Database connection failed:', err);
    process.exit(1);
  });

export default app;
=======
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const connectDB = require('./db/connection');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).type('text/plain').send('Something broke!');
});

// Connect to MongoDB before starting server
connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}).catch(err => {
  console.error('Failed to connect to DB:', err);
});

module.exports = app;
>>>>>>> 83794d350c442575157c847adb1393137b6596fe
