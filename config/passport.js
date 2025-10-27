
const LocalStrategy = require('passport-local').Strategy; // Import the LocalStrategy from passport-local for username/password authentication
const passport = require('passport');  // Import the main passport module
const User = require('../models/User'); // Import the User model to verify users from the database
const bcrypt = require('bcryptjs');  // Import bcrypt to compare the user's entered password with the hashed one stored in the DB


// Export a function that sets up Passport configuration
module.exports = function (passport) {

    /**
     * ==============================
     * 1️⃣ Local Strategy Definition
     * ==============================
     * This tells Passport how to authenticate users using their email and password.
     * The LocalStrategy takes a callback function that runs every time a login attempt happens.
     */
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email', // By default, Passport expects 'username'. Here we tell it to use 'email' instead.
            },
            async (email, password, done) => {
                try {
                    // 🧠 Step 1: Check if a user with the given email exists
                    const user = await User.findOne({ email });

                    if (!user) {
                        // 🚫 If no user found, stop authentication and return an error message
                        return done(null, false, { message: 'No user with that email' });
                    }

                    // 🧩 Step 2: Compare the entered password with the stored (hashed) password
                    const isMatch = await bcrypt.compare(password, user.password);

                    if (!isMatch) {
                        // 🚫 If passwords don’t match, stop authentication
                        return done(null, false, { message: 'Password incorrect' });
                    }

                    // ✅ Step 3: If both email and password are correct, return the user object
                    return done(null, user);

                } catch (error) {
                    // ⚠️ Catch any errors that occur during the authentication process
                    return done(error);
                }
            }
        )
    );


    /**
     * ==============================
     * 2️⃣ Serialize User
     * ==============================
     * After a user logs in successfully, Passport stores a piece of identifying info in the session.
     * Instead of storing the full user object, we store only the user ID to keep the session small.
     */
    passport.serializeUser(function (user, done) {
        // Store user ID in the session
        done(null, user.id);
    });


    /**
     * ==============================
     * 3️⃣ Deserialize User
     * ==============================
     * When the user makes a request (after login), Passport fetches the full user data
     * using the ID stored in the session. This keeps the user logged in across requests.
     */
    passport.deserializeUser(async function (id, done) {
        try {
            // Look up the user by ID and attach it to the request object
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
    
};
