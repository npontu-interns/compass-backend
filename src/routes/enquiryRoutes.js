<<<<<<< HEAD
//enquiryRoutes.js
// This file handles routes related to property enquiries
=======
>>>>>>> 83794d350c442575157c847adb1393137b6596fe
import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiriesByHouse,
  updateEnquiryStatus
} from '../controllers/enquiryController.js';
<<<<<<< HEAD
import {
  createEnquiryValidation,
  updateStatusValidation
} from '../middleware/enquiryValidation.js';
import authMiddleware from '../middleware/authMiddleware.js';
=======
>>>>>>> 83794d350c442575157c847adb1393137b6596fe

const router = express.Router();

// Create an enquiry
<<<<<<< HEAD
router.post('/', createEnquiryValidation,createEnquiry);
=======
router.post('/', createEnquiry);
>>>>>>> 83794d350c442575157c847adb1393137b6596fe

// Get all enquiries (admin-only)
router.get('/', getEnquiries);

// Get enquiries for a specific house
router.get('/house/:houseId', getEnquiriesByHouse);

<<<<<<< HEAD
// Update enquiry status (protected route)
router.patch(
  '/:enquiryId/status',
  authMiddleware,               // 1. Verify authentication
  updateStatusValidation,       // 2. Validate input
  updateEnquiryStatus           // 3. Process update
);

=======
// Update enquiry status (e.g., "contacted")
router.patch('/:id/status', updateEnquiryStatus);
>>>>>>> 83794d350c442575157c847adb1393137b6596fe

export default router;