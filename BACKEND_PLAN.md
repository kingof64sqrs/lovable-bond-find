# Backend Plan - Lovable Matrimony Platform

## Tech Stack Recommendation

- **Backend Framework**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Image Storage**: AWS S3 / Cloudinary

---

## MongoDB Database Schemas

### 1. Users Collection

```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  isVerified: Boolean (default: false),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `email`, `isActive`, `createdAt`

---

### 2. Profiles Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'Users', unique, required),
  
  // Basic Info
  name: String (required),
  profileFor: String (enum: ['self', 'son', 'daughter', 'brother', 'sister', 'friend']),
  gender: String (enum: ['male', 'female'], required),
  dateOfBirth: Date (required),
  age: Number (calculated),
  phone: String,
  
  // Physical Attributes
  height: String,
  weight: Number,
  
  // Religious & Cultural
  religion: String (required),
  caste: String,
  motherTongue: String,
  maritalStatus: String (enum: ['never-married', 'divorced', 'widowed', 'awaiting-divorce']),
  
  // Education & Career
  education: String,
  educationDetails: String,
  college: String,
  occupation: String,
  company: String,
  employedIn: String (enum: ['private', 'government', 'business', 'not-working']),
  annualIncome: String,
  
  // Family Details
  familyType: String (enum: ['nuclear', 'joint']),
  fatherName: String,
  fatherOccupation: String,
  motherName: String,
  motherOccupation: String,
  siblings: String,
  
  // Location
  country: String (required),
  state: String (required),
  city: String (required),
  
  // About
  about: String,
  hobbies: [String],
  
  // Profile Status
  profileCompletion: Number (default: 0),
  photos: [{
    url: String,
    isPrimary: Boolean,
    uploadedAt: Date
  }],
  
  // Privacy Settings
  profileVisibility: String (enum: ['all', 'premium', 'matches', 'hidden'], default: 'all'),
  photoVisibility: String (enum: ['all', 'premium', 'matches'], default: 'all'),
  phoneVisibility: String (enum: ['none', 'premium', 'matches'], default: 'none'),
  
  // Metadata
  profileViews: Number (default: 0),
  isPremium: Boolean (default: false),
  premiumExpiryDate: Date,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `userId`, `gender`, `religion`, `city`, `age`, `maritalStatus`, `isPremium`

---

### 3. Preferences Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'Users', unique, required),
  
  // Partner Preferences
  ageRange: {
    min: Number,
    max: Number
  },
  heightRange: {
    min: String,
    max: String
  },
  maritalStatus: [String],
  religion: [String],
  caste: [String],
  motherTongue: [String],
  education: [String],
  occupation: [String],
  location: {
    countries: [String],
    states: [String],
    cities: [String]
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `userId`

---

### 4. Interests Collection

```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: 'Users', required),
  receiverId: ObjectId (ref: 'Users', required),
  status: String (enum: ['pending', 'accepted', 'rejected'], default: 'pending'),
  message: String,
  sentAt: Date (default: Date.now),
  respondedAt: Date
}
```

**Indexes**: `senderId`, `receiverId`, `status`, compound: `[senderId, receiverId]`

---

### 5. ProfileViews Collection

```javascript
{
  _id: ObjectId,
  viewerId: ObjectId (ref: 'Users', required),
  viewedProfileId: ObjectId (ref: 'Profiles', required),
  viewedAt: Date (default: Date.now)
}
```

**Indexes**: `viewerId`, `viewedProfileId`, compound: `[viewerId, viewedProfileId]`

---

### 6. Notifications Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'Users', required),
  type: String (enum: ['match', 'interest', 'profile-view', 'system'], required),
  title: String (required),
  message: String (required),
  relatedId: ObjectId, // ID of related interest/profile
  isRead: Boolean (default: false),
  createdAt: Date
}
```

**Indexes**: `userId`, `isRead`, `createdAt`

---

### 7. Settings Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'Users', unique, required),
  
  // Notification Preferences
  notifications: {
    newMatches: Boolean (default: true),
    profileViews: Boolean (default: true),
    interests: Boolean (default: true),
    email: Boolean (default: true),
    sms: Boolean (default: false)
  },
  
  // Privacy
  showLastSeen: Boolean (default: true),
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `userId`

---

## API Endpoints & Payloads

### Authentication APIs

#### 1. Register
**POST** `/api/auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "gender": "male",
  "profileFor": "self"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
}
```

---

#### 2. Login
**POST** `/api/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "name": "John Doe",
      "profileComplete": true
    }
  }
}
```

---

#### 3. Forgot Password
**POST** `/api/auth/forgot-password`

**Request:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset link sent to email"
}
```

---

### Profile APIs

#### 4. Create/Update Profile
**PUT** `/api/profiles/me`

**Request:**
```json
{
  "name": "John Doe",
  "dateOfBirth": "1995-06-15",
  "phone": "+919876543210",
  "height": "5.9",
  "weight": 75,
  "religion": "hindu",
  "caste": "Brahmin",
  "motherTongue": "hindi",
  "maritalStatus": "never-married",
  "education": "bachelors",
  "educationDetails": "B.Tech Computer Science",
  "occupation": "Software Engineer",
  "annualIncome": "10-15",
  "country": "india",
  "state": "Maharashtra",
  "city": "Mumbai",
  "about": "Looking for a life partner...",
  "hobbies": ["reading", "traveling"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "profileId": "profile_id",
    "profileCompletion": 85
  }
}
```

---

#### 5. Get Profile
**GET** `/api/profiles/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "profile_id",
    "name": "John Doe",
    "age": 28,
    "height": "5.9",
    "religion": "hindu",
    "city": "Mumbai",
    "education": "B.Tech",
    "occupation": "Software Engineer",
    "photos": [
      {
        "url": "https://...",
        "isPrimary": true
      }
    ],
    "canViewContact": false
  }
}
```

---

#### 6. Upload Profile Photo
**POST** `/api/profiles/photos`

**Request:** (multipart/form-data)
```
photo: File
isPrimary: Boolean
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://cloudinary.com/...",
    "photoId": "photo_id"
  }
}
```

---

### Search & Match APIs

#### 7. Search Profiles
**POST** `/api/profiles/search`

**Request:**
```json
{
  "gender": "female",
  "ageRange": { "min": 25, "max": 30 },
  "religion": ["hindu"],
  "city": "Mumbai",
  "education": ["bachelors", "masters"],
  "limit": 10,
  "skip": 0
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "profiles": [
      {
        "id": "profile_id",
        "name": "Jane Doe",
        "age": 27,
        "city": "Mumbai",
        "education": "MBA",
        "occupation": "Marketing Manager",
        "matchScore": 85,
        "photo": "https://..."
      }
    ],
    "total": 45,
    "hasMore": true
  }
}
```

---

#### 8. Get Matches
**GET** `/api/matches?type=all&skip=0&limit=10`

**Query Params:**
- `type`: all | premium | new | recommended
- `skip`: Number
- `limit`: Number

**Response:**
```json
{
  "success": true,
  "data": {
    "matches": [
      {
        "id": "profile_id",
        "name": "Jane Doe",
        "age": 27,
        "matchScore": 92,
        "location": "Mumbai",
        "photo": "https://..."
      }
    ],
    "total": 25
  }
}
```

---

### Interest APIs

#### 9. Send Interest
**POST** `/api/interests`

**Request:**
```json
{
  "receiverId": "user_id",
  "message": "Hi, interested to connect"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Interest sent successfully",
  "data": {
    "interestId": "interest_id"
  }
}
```

---

#### 10. Respond to Interest
**PUT** `/api/interests/:id`

**Request:**
```json
{
  "status": "accepted"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Interest accepted"
}
```

---

#### 11. Get Interests
**GET** `/api/interests?type=received&status=pending`

**Query Params:**
- `type`: sent | received
- `status`: pending | accepted | rejected

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "interest_id",
      "profile": {
        "id": "profile_id",
        "name": "Jane Doe",
        "age": 27,
        "photo": "https://..."
      },
      "status": "pending",
      "sentAt": "2025-11-07T10:30:00Z"
    }
  ]
}
```

---

### Profile View APIs

#### 12. Track Profile View
**POST** `/api/profile-views`

**Request:**
```json
{
  "profileId": "profile_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "View recorded"
}
```

---

#### 13. Get Profile Viewers
**GET** `/api/profile-views?skip=0&limit=20`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "profile": {
        "id": "profile_id",
        "name": "Jane Doe",
        "age": 27,
        "photo": "https://..."
      },
      "viewedAt": "2025-11-07T10:30:00Z"
    }
  ]
}
```

---

### Notification APIs

#### 14. Get Notifications
**GET** `/api/notifications?unread=true&skip=0&limit=20`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "notification_id",
      "type": "interest",
      "title": "New Interest",
      "message": "Jane Doe sent you an interest",
      "isRead": false,
      "createdAt": "2025-11-07T10:30:00Z"
    }
  ],
  "unreadCount": 5
}
```

---

#### 15. Mark Notification as Read
**PUT** `/api/notifications/:id/read`

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

### Settings APIs

#### 16. Get Settings
**GET** `/api/settings`

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": {
      "newMatches": true,
      "interests": true,
      "email": true
    },
    "showLastSeen": true
  }
}
```

---

#### 17. Update Settings
**PUT** `/api/settings`

**Request:**
```json
{
  "notifications": {
    "newMatches": true,
    "interests": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Settings updated successfully"
}
```

---

### Dashboard APIs

#### 18. Get Dashboard Stats
**GET** `/api/dashboard/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "profileViews": 234,
    "interests": 12,
    "matches": 45,
    "profileCompletion": 85
  }
}
```

---

## Common Response Structure

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
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": []
  }
}
```

---

## Authentication Flow

1. **JWT Token** in Authorization header: `Bearer <token>`
2. **Token Expiry**: 7 days
3. **Refresh Token**: Optional for extended sessions
4. **Password**: bcrypt hashing with salt rounds: 10

---

## File Upload Strategy

1. **Images**: 
   - Max size: 5MB
   - Formats: JPEG, PNG
   - Store in: Cloudinary/S3
   - Generate thumbnails: 150x150, 400x400

2. **Documents**:
   - Max size: 10MB
   - Formats: PDF, DOC, DOCX

---

## Performance Optimizations

1. **Caching**: Redis for frequently accessed data
   - User profiles
   - Match scores
   - Search results (5 min TTL)

2. **Pagination**: Default limit 20, max 100

3. **Indexes**: All foreign keys and frequently queried fields

4. **Virtual Fields**: Calculate on-the-fly
   - Age (from dateOfBirth)
   - Match score (from preferences)

---

## Security Considerations

1. **Rate Limiting**: 
   - Auth endpoints: 5 requests/min
   - API endpoints: 100 requests/min

2. **Data Validation**: Use Joi/Zod for request validation

3. **Sanitization**: Prevent XSS, SQL injection

4. **CORS**: Whitelist frontend domain

5. **HTTPS**: SSL certificate required

---

## Migration & Seeding

1. **Seed Data**: 
   - 50 sample profiles for testing
   - Various religions, locations, education levels

2. **Initial Admin**: Create admin user on first deployment

---

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb://localhost:27017/matrimony
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRY=7d

# File Upload
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# SMS (Optional)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE=+1234567890
```

---

## Future Enhancements

1. **AI Match Scoring**: ML-based compatibility
2. **Video Profiles**: Short video introductions
3. **Background Verification**: ID verification service
4. **Premium Features**: 
   - See who viewed profile
   - Advanced filters
   - Priority listing
5. **Astrology Matching**: Kundali matching for Hindu users
6. **Multi-language**: Support for regional languages

---

## Deployment Checklist

- [ ] MongoDB Atlas cluster setup
- [ ] Redis Cloud/AWS ElastiCache
- [ ] Cloudinary/S3 bucket configuration
- [ ] SSL certificate installation
- [ ] Environment variables configured
- [ ] Database indexes created
- [ ] Admin user seeded
- [ ] Rate limiting enabled
- [ ] CORS whitelist updated
- [ ] Logging & monitoring (Winston + PM2)
- [ ] Backup strategy implemented

---

## API Testing

Use tools like:
- **Postman**: API collection for all endpoints
- **Jest**: Unit & integration tests
- **Supertest**: API endpoint testing

---

## Timeline Estimate

| Phase | Duration | Tasks |
|-------|----------|-------|
| Setup | 1 week | MongoDB schemas, Express setup, Auth |
| Core APIs | 2 weeks | Profile, Search, Match APIs |
| Settings & Admin | 1 week | Settings, Admin panel |
| Testing | 1 week | Unit tests, integration tests |
| Deployment | 3 days | Server setup, deployment |

**Total: 5-6 weeks**
