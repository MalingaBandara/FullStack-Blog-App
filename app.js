// ---------------- Load Environment Variables ----------------
// Load variables (like MONGODB_URL) from a .env file into process.env
require('dotenv').config();

// ---------------- Import Dependencies ----------------
const express = require('express');     // Express for creating the HTTP server
const app = express();                  // Initialize an Express application
const mongoose = require('mongoose');   // Mongoose for connecting to MongoDB


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


//! ----- Main logic for user registration ------
app.post('/auth/register', async(req, res) => {

  // Log the form data
  console.log( req.body );

  res.send('User registered successfully!');

})


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
