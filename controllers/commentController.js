
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



//! Update Comment
exports.updateComment = asyncHandler(async (req, res) => {

    // * Extract updated comment content from the request body
    const { content } = req.body;

    // * Find the comment in the database using the ID from route parameters
    const comment = await Comment.findById(req.params.id);

    // * If the comment does not exist, render the post details page with an error
    if (!comment) {
        return res.render("postDetails", { 
            title: "Post",          // * Page title
            comment,                // * Will be null or undefined
            user: req.user,         // * Logged-in user
            error: "Comment not found"
        });
    }

    // * Authorization check: only the comment author can edit (ObjectIds compared as strings)
    if (comment.author.toString() !== req.user._id.toString()) {
        return res.render("postDetails", {
            title: "Post",                                     // * Page title
            comment,                                           // * Current comment
            user: req.user,                                    // * Logged-in user
            error: "You are not authorized to edit this comment"
            // * Shown when user tries to edit someone else’s comment
        });
    }

    comment.content = content || comment.content; // * Update comment content only if a new value is provided

    await comment.save(); // * Save the updated comment in MongoDB
    
    res.redirect(`/posts/${comment.post}`); // * Redirect user back to the related post details page

});



//! Delete Comment
exports.deleteComment = asyncHandler(async (req, res) => {

    // * Find the comment in the database using the ID from route parameters
    const comment = await Comment.findById(req.params.id);

    // * If the comment does not exist, render the post details page with an error
    if (!comment) {
        return res.render("postDetails", { 
            title: "Post",          // * Page title
            comment,                // * Will be null or undefined
            user: req.user,         // * Logged-in user
            error: "Comment not found"
        });
    }

    // * Authorization check: only the comment author can delete (ObjectIds compared as strings)
    if (comment.author.toString() !== req.user._id.toString()) {
        return res.render("postDetails", {
            title: "Post",                                     // * Page title
            comment,                                           // * Current comment
            user: req.user,                                    // * Logged-in user
            error: "You are not authorized to delete this comment" // * Shown when user tries to delete someone else’s comment
        });
    }

    await Comment.findByIdAndDelete(req.params.id); // * Delete the comment from MongoDB

    res.redirect(`/posts/${comment.post}`); // * Redirect user back to the related post details page

});