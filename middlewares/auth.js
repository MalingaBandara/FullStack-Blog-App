
module.exports = {

    // * Middleware to protect routes (only logged-in users can access)
    ensureAuthenticated: (req, res, next) => {

        // * Check if user is logged in (Passport adds isAuthenticated())
        if (req.isAuthenticated()) {
            return next(); // * Allow request to continue
        } else {
            // * If not logged in → redirect to login page
            return res.redirect('/auth/login');
        }

    },

};