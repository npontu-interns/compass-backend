<<<<<<< HEAD
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
=======
const express = require('express');
const router = express.Router();
const { getHome } = require('../controllers/index');
const houseRoutes = require('./houseRoutes');
const enquiryRoutes = require('./enquiryRoutes');
const mongoose = require('mongoose');

// Database Connection (Move this to a separate file like db/connection.js)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/house_booking_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Home Route (Keep this if you need a landing page)
router.get('/', getHome);

// API Routes (Versioned for consistency)
router.use('/api/v1/houses', houseRoutes);
router.use('/api/v1/enquiries', enquiryRoutes);

// 404 Handler (Catch-all for undefined routes)
router.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = router;
>>>>>>> 83794d350c442575157c847adb1393137b6596fe
