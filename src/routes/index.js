const express = require('express');
const router = express.Router();
const { getHome } = require('../controllers/index');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
router.get('/', getHome);

module.exports = router;