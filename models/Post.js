const mongoose = require('mongoose');

// ---------------- Post Schema Definition ----------------
const postSchema = new mongoose.Schema(
  {
    // Title of the post (required + trims spaces)
    title: {
      type: String,
      required: true,  // must have a title
      trim: true,      // remove extra spaces
    },

    // Content/body of the post (required)
    content: {
      type: String,
      required: true,
    },

    // Reference to the User who authored the post
    author: {
      type: mongoose.Schema.Types.ObjectId, // store user id
      required: true,
      ref: 'User', // references User model
    },

    // Array of images for the post
    // images: [
    //   {
    //     // Image URL (e.g., Cloudinary, S3, etc.)
    //     url: {
    //       type: String,
    //       required: true,
    //     },

    //     // Public ID of the image (useful for Cloudinary deletion)
    //     public_id: {
    //       type: String,
    //       required: true,
    //     },
    //   }
    // ],

    // References to comments on the post
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId, // store comment ids
        ref: 'Comment', // references Comment model
      }
    ],
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ---------------- Model Creation ----------------
// Compile schema into a Mongoose model called "Post"
// Collection name will be `posts` in MongoDB
const Post = mongoose.model('Post', postSchema);

// ---------------- Export ----------------
module.exports = Post;
