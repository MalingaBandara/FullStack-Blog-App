
const asyncHandler = require("express-async-handler"); // * Import express-async-handler to handle async errors without try/catch
const Comment = require("../models/Comment"); // * Import Comment model from MongoDB
const Post = require("../models/Post"); // * Import Post model from MongoDB


//! Add Comment to a Post
exports.addComment = asyncHandler(async (req, res) => {

    const { content } = req.body; // * Extract comment content from the request body
    const postId = req.params.id; // * Get the post ID from route parameters

    const post = await Post.findById(postId); // * Find the post in the database by ID

    // * If the post does not exist, render the postDetails page with an error
    if (!post) {
        return res.render("postDetails", { 
            title: "Post",
            post,          // * Will be undefined here
            user: req.user,
            error: "Post not found" 
        });
    }

    // * Create a new Comment document with content, post reference, and author ID
    const comment = new Comment({
        content,
        post: postId,       // * Reference to the post
        author: req.user._id, // * Logged-in user's ID
    });

    await comment.save(); // * Save the comment to MongoDB

    post.comments.push(comment._id); // * Add the comment ID to the post's comments array
    await post.save(); // * Save the updated post

    // * Redirect user back to the post details page after adding comment
    res.redirect(`/posts/${postId}`);

});