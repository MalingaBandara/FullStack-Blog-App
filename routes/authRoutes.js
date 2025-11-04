// ---------------- Import Required Modules ----------------
const express = require('express');


// Import controller functions for authentication logic
const { getLogin, login, getRegister, register, logout } = require('../controllers/authController');

// Initialize router
const userRoutes = express.Router();


// ---------------- Login Routes ----------------

// * Render Login Page
userRoutes.get('/login', getLogin);

//! ----- Main logic for user Login ------
userRoutes.post('/login', login);


// ---------------- Registration Routes ----------------

// * Render Register Page
userRoutes.get('/register', getRegister);

//! ----- Main logic for user registration ------
userRoutes.post('/register', register);


// ---------------- Logout Route ----------------
userRoutes.get( '/logout', logout )


// ---------------- Export Router ----------------
module.exports = userRoutes;
