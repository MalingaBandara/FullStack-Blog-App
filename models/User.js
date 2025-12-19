const mongoose = require('mongoose');

// ---------------- User Schema Definition ----------------
const userSchema = new mongoose.Schema(
  {
    // Username of the user (required + trims whitespace)
    username: {
      type: String,
      required: true,  // must be provided
      trim: true,      // removes leading/trailing spaces
    },

    // Email of the user (required + trims whitespace)
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // User's password (required)
    password: {
      type: String,
      required: true,
    },

    // Profile picture (string for URL, public_id if stored on Cloudinary or similar)
    profilePicture: {
      type: String,     // profile image URL
      public_id: String, // optional: image reference ID (e.g., from Cloudinary)
      url: String        // image URL
    },

    // Short bio or description about the user
    bio: {
      type: String,
    },

    // References to the user's posts
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId, // store post IDs
        ref: 'Post' // references Post model
      }
    ],

    // References to the user's comments
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId, // store comment IDs
        ref: 'Comment' // references Comment model
      }
    ],
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// ---------------- Model Creation ----------------
// Compile schema into a Mongoose model called "User"
// MongoDB collection name will be `users`
const User = mongoose.model('User', userSchema);

// ---------------- Export ----------------
// Export model so it can be used in routes/controllers
module.exports = User;
