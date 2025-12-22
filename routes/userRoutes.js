
const express = require("express");// * Import Express framework
const userRoutes = express.Router(); // * Create a new router instance for user-related routes
const { ensureAuthenticated } = require("../middlewares/auth"); // * Import authentication middleware to protect routes
const { getUserProfile, getEditProfileForm } = require("../controllers/userController"); // * Import controller function to handle user profile logic


//! Get User Profile Route
// * GET request to '/profile'
// * ensureAuthenticated middleware ensures only logged-in users can access profile page
// * getUserProfile controller fetches user data and renders the profile view
userRoutes.get( "/profile", ensureAuthenticated , getUserProfile );


//! Get Edit User Profile Form
userRoutes.get( "/edit", ensureAuthenticated, getEditProfileForm );


module.exports = userRoutes; // * Export user routes to be used in main app