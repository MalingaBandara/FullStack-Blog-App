
const asyncHandler = require("express-async-handler");// * Import async handler to automatically catch async errors
const User = require("../models/User");
const Post = require("../models/Post");
const File = require("../models/File");
const Comment = require("../models/Comment");
const cloudinary = require("../config/cloudinary");

//! Get User Profile
exports.getUserProfile = asyncHandler(async (req, res) => {
    
    // * Fetch the currently logged-in user by ID
    // * Exclude the password field for security reasons
    const user = await User.findById( req.user._id ).select("-password");

    // * If user is not found, redirect to login page with an error
    if( !user ){ 
        return res.render( "login", {
            title: "Login",
            user: req.user,
            error: "User not found"
        } );
    }

    // * Fetch all posts created by this user
    const posts = await Post.find( { author: user._id } ).sort({ createdAt : -1, });// * Sort posts by newest first using createdAt field
    
    // * Render the profile page
    // * Send user info, user's posts, and total post count to the view
    res.render( "profile", {
        title: "Profile",
        user,
        posts,                      // * All posts created by the user
        postCount: posts.length,    // * Total number of posts
    } );

    
});



//! Get Edit Profile Form
exports.getEditProfileForm = asyncHandler(async (req, res) => {

    // * Fetch the currently logged-in user by ID
    // * Exclude the password field for security reasons
    const user = await User.findById(req.user._id).select("-password");

    // * If user is not found, redirect to login page with an error
    if (!user) {
        return res.render("login", {
            title: "Login",        // * Page title
            user: req.user,        // * Current session user (if any)
            error: "User not found"
        });
    }

    // * Render the edit profile form
    // * Pass user data to pre-fill form fields
    res.render("editProfile", {
        title: "Edit Profile",   // * Page title
        user,                    // * Logged-in user's data
    });

});



//! Update Profile
exports.updateProfile = asyncHandler(async (req, res) => {

    const { username, email, bio } = req.body; // * Extract updated profile fields from the request body
    const user = await User.findById(req.user._id).select("-password"); // * Fetch the currently logged-in user by ID without password

    // * If user is not found, redirect to login page with an error
    if (!user) {
        return res.render("login", {
            title: "Login",        // * Page title
            user: req.user,        // * Current session user (if any)
            error: "User not found"
        });
    }

    // * Update basic profile fields only if new values are provided
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    
    // * Check if a new profile picture was uploaded
    if (req.file) {

        // * If user already has a profile picture, delete it from Cloudinary
        if (user.profilePicture && user.profilePicture.public_id) {
            await cloudinary.uploader.destroy(user.profilePicture.public_id);
        }

        const file = new File({ // * Create a new File document for the uploaded profile picture
            url: req.file.path,             // * Cloudinary image URL
            public_id: req.file.filename,   // * Cloudinary public ID
            uploaded_by: req.user._id       // * User who uploaded the image
        });

        await file.save(); // * Save image metadata in MongoDB

        user.profilePicture = { url: file.url, public_id: file.public_id };// * Attach new profile picture details to the user document
    }

    await user.save(); // * Save updated user profile to MongoDB

    // * Re-render edit profile page with success message
    res.render("editProfile", {
        title: "Edit Profile", // * Page title
        user,                  // * Updated user data
        success: "Your profile has been updated successfully."
    });
});



//! Delete User Account
exports.deleteUserAccount = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);// * Find the currently logged-in user by ID

    // * If user does not exist, redirect to login page with error
    if (!user) {
        return res.render("login", {
            title: "Login",        // * Page title
            user: req.user,        // * Current session user (if any)
            error: "User not found"
        });
    }


    //? ---------------- Delete profile picture ----------------
    if (user.profilePicture && user.profilePicture.public_id) { // * If user has a profile picture, delete it from Cloudinary
        await cloudinary.uploader.destroy(user.profilePicture.public_id);
    }


    //? ---------------- Delete user's posts ----------------
    const posts = await Post.find({ author: req.user._id });// * Fetch all posts created by this user

    // * Loop through each post to clean up related resources
    for (const post of posts) {

        for (const image of post.images) {// * Delete all images related to the post from Cloudinary
            await cloudinary.uploader.destroy(image.public_id);
        }

        await Comment.deleteMany({ post: post._id });// * Delete all comments related to this post
        await Post.findByIdAndDelete(post._id); // * Delete the post itself
    }


    //? ---------------- Handle user's comments on OTHER posts ----------------
    await Comment.deleteMany({ author: req.user._id }); // * Delete all comments written by the user on other posts


    //? ---------------- Delete uploaded files ----------------
    const files = await File.find({ uploaded_by: req.user._id }); // * Fetch all files uploaded by this user

    // * Delete each uploaded file from Cloudinary and MongoDB
    for (const file of files) {
        await cloudinary.uploader.destroy(file.public_id); // * Remove file from Cloudinary
        await File.findByIdAndDelete(file._id);             // * Remove file record from MongoDB
    }


    //? ---------------- Delete user ----------------
    await User.findByIdAndDelete(req.user._id); // * Finally, delete the user account from MongoDB

    
    //? ---------------- Logout & destroy session ----------------
    req.logout((err) => { // * Log the user out and destroy the session
        if (err) {
            return next(err); // * Handle logout error
        }
        req.session.destroy((err) => {  // * Destroy session completely after logout
            if (err) {
                return next(err); // * Handle session destroy error
            }
            res.redirect("/auth/register");// * Redirect user to registration page after account deletion
        });
    });

});
