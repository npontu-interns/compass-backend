import mongoose from 'mongoose';
import House from '../models/House.js';

import dotenv from 'dotenv';

dotenv.config();


const seedProperties = [
    {
      title: 'Cozy 2-Bedroom Apartment',
      description: 'Perfect for a small family, close to downtown with easy access to transportation.',
      price: 1200,
      location: 'New York, NY',
      is_available: true,
      luxury_index: 6,
    },
    {
      title: 'Modern Studio in City Center',
      description: 'Ideal for young professionals, includes free Wi-Fi and gym access.',
      price: 950,
      location: 'San Francisco, CA',
      is_available: true,
      luxury_index: 6,
    },
    {
      title: 'Spacious 4-Bedroom House',
      description: 'Includes backyard, garage, and pet-friendly policy.',
      price: 2500,
      location: 'Austin, TX',
      is_available: false,
      luxury_index: 8,
    },
    {
      title: 'Beachside Condo with Ocean View',
      description: 'Wake up to the sound of waves. Includes parking and 24/7 security.',
      price: 1800,
      location: 'Miami, FL',
      is_available: true,
      luxury_index: 7,
    },
    {
      title: 'Affordable Basement Room',
      description: 'Private entrance and utilities included.',
      price: 600,
      location: 'Chicago, IL',
      is_available: true,
      luxury_index: 5,
    },
    {
      title: 'Luxury Penthouse Suite',
      description: 'Top floor with full skyline view and rooftop pool.',
      price: 5000,
      location: 'Los Angeles, CA',
      luxury_index: 9,
      is_available: true,
    },
  ];









  // Adding the properties(Houses) to the database,

  //These are just in an Array, Although we could use an API to generate.

  MONGO_URI = process.env.MONGO_URI;

  async function seedDB() {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      await House.deleteMany({});
      await House.insertMany(seedProperties);
      console.log('Database loaded successfully with properties');
    } catch (err) {
      console.error('Seed failed:', err);
    } finally {
      mongoose.connection.close();
    }
  }
  
  seedDB();

