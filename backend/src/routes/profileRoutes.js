const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getMyProfile,
  updateProfile,
  getProfileById,
  searchProfiles,
  getMatches,
  uploadPhoto
} = require('../controllers/profileController');

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateProfile);
router.get('/:id', getProfileById);
router.post('/search', searchProfiles);
router.post('/photos', protect, uploadPhoto);

module.exports = router;
