//index.js
//This file serves as the main entry point for the API, setting up the server and connecting to the database.
import express from 'express';
import houseRoutes from './houseRoutes.js';
import enquiryRoutes from './enquiryRoutes.js';
import authRoutes from './authRoutes.js';  // Added missing import
import userRoutes from './userRoutes.js';  // Added missing import

const router = express.Router();

// Essential middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// API Routes
router.use('/api/v1/auth', authRoutes);    // Added auth routes
router.use('/api/v1/users', userRoutes);   // Added user routes
router.use('/api/v1/houses', houseRoutes);
router.use('/api/v1/enquiries', enquiryRoutes);

// 404 Handler
router.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

export default router;