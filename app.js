// ---------------- Load Environment Variables ----------------
// Load variables (like MONGODB_URL) from a .env file into process.env
require('dotenv').config();

// ---------------- Import Dependencies ----------------
const express = require('express');     // Express for creating the HTTP server
const app = express();                  // Initialize an Express application
const mongoose = require('mongoose');   // Mongoose for connecting to MongoDB
const User = require('./models/User');


// ---------------- Server Configuration ----------------
const PORT = process.env.PORT || 3000;  // Use PORT from .env or default to 3000


// ---------------- Setup EJS View Engine ----------------
app.set('view engine', 'ejs');  // Tells Express to use EJS for rendering views


//? ---------------- Middleware: Passing form data ----------------
app.use(express.urlencoded({ extended: true }));


//! ----------------  Routes ---------------- 

// * Login Page
app.get('/auth/login', (req, res) => {
  // Renders the "login.ejs" file inside your "views" folder
  res.render('login');
});


//* Register Page
app.get('/auth/register', (req, res) => {
  // Renders the "register.ejs" file inside your "views" folder
  res.render('register');
})



//! ----- Main logic for user Login ------
app.post('/auth/login', async (req, res) => {
  
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

});



//! ----- Main logic for user registration ------
app.post('/auth/register', async (req, res) => {
  
  // Extract fields from request body
  const { username, email, password } = req.body;

  try {
    // 🔍 Check if user already exists by email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send('User with this email already exists');
    }

    // ✨ Create a new user document
    const newUser = new User({ username, email, password });

    // 💾 Save user to MongoDB
    await newUser.save();

    // ✅ After successful registration → redirect to login page
    res.redirect('/auth/login');
    
  } catch (error) {
    // ❌ Handle any server/database errors
    console.error("Error registering user:", error);
    res.status(500).send('Error registering user');
  }
  
});



//! ---------------- Database Connection ----------------
// Connect to MongoDB using the URL stored in the .env file
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('✅ Database connection successful'); // Log success message
  })
  .catch((err) => {
    console.log('❌ Database connection failed', err); // Log failure + error details
  });



//! ---------------- Start Server ----------------
// Start the Express server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
