const express = require("express");
const { getPostForm, createPost } = require("../controllers/postController");
const postRoutes = express.Router();

const upload = require("../config/multer"); // * Import the Multer upload configuration (handles image uploads to Cloudinary)


const { ensureAuthenticated } = require("../middlewares/auth"); // * Import the middleware that checks if a user is logged in


//? Get post form
postRoutes.get("/add", getPostForm);


//?  POST route to create a new post
postRoutes.post(
    "/add",
    
    // * ensureAuthenticated → only logged-in users can create posts
    ensureAuthenticated,         

    // * upload.array("image", 5) → upload up to 5 images from input name="image"
    upload.array("image", 5),    

    // * createPost → controller function that saves the post in the database
    createPost
);


module.exports = postRoutes;
