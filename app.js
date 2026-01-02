// ---------------- Load Environment Variables ----------------
// Load variables (like MONGODB_URL) from a .env file into process.env
require("dotenv").config();

// ---------------- Import Dependencies ----------------
const express = require("express"); // Express for creating the HTTP server
const app = express(); // Initialize an Express application
const mongoose = require("mongoose"); // Mongoose for connecting to MongoDB

// ✅ Serve static files from the "public" folder
app.use(express.static("public"));

const MongoStore = require("connect-mongo"); // * Store session data in MongoDB for persistence across server restarts

// Import express-session middleware to enable session management in Express.
//   This allows storing user data (like authentication info) across multiple requests,
//   which is essential for features such as user login persistence using Passport.js.
const session = require("express-session");

// Import the main Passport.js authentication library
// Passport helps manage user authentication (login, session handling, etc.)
const passport = require("passport");

// Import the custom Passport configuration file
// This file defines how users are authenticated (LocalStrategy, serialize/deserialize, etc.)
const passportConfig = require("./config/passport");

// ---------------- Server Configuration ----------------
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// ---------------- Setup EJS View Engine ----------------
app.set("view engine", "ejs"); // Tells Express to use EJS for rendering views

//? ---------------- Middlewares----------------

// ----------------  Passing form data ----------------
app.use(express.urlencoded({ extended: true }));

// -------- Session middleware — manages user sessions (login state) using cookies ------------
app.use(
  session({
    secret: "keyboard cat", // Secret key used to sign session ID cookies
    resave: false, // Prevents resaving session if nothing changed
    saveUninitialized: false, // Avoids creating empty sessions
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }), // Stores session data in MongoDB
  })
);

//* -------- Method override middleware — allows PUT and DELETE requests from forms ------------
const methodOverride = require("method-override");
// Register method-override middleware in Express
// It looks for a query parameter named "_method"
// Example: <form method="POST" action="/post/123?_method=DELETE">
app.use(methodOverride("_method"));

//* ---------------- Passport Configuration ----------------
// Pass the 'passport' instance into our custom configuration function
// This sets up the local authentication strategy, serialize/deserialize logic, etc.
passportConfig(passport);

// Initialize Passport middleware
// This must be called before using Passport for authentication
// It sets up Passport's core functionality in the Express app
app.use(passport.initialize());

// Enable persistent login sessions
// This middleware connects Passport with Express sessions
// allowing users to stay logged in across multiple requests
app.use(passport.session());

//! ---------------- Routes ----------------

// * Auth Routes *
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// * Home Route *
app.get("/", (req, res) => {
  res.render("home", { title: "Home", user: req.user, error: "" });
});

// * Post Routes *
const postRoutes = require("./routes/postRoutes");
app.use("/posts", postRoutes);

// * Comment Routes *
const commentRoutes = require("./routes/commentRoutes");
app.use("/", commentRoutes);

// * User (Profile) Routes *
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

// * Import the global error-handling middleware
const errorHandler = require("./middlewares/errorHandler");

// * Register the error-handling middleware so it catches errors from all routes
app.use(errorHandler);

//! ---------------- Database Connection ----------------
// Connect to MongoDB using the URL stored in the .env file
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Database connection successful"); // Log success message
  })
  .catch((err) => {
    console.log("❌ Database connection failed", err); // Log failure + error details
  });

//! ---------------- Start Server ----------------
// Start the Express server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
