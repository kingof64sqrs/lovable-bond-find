# API Configuration Centralization - Summary

## Changes Made

All hardcoded API endpoints in the frontend have been replaced with a centralized configuration system.

### 1. Central Configuration (`src/config/api.ts`)
- Created a single source of truth for the API base URL
- Added `API_BASE_URL` constant that reads from `VITE_API_URL` environment variable
- Added `getApiUrl()` helper function for constructing API URLs
- Default fallback: `http://140.238.227.29:3000/api`

### 2. Updated API Library (`src/lib/api.ts`)
- Now imports `API_BASE_URL` from centralized config
- Removed duplicate API URL definition

### 3. Updated Auth Context (`src/contexts/AuthContext.tsx`)
- Now imports `API_BASE_URL` from centralized config

### 4. Updated All Admin Pages
The following admin pages were updated to use the centralized API configuration:

#### Main Admin Pages:
- `PaymentOption.tsx`
- `UserActivity.tsx`
- `Country.tsx`
- `MembershipPlan.tsx`
- `Dashboard.tsx`
- `Approvals.tsx`
- `State.tsx`

#### User Activity Pages:
- `ExpressInterest.tsx`
- `Message.tsx`
- `ViewedProfile.tsx`
- `ShortlistedProfile.tsx`
- `BlockedProfile.tsx`

### 5. Environment Configuration
Created `.env.example` file with documentation for:
- `VITE_API_URL` - Backend API endpoint

## How It Works

**Before:**
```typescript
fetch(import.meta.env.VITE_API_URL || 'http://localhost:3000/api/admin/members', {...})
```

**After:**
```typescript
import { API_BASE_URL } from '@/config/api';
// ...
fetch(`${API_BASE_URL}/admin/members`, {...})
```

## Configuration

Set the backend URL in your `.env` file:
```env
VITE_API_URL=http://your-backend-url:3000/api
```

For development with local backend:
```env
VITE_API_URL=http://localhost:3000/api
```

For production:
```env
VITE_API_URL=http://140.238.227.29:3000/api
```

## Benefits

1. **Single Source of Truth**: API URL is defined once in `src/config/api.ts`
2. **Environment-Based**: Easy to switch between dev/staging/production
3. **Maintainable**: Change API URL in one place instead of hundreds of files
4. **Type-Safe**: TypeScript support throughout
5. **No Hardcoding**: All URLs now use environment variables

## Verification

All hardcoded URLs have been removed:
- ✅ No `localhost:3000` hardcoded in source files
- ✅ No IP addresses hardcoded (except in config)
- ✅ All API calls use centralized configuration
- ✅ No TypeScript errors

## Next Steps

1. Set appropriate `VITE_API_URL` in your deployment environment
2. Restart the development server to apply changes
3. Test API connectivity with the new configuration
