

// * Import multer — a middleware used for handling multipart/form-data (mainly for file uploads)
const multer = require('multer');

// * Import Cloudinary storage engine for multer
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// * Import the configured Cloudinary instance (where credentials are set up)
const cloudinary = require('./cloudinary');


// * Create a new Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary, // Cloudinary instance to connect uploads to your Cloudinary account
    params: {
        folder: 'blog-app', // Folder name in your Cloudinary dashboard where images will be stored
        allowed_formats: ['jpeg', 'png', 'jpg'] // Allowed image formats for upload
    }
});


// * Initialize multer with the Cloudinary storage engine
const upload = multer({ storage });


// * Export the configured upload middleware to be used in routes
module.exports = upload;
