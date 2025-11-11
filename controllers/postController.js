
// * Import the Post model to interact with the 'posts' collection in MongoDB
const Post = require("../models/Post");


//* Rendering post form
exports.getPostForm = (req, res) => {

    // * Render the "newPost" EJS template when this route is accessed
    // * Pass data to the view:
    //   - title: sets the page title as "Create Post"
    //   - user: provides the logged-in user info (req.user) to the template
    res.render( "newPost", { title: "Create Post", user: req.user });

};


//! Creating  new post
exports.createPost = async (req, res) => {

    // * Extract title and content fields from the submitted form data (req.body)
    const { title, content } = req.body;

    // * Create a new Post document in the database
    //   - title: post title from form input
    //   - content: post body text
    //   - author: the ID of the currently logged-in user (req.user._id)
    const newPost = await Post.create({ title, content, author: req.user._id });

    // * Log the newly created post object for debugging or verification
    console.log(newPost);

    // * After creating the post, redirect the user to the /posts page
    res.redirect("/posts");

};

