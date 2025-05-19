<<<<<<< HEAD
import mongoose from 'mongoose';
=======
const mongoose = require('mongoose');
>>>>>>> 83794d350c442575157c847adb1393137b6596fe

const HouseSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  is_available: {
    type: Boolean,
    default: true
  },
  cost_range: {
    type: String,
    enum: ['budget', 'mid-range', 'luxury'],
    required: true
  },
  luxury_index: {  // Numeric scale (e.g., 1-10)
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  images: {
    type: [String],  // Array of image URLs
    validate: [arrayLimit, 'Maximum 10 images allowed'],
    default: []
  }
}, { timestamps: true });

// Custom validator for images array
function arrayLimit(val) {
  return val.length <= 10;
}

<<<<<<< HEAD
export default mongoose.model('House', HouseSchema);
=======
module.exports = mongoose.model('House', HouseSchema);
>>>>>>> 83794d350c442575157c847adb1393137b6596fe
