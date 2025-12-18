
const express = require("express"); // * Import Express framework
const commentRoutes = express.Router(); // * Create a new router for comment-related routes
const { ensureAuthenticated } = require("../middlewares/auth"); // * Import middleware to check if user is logged in
const { addComment, updateComment } = require("../controllers/commentController"); // * Import controller function to handle adding a comment


//! Route to Add Comment
// * POST request to '/posts/:id/comments'
// * ensureAuthenticated middleware ensures only logged-in users can comment
// * addComment controller handles saving the comment to the database
commentRoutes.post('/posts/:id/comments', ensureAuthenticated, addComment);

//! Update Comment
commentRoutes.put( '/comment/:id', ensureAuthenticated, updateComment );


// * Export the comment router to be used in main app
module.exports = commentRoutes;
