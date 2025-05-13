const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  house_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House',  // Reference to the House model
    required: [true, 'House reference is required']
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        // Email or phone must exist (custom logic)
        return v || this.telephone;
      },
      message: 'Either email or telephone must be provided'
    },
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  telephone: {
    type: String,
    validate: {
      validator: function(v) {
        // Email or phone must exist (custom logic)
        return v || this.email;
      },
      message: 'Either telephone or email must be provided'
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  message: {
    type: String,
    required: true,
    maxlength: [1000, 'Message too long']
  }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', EnquirySchema);