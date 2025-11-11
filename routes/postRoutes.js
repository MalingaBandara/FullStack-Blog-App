const express = require("express");
const { getPostForm, createPost } = require("../controllers/postController");
const postRoutes = express.Router();

const upload = require("../config/multer"); // * Import the Multer upload configuration (handles image uploads to Cloudinary)


//* Get post form
postRoutes.get("/add", getPostForm);


// * POST route to create a new post
//   - 'upload.array("image", 5)' allows uploading up to 5 images with the form field name 'image'
//   - After successful upload, the 'createPost' controller handles saving post data
postRoutes.post("/add", upload.array("image", 5), createPost);


module.exports = postRoutes;
