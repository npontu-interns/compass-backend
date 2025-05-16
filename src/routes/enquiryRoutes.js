//enquiryRoutes.js
// This file handles routes related to property enquiries
import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiriesByHouse,
  updateEnquiryStatus
} from '../controllers/enquiryController.js';
import {
  createEnquiryValidation,
  updateStatusValidation
} from '../middleware/enquiryValidation.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create an enquiry
router.post('/', createEnquiryValidation,createEnquiry);

// Get all enquiries (admin-only)
router.get('/', getEnquiries);

// Get enquiries for a specific house
router.get('/house/:houseId', getEnquiriesByHouse);

// Update enquiry status (protected route)
router.patch(
  '/:enquiryId/status',
  authMiddleware,               // 1. Verify authentication
  updateStatusValidation,       // 2. Validate input
  updateEnquiryStatus           // 3. Process update
);


export default router;