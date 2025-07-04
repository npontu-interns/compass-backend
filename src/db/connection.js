<<<<<<< HEAD
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
const conn = await mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
=======
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove deprecated options in Mongoose 6+
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
>>>>>>> 83794d350c442575157c847adb1393137b6596fe
