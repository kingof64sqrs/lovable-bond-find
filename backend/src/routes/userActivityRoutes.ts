import express, { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  // Express Interest
  getAllExpressInterests,
  createExpressInterest,
  updateExpressInterest,
  deleteExpressInterest,
  // Messages
  getAllMessages,
  createMessage,
  updateMessage,
  deleteMessage,
  // Viewed Profiles
  getAllViewedProfiles,
  createViewedProfile,
  deleteViewedProfile,
  // Blocked Profiles
  getAllBlockedProfiles,
  createBlockedProfile,
  deleteBlockedProfile,
  // Shortlisted Profiles
  getAllShortlistedProfiles,
  createShortlistedProfile,
  deleteShortlistedProfile,
} from '../controllers/userActivityController';

const router: Router = express.Router();

// ==================== EXPRESS INTEREST ROUTES ====================
router.get('/express-interests', authenticate, getAllExpressInterests);
router.post('/express-interests', authenticate, createExpressInterest);
router.put('/express-interests/:id', authenticate, updateExpressInterest);
router.delete('/express-interests/:id', authenticate, deleteExpressInterest);

// ==================== MESSAGE ROUTES ====================
router.get('/messages', authenticate, getAllMessages);
router.post('/messages', authenticate, createMessage);
router.put('/messages/:id', authenticate, updateMessage);
router.delete('/messages/:id', authenticate, deleteMessage);

// ==================== VIEWED PROFILE ROUTES ====================
router.get('/viewed-profiles', authenticate, getAllViewedProfiles);
router.post('/viewed-profiles', authenticate, createViewedProfile);
router.delete('/viewed-profiles/:id', authenticate, deleteViewedProfile);

// ==================== BLOCKED PROFILE ROUTES ====================
router.get('/blocked-profiles', authenticate, getAllBlockedProfiles);
router.post('/blocked-profiles', authenticate, createBlockedProfile);
router.delete('/blocked-profiles/:id', authenticate, deleteBlockedProfile);

// ==================== SHORTLISTED PROFILE ROUTES ====================
router.get('/shortlisted-profiles', authenticate, getAllShortlistedProfiles);
router.post('/shortlisted-profiles', authenticate, createShortlistedProfile);
router.delete('/shortlisted-profiles/:id', authenticate, deleteShortlistedProfile);

export default router;
