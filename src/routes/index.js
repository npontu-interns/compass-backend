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