# Bits of Thought

A full-featured, modern blog application built with the MERN stack (MongoDB, Express.js, Node.js) featuring user authentication, post management, comments, and cloud-based image storage. **Bits of Thought** demonstrates modern web development practices including secure authentication, RESTful API design, cloud integration, and a beautiful, responsive user interface.

## 🎨 UI/UX Design Highlights

### Responsive Design
- **Fully Responsive Layout** - Seamlessly adapts to all screen sizes (mobile, tablet, desktop)
- **Mobile-First Approach** - Optimized for mobile devices with touch-friendly interfaces
- **Flexible Grid System** - Modern CSS Grid and Flexbox layouts for perfect alignment
- **Adaptive Navigation** - Responsive navigation menu that adjusts to screen size

### Modern UI Features
- **Hero Section** - Eye-catching hero section with animated background overlays
- **Smooth Animations** - CSS animations and transitions for enhanced user experience
- **Gradient Overlays** - Beautiful gradient effects and visual depth
- **Clean Typography** - Modern font choices and readable text hierarchy
- **Intuitive Navigation** - User-friendly navigation with clear visual feedback
- **Interactive Elements** - Hover effects and interactive buttons throughout the application
- **Loading States** - Visual feedback for user actions
- **Error & Success Messages** - Clear, user-friendly notification system

### User Experience
- **Intuitive Interface** - Clean and organized layout for easy navigation
- **Visual Feedback** - Immediate response to user interactions
- **Consistent Design Language** - Cohesive design system across all pages
- **Accessibility** - Considerate design for better usability

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home-page.png)

*Beautiful hero section with animated backgrounds and modern design*

### Posts Listing
![Posts Page](screenshots/posts-page.png)

*Responsive grid layout showcasing all blog posts*

### Post Details with Comments
![Post Details](screenshots/post-details.png)

*Detailed post view with image gallery and comment system*

### Comment Form
![Comment Form](screenshots/comment-form.png)

*Interactive comment form allowing users to add comments to posts*

### User Profile
![Profile Page](screenshots/profile-page.png)

*User profile page with bio, profile picture, and post history*

### Create/Edit Post
![Create Post](screenshots/create-post.png)

*Intuitive post creation form with multiple image upload support*

### Responsive Mobile View
![Mobile View](screenshots/mobile-view.png)

*Fully responsive design optimized for mobile devices*

### Login Page
![Login Page](screenshots/login-page.png)

*Clean and modern login interface*

### Register Page
![Register Page](screenshots/register-page.png)

*User registration form with validation*

---

## 🚀 Features

### Authentication & User Management
- **User Registration & Login** - Secure authentication using Passport.js with local strategy
- **Session Management** - Persistent sessions stored in MongoDB using `connect-mongo`
- **Password Security** - Passwords are hashed using bcryptjs before storage
- **User Profiles** - View and manage user profiles with bio and profile pictures
- **Profile Editing** - Update username, email, bio, and profile picture
- **Account Deletion** - Complete account removal with cascade deletion of all associated data

### Blog Post Management
- **Create Posts** - Rich blog posts with title, content, and multiple images (up to 5 per post)
- **View Posts** - Browse all posts with author information
- **Post Details** - Detailed view of individual posts with all comments
- **Edit Posts** - Update post content and images (author-only)
- **Delete Posts** - Remove posts with automatic cleanup of associated images and comments (author-only)
- **Image Upload** - Multiple image support per post with Cloudinary integration

### Comment System
- **Add Comments** - Users can comment on any post
- **Edit Comments** - Update your own comments
- **Delete Comments** - Remove your own comments
- **Comment Threading** - Comments are linked to posts and display author information

### Image Management
- **Cloudinary Integration** - All images are stored in Cloudinary cloud storage
- **Profile Pictures** - Upload and manage profile pictures
- **Post Images** - Support for multiple images per blog post
- **Automatic Cleanup** - Images are automatically deleted from Cloudinary when posts or accounts are deleted

### Security & Authorization
- **Route Protection** - Protected routes require authentication
- **Authorization Checks** - Users can only edit/delete their own posts and comments
- **Error Handling** - Comprehensive error handling with custom error middleware
- **Session Security** - Secure session management with MongoDB store

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **Passport.js** - Authentication middleware (Local Strategy)
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-mongo** - MongoDB session store

### File Upload & Storage
- **Multer** - File upload middleware
- **Cloudinary** - Cloud-based image storage and management
- **multer-storage-cloudinary** - Multer storage engine for Cloudinary

### Frontend & UI
- **EJS** - Embedded JavaScript templating
- **Custom CSS** - Modern, responsive styling with animations
- **Responsive Design** - Mobile-first, adaptive layouts

### Utilities
- **method-override** - HTTP method override for PUT/DELETE requests
- **express-async-handler** - Async error handling wrapper
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Bits-of-Thought/
├── config/
│   ├── cloudinary.js      # Cloudinary configuration
│   ├── multer.js          # Multer file upload configuration
│   └── passport.js        # Passport authentication strategy
├── controllers/
│   ├── authController.js  # Authentication logic (login, register, logout)
│   ├── commentController.js # Comment CRUD operations
│   ├── postController.js   # Post CRUD operations
│   └── userController.js   # User profile management
├── middlewares/
│   ├── auth.js            # Authentication middleware
│   └── errorHandler.js    # Global error handling
├── models/
│   ├── Comment.js          # Comment schema
│   ├── File.js            # File metadata schema
│   ├── Post.js            # Post schema
│   └── User.js            # User schema
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── commentRoutes.js   # Comment routes
│   ├── postRoutes.js      # Post routes
│   └── userRoutes.js      # User/profile routes
├── public/
│   ├── css/
│   │   └── styles.css     # Application styles
│   └── images/
│       └── logo.png       # Application logo
├── views/
│   ├── partials/
│   │   ├── footer.ejs     # Footer partial
│   │   └── header.ejs     # Header partial
│   ├── editPost.ejs       # Edit post page
│   ├── editProfile.ejs    # Edit profile page
│   ├── error.ejs          # Error page
│   ├── home.ejs           # Home page
│   ├── login.ejs          # Login page
│   ├── newPost.ejs        # Create post page
│   ├── postDetails.ejs    # Post details page
│   ├── posts.ejs          # All posts page
│   ├── profile.ejs        # User profile page
│   └── register.ejs       # Registration page
├── app.js                 # Main application file
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image storage)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/MalingaBandara/FullStack-Blog-App.git
cd FullStack-Blog-App
# Or if repository is renamed:
# cd Bits-of-Thought
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
# MongoDB Connection
MONGODB_URL=mongodb://localhost:27017/blog-app
# Or use MongoDB Atlas:
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/blog-app

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

# Server Port (optional, defaults to 3000)
PORT=3000

# Session Secret (optional, for production use a strong random string)
SESSION_SECRET=your_session_secret_key
```

### Step 4: Start the Application
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## 🎯 Usage

### Getting Started
1. **Register a new account** - Navigate to `/auth/register` and create your account
2. **Login** - Use your credentials to login at `/auth/login`
3. **Create a post** - Go to `/posts/add` to create your first blog post
4. **View posts** - Browse all posts at `/posts`
5. **Manage profile** - Edit your profile at `/user/edit`

### Key Routes

#### Authentication
- `GET /auth/register` - Registration page
- `POST /auth/register` - Register new user
- `GET /auth/login` - Login page
- `POST /auth/login` - User login
- `GET /auth/logout` - User logout

#### Posts
- `GET /posts` - View all posts
- `GET /posts/add` - Create new post (protected)
- `POST /posts/add` - Submit new post (protected)
- `GET /posts/:id` - View post details
- `GET /posts/:id/edit` - Edit post form (protected, author-only)
- `PUT /posts/:id` - Update post (protected, author-only)
- `DELETE /posts/:id` - Delete post (protected, author-only)

#### Comments
- `POST /posts/:id/comments` - Add comment to post (protected)
- `PUT /comment/:id` - Update comment (protected, author-only)
- `DELETE /comment/:id` - Delete comment (protected, author-only)

#### User Profile
- `GET /user/profile` - View user profile (protected)
- `GET /user/edit` - Edit profile form (protected)
- `POST /user/edit` - Update profile (protected)
- `POST /user/delete` - Delete account (protected)

## 🔒 Security Features

- **Password Hashing** - All passwords are hashed using bcryptjs before storage
- **Session Management** - Secure session handling with MongoDB persistence
- **Route Protection** - Authentication middleware protects sensitive routes
- **Authorization** - Users can only modify their own content
- **Input Validation** - Form data validation and sanitization
- **Error Handling** - Comprehensive error handling prevents information leakage

## 🎨 Features Highlights

### Database Relationships
- **User-Post Relationship** - One-to-many (User can have many posts)
- **Post-Comment Relationship** - One-to-many (Post can have many comments)
- **User-Comment Relationship** - One-to-many (User can have many comments)
- **Cascade Deletion** - Deleting a user/post automatically removes associated data

### Image Management
- Images are uploaded directly to Cloudinary
- Automatic cleanup when posts or accounts are deleted
- Support for multiple images per post
- Profile picture management

### User Experience
- **Responsive Design** - Fully responsive layout that works perfectly on all devices
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Real-time Feedback** - Instant error messages and success notifications
- **Intuitive Navigation** - Easy-to-use navigation with clear visual hierarchy
- **Accessible Design** - User-friendly interface designed for all users
- **Performance Optimized** - Fast loading times and smooth interactions

## 🚧 Future Enhancements

Potential features for future development:
- [ ] Like/Dislike functionality for posts
- [ ] Search and filter posts
- [ ] Pagination for posts list
- [ ] Rich text editor for post content
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social media authentication (OAuth)
- [ ] Post categories and tags
- [ ] User following system
- [ ] Admin dashboard
- [ ] API documentation with Swagger

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Malinga Bandara** (BitLord)

*Full-Stack Developer & Creator of Bits of Thought*

- **GitHub**: [@MalingaBandara](https://github.com/MalingaBandara)
- **Dev Name/Nickname**: BitLord
- **Project Link**: [https://github.com/MalingaBandara/FullStack-Blog-App](https://github.com/MalingaBandara/FullStack-Blog-App)

---

**About the Developer**: Passionate about creating beautiful, functional web applications. **Bits of Thought** represents a combination of modern web technologies, clean code practices, and attention to user experience.

## 🙏 Acknowledgments

- Express.js community
- MongoDB documentation
- Cloudinary for image storage services
- Passport.js for authentication strategies

---

---

## 🎯 Project Showcase

**Bits of Thought** is a comprehensive blog application that showcases:

- ✅ Full-stack development skills (MERN stack)
- ✅ Modern, responsive UI/UX design
- ✅ Secure authentication and authorization
- ✅ Cloud integration (Cloudinary)
- ✅ RESTful API architecture
- ✅ Database design and relationships
- ✅ Error handling and security best practices
- ✅ Clean, maintainable code structure

Perfect for demonstrating your skills in job interviews and portfolio presentations!

---

**Note**: This project is built for educational and portfolio purposes. Make sure to configure your environment variables properly before deploying to production.
