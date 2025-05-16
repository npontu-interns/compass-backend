// src/controllers/userController.js
import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Add other controller methods as needed
export const updateProfile = async (req, res) => { /*...*/ };
export const updateProfilePicture = async (req, res) => { /*...*/ };
export const deleteAccount = async (req, res) => { /*...*/ };