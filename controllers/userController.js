
const asyncHandler = require("express-async-handler");// * Import async handler to automatically catch async errors
const User = require("../models/User");
const Post = require("../models/Post");

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
