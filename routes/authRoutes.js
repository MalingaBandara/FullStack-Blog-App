// ---------------- Import Required Modules ----------------
const express = require('express');


// Import controller functions for authentication logic
const { getLogin, login, getRegister, register, logout } = require('../controllers/authController');

// Initialize router
const authRoutes = express.Router();


// ---------------- Login Routes ----------------

//? Render Login Page
authRoutes.get('/login', getLogin);

//! ----- Main logic for user Login ------
authRoutes.post('/login', login);


// ---------------- Registration Routes ----------------

//? Render Register Page
authRoutes.get('/register', getRegister);

//! ----- Main logic for user registration ------
authRoutes.post('/register', register);


// ---------------- Logout Route ----------------
authRoutes.get( '/logout', logout )


// ---------------- Export Router ----------------
module.exports = authRoutes;
