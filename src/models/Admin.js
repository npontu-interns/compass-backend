import mongoose from 'mongoose';  // Add this import
import User from './User.js';

const adminSchema = User.schema.clone();
adminSchema.add({
  role: {
    type: String,
    default: 'admin',
    immutable: true
  },
  adminPrivileges: {
    type: [String],
    default: ['manage-users', 'manage-properties']
  }
});

export default mongoose.model('Admin', adminSchema);