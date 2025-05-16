import Enquiries from '../models/Enquiries.js';
import House from '../models/House.js';
import {validationResult } from 'express-validator';

// 1. Create New Enquiry
export const createEnquiry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { house_id, email, telephone } = req.body;

    // Verify house exists
    const houseExists = await House.exists({ _id: house_id });
    if (!houseExists) {
      return res.status(404).json({ 
        success: false,
        error: 'House not found' 
      });
    }

    // Validate at least one contact method exists
    if (!email && !telephone) {
      return res.status(400).json({
        success: false,
        error: 'Email or telephone required'
      });
    }

    const newEnquiry = await Enquiry.create({
      ...req.body,
      status: 'pending' // Default status
    });

    res.status(201).json({
      success: true,
      data: newEnquiry
    });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid House ID format' });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// 2. Get All Enquiries (Admin)
export const getEnquiries = async (req, res) => {
  try {
    const { status, sort } = req.query;
    const filter = {};
    const sortOption = { createdAt: -1 }; // Newest first by default

    if (status) filter.status = status;
    if (sort === 'oldest') sortOption.createdAt = 1;

    const enquiries = await Enquiry.find(filter)
      .sort(sortOption)
      .populate('house_id', 'location cost_range'); // Include house details

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// 3. Get Enquiries for Specific House
export const getEnquiriesByHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    const enquiries = await Enquiry.find({ house_id: houseId })
      .sort({ createdAt: -1 })
      .populate('house_id', 'location');

    if (!enquiries.length) {
      return res.status(404).json({
        success: false,
        error: 'No enquiries found for this property'
      });
    }

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid House ID format' });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// 4. Update Enquiry Status
export const updateEnquiryStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'contacted', 'rejected', 'booked'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Use: ${validStatuses.join(', ')}`
      });
    }

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        error: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedEnquiry
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Enquiry ID format' });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};