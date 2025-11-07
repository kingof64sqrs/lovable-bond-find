const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  trackView,
  getViewers
} = require('../controllers/profileViewController');

router.post('/', protect, trackView);
router.get('/', protect, getViewers);

module.exports = router;
