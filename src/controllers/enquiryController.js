const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  res.status(201).json(enquiry);
};


const createEnquiry = async (req, res) => {
    const { email, telephone, house_id } = req.body;
  
    if (!email && !telephone) {
      return res.status(400).json({ error: 'Email or telephone required' });
    }
  
    const houseExists = await House.exists({ _id: house_id });
    if (!houseExists) {
      return res.status(404).json({ error: 'House not found' });
    }
  
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json(enquiry);
  };