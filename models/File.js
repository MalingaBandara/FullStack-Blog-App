const mongoose = require('mongoose');

// ---------------- File Schema Definition ----------------
const fileSchema = new mongoose.Schema(
  {
    // URL where the file is stored (e.g., Cloudinary, S3, local server, etc.)
    url: {
      type: String,
      required: true, // must have a file URL
      trim: true,     // removes unnecessary spaces
    },

    // Public ID of the file (useful for managing files on services like Cloudinary)
    public_id: {
      type: String,
      required: true,
    },

    // Reference to the user who uploaded the file
    uploaded_by: {
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
// Compile schema into a Mongoose model called "File"
// Collection name will be `files` in MongoDB
const File = mongoose.model('File', fileSchema);

// ---------------- Export ----------------
module.exports = File;
