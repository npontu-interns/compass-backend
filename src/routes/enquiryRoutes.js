import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiriesByHouse,
  updateEnquiryStatus
} from '../controllers/enquiryController.js';

const router = express.Router();

// Create an enquiry
router.post('/', createEnquiry);

// Get all enquiries (admin-only)
router.get('/', getEnquiries);

// Get enquiries for a specific house
router.get('/house/:houseId', getEnquiriesByHouse);

// Update enquiry status (e.g., "contacted")
router.patch('/:id/status', updateEnquiryStatus);

export default router;