
// * Import the v2 version of the Cloudinary library for image and media management
const cloudinary = require('cloudinary').v2;

// * Configure Cloudinary credentials using environment variables for security
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,   // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,   // API key for authentication
  api_secret: process.env.CLOUDINARY_SECRET, // API secret for secure access
});

// * Export the configured Cloudinary instance to use in other modules
module.exports = cloudinary;
