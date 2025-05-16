import House from '../models/House.js';

// 1. Verify House Ownership
export const checkHouseOwnership = async (req, res, next) => {
  try {
    const house = await House.findById(req.params.propertyId);
    
    if (!house) {
      return res.status(404).json({ 
        success: false,
        error: 'Property not found' 
      });
    }

    if (house.owner.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        error: 'Not authorized to modify this property' 
      });
    }

    req.house = house; // Attach to request for controller
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// 2. Image Upload Validation
export const validateImages = (req, res, next) => {
  if (!req.files || req.files.length > 10) {
    return res.status(400).json({ error: '1-10 images required' });
  }
  next();
};