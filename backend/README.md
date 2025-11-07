# Lovable Matrimony Backend API

Complete backend API for the Lovable Matrimony Platform built with Node.js, Express.js, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
- Copy `.env` file and update with your credentials
- Update `MONGODB_URI` with your MongoDB connection string
- Update `JWT_SECRET` with a secure random string
- Update `FRONTEND_URL` with your frontend URL

4. **Start development server**
```bash
npm run dev
```

5. **Start production server**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── interestController.js
│   │   ├── notificationController.js
│   │   ├── profileController.js
│   │   ├── profileViewController.js
│   │   └── settingsController.js
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   ├── errorHandler.js      # Global error handler
│   │   └── rateLimiter.js       # Rate limiting
│   ├── models/
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── Preference.js
│   │   ├── Interest.js
│   │   ├── ProfileView.js
│   │   ├── Notification.js
│   │   └── Settings.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── interestRoutes.js
│   │   ├── matchRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── profileViewRoutes.js
│   │   └── settingsRoutes.js
│   ├── utils/
│   │   ├── calculateMatchScore.js
│   │   └── generateToken.js
│   ├── app.js                   # Express app configuration
│   └── server.js                # Server entry point
├── api.http                     # API testing file
├── package.json
├── .env
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Forgot password
- `GET /api/auth/me` - Get current user

### Profile Management
- `GET /api/profiles/me` - Get my profile
- `PUT /api/profiles/me` - Update my profile
- `GET /api/profiles/:id` - Get profile by ID
- `POST /api/profiles/search` - Search profiles
- `POST /api/profiles/photos` - Upload profile photo

### Matches
- `GET /api/matches` - Get matches (all/premium/new/recommended)

### Interests
- `POST /api/interests` - Send interest
- `GET /api/interests` - Get interests (sent/received)
- `PUT /api/interests/:id` - Respond to interest

### Profile Views
- `POST /api/profile-views` - Track profile view
- `GET /api/profile-views` - Get profile viewers

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update settings

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🧪 Testing APIs

Use the `api.http` file with the REST Client extension in VS Code:

1. Install REST Client extension
2. Open `api.http`
3. Click "Send Request" above each endpoint
4. Copy JWT token from login response and update `@token` variable

## 🗄️ Database Models

### 7 MongoDB Collections

1. **Users** - Authentication and user accounts
2. **Profiles** - Detailed user profiles
3. **Preferences** - Partner preferences
4. **Interests** - Interest requests between users
5. **ProfileViews** - Profile view tracking
6. **Notifications** - User notifications
7. **Settings** - User preferences and settings

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting on auth and API endpoints
- Helmet.js for security headers
- CORS configuration
- Input validation
- MongoDB injection prevention

## 📊 Features

- ✅ User registration and authentication
- ✅ Profile creation and management
- ✅ Advanced profile search with filters
- ✅ Match scoring algorithm
- ✅ Interest sending and responding
- ✅ Profile view tracking
- ✅ Real-time notifications
- ✅ User settings management
- ✅ Dashboard statistics
- ✅ Rate limiting
- ✅ Error handling
- ✅ Input validation

## 🔧 Configuration

### Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d

# Frontend
FRONTEND_URL=http://localhost:5173

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX=5
```

## 📝 Common API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": []
  }
}
```

## 🚦 Rate Limits

- **Auth endpoints**: 5 requests/minute
- **API endpoints**: 100 requests/minute

## 📈 Performance

- MongoDB indexes on frequently queried fields
- Pagination support (default: 20 items, max: 100)
- Match score caching capability
- Optimized queries

## 🐛 Error Codes

- `VALIDATION_ERROR` - Invalid input data
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `USER_EXISTS` - Email already registered
- `INVALID_CREDENTIALS` - Wrong email/password
- `ACCOUNT_DEACTIVATED` - Account is deactivated
- `INVALID_TOKEN` - JWT token invalid/expired
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `SERVER_ERROR` - Internal server error

## 📦 Dependencies

### Production
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **express-validator** - Input validation
- **morgan** - HTTP logging
- **dotenv** - Environment variables
- **multer** - File upload handling
- **cloudinary** - Image storage

### Development
- **nodemon** - Auto-restart server
- **jest** - Testing framework
- **supertest** - API testing

## 🔄 API Workflow

1. **User Registration** → Creates User, Profile, Settings
2. **Login** → Returns JWT token
3. **Update Profile** → Completes profile information
4. **Search Profiles** → Find potential matches
5. **Send Interest** → Express interest in a profile
6. **Receive Notification** → Get notified of new interest
7. **Accept/Reject Interest** → Respond to interests
8. **View Dashboard** → See stats and matches

## 📞 Support

For issues or questions:
- Check `api.http` for example requests
- Review error messages for details
- Check MongoDB connection
- Verify environment variables

## 📄 License

MIT License

---

**Built with ❤️ for Lovable Matrimony Platform**
