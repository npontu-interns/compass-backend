import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv with the correct path to .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Test environment variables
console.log('Testing environment variables:');
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('MONGODB_USERNAME:', process.env.MONGODB_USERNAME);
console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);

// Check if any variables are undefined
const requiredVars = ['JWT_SECRET', 'MONGODB_URI', 'MONGODB_USERNAME', 'MONGODB_PASSWORD'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('\nMissing required environment variables:');
    missingVars.forEach(varName => console.error(`- ${varName}`));
    console.error('\nPlease check your .env file and make sure all required variables are set.');
} else {
    console.log('\nAll required environment variables are set!');
} 