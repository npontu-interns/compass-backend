<<<<<<< HEAD
import House from '../models/House.js';
import { validationResult } from 'express-validator';

export const getAvailableHouses = async (req, res) => {
  try {
    const { minLuxury = 1, maxLuxury = 10, location } = req.query;

    const filter = { 
      is_available: true,
      luxury_index: { $gte: Number(minLuxury), $lte: Number(maxLuxury) } 
    };

    if (location) filter.location = { $regex: location, $options: 'i' };

    const houses = await House.find(filter).sort({ luxury_index: -1 });
    
    res.status(200).json({
      success: true,
      count: houses.length,
      data: houses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getHouses = async (req, res) => {
  try {
    const { location, minBedrooms, maxBedrooms, minPrice, maxPrice } = req.query;
    const filter = {};
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (minBedrooms || maxBedrooms) {
      filter.bedrooms = {};
      if (minBedrooms) filter.bedrooms.$gte = Number(minBedrooms);
      if (maxBedrooms) filter.bedrooms.$lte = Number(maxBedrooms);
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const houses = await House.find(filter).sort({ price: 1 });

    res.status(200).json({
      success: true,
      count: houses.length,
      data: houses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await House.findById(req.params.propertyId);
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Property not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid property ID format' 
      });
    }
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const createHouse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newHouse = await House.create({
      ...req.body,
      location: req.body.location.trim(),
      is_available: req.body.is_available !== false, // Default true
      images: req.body.images || []
    });

    res.status(201).json({
      success: true,
      data: newHouse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const updateHouse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { propertyId } = req.params; // Changed from id
    const updates = req.body;

    const protectedFields = ['_id', 'createdAt', 'updatedAt'];
    protectedFields.forEach(field => delete updates[field]);

    if (updates.location) updates.location = updates.location.trim();

    const updatedHouse = await House.findByIdAndUpdate(
      propertyId, // Changed from id
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedHouse) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedHouse
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid property ID format' 
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const { propertyId } = req.params; // Changed from id

    const house = await House.findById(propertyId);
    if (!house) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    house.is_available = !house.is_available;
    await house.save();

    res.status(200).json({
      success: true,
      data: {
        id: house._id,
        is_available: house.is_available,
        message: `Availability set to ${house.is_available ? 'available' : 'booked'}`
      }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid property ID format' 
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const deleteHouse = async (req, res) => {
  try {
    const house = await House.findByIdAndDelete(req.params.propertyId);

    if (!house) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid property ID format' 
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
=======
const getAvailableHouses = async (req, res) => {
    const { minLuxury = 1, maxLuxury = 10, location } = req.query;
  
    const filter = { 
      is_available: true,
      luxury_index: { $gte: minLuxury, $lte: maxLuxury } 
    };
  
    if (location) filter.location = { $regex: location, $options: 'i' }; // Case-insensitive search
  
    const houses = await House.find(filter).sort({ luxury_index: -1 }); // Highest luxury first
    res.json(houses);
  };
>>>>>>> 83794d350c442575157c847adb1393137b6596fe
