# Lovable Matrimony Backend API

TypeScript-based backend API with Weaviate Vector Database integration.

## 📋 Prerequisites

- Node.js 16+ 
- Weaviate running locally on `localhost:8080`
- npm or yarn

## 🚀 Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your configuration
```

## 📝 Environment Variables

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
WEAVIATE_SCHEME=http
WEAVIATE_HOST=localhost:8080
```

## 🛠️ Development

```bash
# Start development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Build with watch mode
npm run build:watch

# Start production server
npm start
```

## 📂 Project Structure

```
src/
├── app.ts              # Express app setup
├── server.ts           # Server entry point
├── config/
│   └── weaviate.ts     # Weaviate client config
├── controllers/
│   └── adminController.ts  # Admin business logic
├── models/
│   └── WeaviateModels.ts   # Weaviate schemas
├── middleware/
│   └── auth.ts         # Authentication middleware
└── routes/
    └── adminRoutes.ts  # Admin API routes
```

## 🔌 API Endpoints

All endpoints require authentication with Bearer token in Authorization header.

### Form Data
- `GET /api/admin/form-data` - Get all form submissions
- `POST /api/admin/form-data` - Add new form data

### Settings
- `GET /api/admin/settings` - Get site settings
- `PUT /api/admin/settings` - Update site settings

### Members
- `GET /api/admin/members` - Get all members

### Matches
- `GET /api/admin/matches` - Get all matches

### Membership Plans
- `GET /api/admin/membership-plans` - Get all plans
- `POST /api/admin/membership-plans` - Create plan

### Approvals
- `GET /api/admin/approvals` - Get pending approvals

### User Activity
- `GET /api/admin/user-activity` - Get user activities

### Content
- `GET /api/admin/content` - Get all content
- `POST /api/admin/content` - Create content

### Email Templates
- `GET /api/admin/email-templates` - Get all templates
- `POST /api/admin/email-templates` - Create template

### Contact Data
- `GET /api/admin/contact-data` - Get contact submissions

### Member Report
- `GET /api/admin/member-report` - Get member statistics

### Payment Options
- `GET /api/admin/payment-options` - Get payment methods

### Delete
- `DELETE /api/admin/:className/:id` - Delete any item

## 🗄️ Weaviate Collections

13 Vector Collections are automatically created:

1. AdminFormData - Form submissions
2. SiteSettings - Site configuration
3. Members - Member profiles
4. Matches - User matches
5. MembershipPlan - Subscription plans
6. Approvals - Approval queue
7. Advertisements - Ad campaigns
8. UserActivity - Activity logs
9. Content - Managed content
10. EmailTemplate - Email templates
11. PaymentOption - Payment gateways
12. MemberReport - Member statistics
13. ContactData - Contact forms

## ✅ Health Check

```bash
curl http://localhost:5000/api/health
```

## 🔐 Authentication

Pass Bearer token in Authorization header:
```
Authorization: Bearer <your_token>
```

## 📦 Built With

- **Express.js** - Web framework
- **TypeScript** - Language
- **Weaviate** - Vector database
- **CORS** - Cross-origin support
- **Helmet** - Security headers
- **Morgan** - Request logging

## 📝 Notes

- All TypeScript files (*.ts only)
- Strict TypeScript compiler options enabled
- Proper error handling and type safety
- Ready for production deployment
