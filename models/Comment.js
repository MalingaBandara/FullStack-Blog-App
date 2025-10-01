const mongoose = require('mongoose');

// ---------------- Comment Schema Definition ----------------
const commentSchema = new mongoose.Schema(
  {
    // The text/content of the comment
    content: {
      type: String,
      required: true, // comment must have text
      trim: true,     // removes spaces at start/end
    },

    // The post this comment belongs to
    post: {
      type: mongoose.Schema.Types.ObjectId, // stores post id
      required: true,
      ref: 'Post', // connects to Post model
    },

    // The user who wrote the comment
    author: {
      type: mongoose.Schema.Types.ObjectId, // stores user id
      required: true,
      ref: 'User', // connects to User model
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// ---------------- Model Creation ----------------
// Compile schema into a Mongoose model called "Comment"
// Collection name will be `comments` in MongoDB
const Comment = mongoose.model('Comment', commentSchema);

// ---------------- Export ----------------
module.exports = Comment;
