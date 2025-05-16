//authRoutes.js
// This file handles authentication routes for user registration and login
import express from 'express';
import {
  registerUser,
  registerAdmin,
  login
} from '../controllers/authController.js';
import upload from '../utils/uploadMiddleware.js';

const router = express.Router();

router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/register/admin', upload.single('profilePicture'), registerAdmin);
router.post('/login', login);

export default router;