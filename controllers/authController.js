
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
  
};