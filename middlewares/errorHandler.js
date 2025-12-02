
// * Global error-handling middleware
const errorHandler = (err, req, res, next) => {

    // * Set HTTP status code (use error's status or default to 500 - Server Error)
    res.status(err.status || 500 );

    // * Render the custom "error" page and pass necessary data to the view:
    //   - title: Page title
    //   - user: Logged-in user (if any)
    //   - error: Error message to display
    res.render("error", { title: "Error", user: req.user, error: err.message });

};


// * Export the middleware so it can be used in the main app
module.exports = errorHandler;
