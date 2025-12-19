
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const passport = require('passport'); // * Import Passport.js for authentication handling
// Passport provides strategies (like local, JWT, OAuth) to authenticate users in Node.js apps


// * asyncHandler: wraps async route functions and automatically forwards errors to Express, so we don’t need try/catch blocks.
const asyncHandler = require("express-async-handler");


// * Render Login Page
exports.getLogin =  asyncHandler( (req, res) => {
  // Renders the "login.ejs" file inside your "views" folder
  res.render('login', {
    title: 'Login',    // Page title
    user: req.user,   // Current session user (if available)
    error: ""
  });
}
);


//! Main logic for user Login
exports.login = asyncHandler ( async (req, res, next) => {

  // * Use Passport's local strategy for authentication
  passport.authenticate("local", (err, user, info) => {

    // 🔹 If there's an unexpected error (e.g., DB error), forward it
    if (err) {
      return next(err);
    }

    // 🔹 If authentication fails (invalid email/password), show login page with error
    if (!user) {
      return res.render("login", { 
        title: "Login", 
        user: req.user, 
        error: info.message // Display Passport's message (like "No user" or "Password incorrect")
      });
    }

    // 🔹 Log the user in (establish a session)
    req.logIn(user, (err) => {
      if (err) {
        return next(err); // Forward login error if occurs
      }

      // 🔹 On successful login, redirect to Profile page
      return res.redirect("/user/profile");
    });

  })(req, res, next); // * Immediately invoke the authenticate middleware with req, res, next

}
);


//* Register Page
exports.getRegister = asyncHandler( (req, res) => {
  // Renders the "register.ejs" file inside your "views" folder
  res.render('register', {
    title: 'Register',    // Page title
    user: req.user,   // Current session username (if available)
    error: ""
  });
}
);


//! Main logic for user registration
exports.register = asyncHandler( async (req, res) => {
  
  // Extract fields from request body
  const { username, email, password } = req.body;

  try {
    // 🔍 Check if user already exists by email
    const existingUser = await User.findOne({ email });

    // If user already exists, render the register page again with an error message
    if (existingUser) {
      return res.render('register', {
        title: 'Register',       // Page title
        user: req.user,      // Current session user(if available)
        error: 'User already exists', // Message displayed on frontend
      });
    }

    //? Hash the password before saving (for security)
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    // Create a new user record in the database
    const user = await User.create({
      username,             // Username entered by the user
      email,                // Email entered by the user
      password: hashedPassword, // Store the hashed password
    });

    // After successful registration, redirect the user to the login page
    res.redirect('/auth/login');

  } catch (error) {
    
    // If any error occurs (e.g., database issue), re-render register page with error details
    res.render('register', {
      title: 'Register',     // Page title
      user: req.user,    // Current session user (if available)
      error: error.message,  // Error message to display
    });

  }
  
}
);


//* Logout
// Exporting the logout function so it can be used in route files
exports.logout = asyncHandler( (req, res) => {
  
  // Call Passport's built-in logout method to end the user's session
  req.logout((err) => {
    
    // If an error occurs during logout, pass it to the next middleware (error handler)
    if (err) {
      return next(err);
    }

     req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      // Clear the cookie from the client side (important!)
      res.clearCookie('connect.sid', { path: '/' });

      // Redirect the user to login page after full logout
      res.redirect('/auth/login');
    });
  });
}
);
