//userRoutes.js
//This file handles user-related routes, including profile management and account deletion.
import express from 'express';
import {
  getUserProfile,
  updateProfile,
  updateProfilePicture,
  deleteAccount
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../utils/uploadMiddleware.js';

const router = express.Router();

// Apply auth middleware to all user routes
router.use(authMiddleware);

// User profile operations
router.route('/')
  .get(getUserProfile)
  .patch(updateProfile)
  .delete(deleteAccount);

// Profile picture update
router.route('/picture')
  .patch(upload.single('profilePicture'), updateProfilePicture);

export default router;