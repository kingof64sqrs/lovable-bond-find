const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  sendInterest,
  respondToInterest,
  getInterests
} = require('../controllers/interestController');

router.post('/', protect, sendInterest);
router.put('/:id', protect, respondToInterest);
router.get('/', protect, getInterests);

module.exports = router;
