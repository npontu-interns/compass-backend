import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.MONGO_URI;

// The files does not seem to read .env properties. Stored the URI in a constant above as an alternative.

const connectDB = async () => {
  try {
const conn = await mongoose.connect(URI, {
  serverSelectionTimeoutMS: 5000
});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
