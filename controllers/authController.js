
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// * Render Login Page
exports.getLogin = (req, res) => {
  // Renders the "login.ejs" file inside your "views" folder
  res.render('login');
};


//! Main logic for user Login
exports.login = async (req, res) => {
  
  const { email, password } = req.body; // Extract email and password from request body

  try {
    // 🔍 Check if user with the given email exists in the database
    const user = await User.findOne({ email });

    // 🔍 Check if there is any user with the given password
    // (⚠️ Note: This only checks if password exists in DB, not tied to the above user)
    const isMatch = await User.findOne({ password });

    // ✅ If both email and password exist
    if (user && isMatch) {
      res.send('User logged in successfully'); // Success response
    } else {
      res.status(401).send('Invalid email or password'); // Failure response
    }

  } catch (error) {
    console.error("Error logging in user:", error); // Log server-side error
    res.status(500).send('Error logging in user');   // Send error response
  }

};


//* Register Page
exports.getRegister = (req, res) => {
  // Renders the "register.ejs" file inside your "views" folder
  res.render('register');
};


//! Main logic for user registration
exports.register = async (req, res) => {
  
  // Extract fields from request body
  const { username, email, password } = req.body;

  try {
    // 🔍 Check if user already exists by email
    const existingUser = await User.findOne({ email });

    // If user already exists, render the register page again with an error message
    if (existingUser) {
      return res.render('register', {
        title: 'Register',       // Page title
        user: req.username,      // Current session username (if available)
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
    res.redirect('auth/login');

  } catch (error) {
    
    // If any error occurs (e.g., database issue), re-render register page with error details
    res.render('register', {
      title: 'Register',     // Page title
      user: req.username,    // Current session username (if available)
      error: error.message,  // Error message to display
    });

  }
  
};