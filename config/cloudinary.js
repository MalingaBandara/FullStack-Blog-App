// * Import the 'model' function from Mongoose (not used here, but often needed for defining models)
const { model } = require('mongoose');

// * Import the v2 version of the Cloudinary library
const cloudinary = require('cloudinary').v2;

// * Configure Cloudinary using environment variables for security
//   These credentials are stored in your .env file, not hard-coded in the codebase
module.exports = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // Cloudinary account name
    api_key: process.env.CLOUDINARY_API_KEY, // API key for authentication
    api_secret: process.env.CLOUDINARY_SECRET, // Secret key for secure API calls
});
