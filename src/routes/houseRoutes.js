import express from 'express';
import {
  createHouse,
  getHouses,
  getHouseById,
  updateHouse,
  deleteHouse,
  getAvailableHouses,
  toggleAvailability
} from '../controllers/houseController.js';

const router = express.Router();

// Create a new house
router.post('/', createHouse);

// Get all houses (with optional filters)
router.get('/', getHouses);

// Get available houses (filter by location/luxury)
router.get('/available', getAvailableHouses);

// Get single house by ID
router.get('/:id', getHouseById);

// Update a house
router.patch('/:id', updateHouse);

// Toggle availability
router.patch('/:id/availability', toggleAvailability);

// Delete a house
router.delete('/:id', deleteHouse);

export default router;