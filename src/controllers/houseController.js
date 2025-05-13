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