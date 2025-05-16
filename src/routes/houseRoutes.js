//enquiryRoutes.js
// This file handles routes related to property enquiries
import express from 'express';
import {
  createHouse,
  getHouses,
  getPropertyById,
  updateHouse,
  deleteHouse,
  getAvailableHouses,
  toggleAvailability
} from '../controllers/houseController.js';
import { checkHouseOwnership, validateImages } from '../middleware/houseValidation.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// Create a new house
router.post('/', createHouse);

// Get all houses (with optional filters)
router.get('/', getHouses);

// Get available houses (filter by location/luxury)
router.get('/available', getAvailableHouses);

// 1. GET Single Property (Unprotected)
router.get('/:propertyId', getPropertyById);

// 2. UPDATE Property (Protected)
router.patch(
  '/:propertyId',
  authMiddleware,          // Verify authentication first
  checkHouseOwnership,     // Then verify ownership
  validateImages,         // Then validate uploads
  updateHouse             // Finally process update
);
// Toggle property availability (protected route)
router.patch(
  '/:propertyId/availability',
  authMiddleware,               // 1. Verify authentication
  checkHouseOwnership,          // 2. Verify ownership
  toggleAvailability            // 3. Process toggle
);


// Delete a house
router.delete(
  '/:propertyId',
  authMiddleware,
  checkHouseOwnership,
  deleteHouse
);


export default router;