const Profile = require('../models/Profile');
const Interest = require('../models/Interest');
const ProfileView = require('../models/ProfileView');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get user's profile
    const profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: 'Profile not found'
        }
      });
    }

    // Count interests received
    const interestsReceived = await Interest.countDocuments({
      receiverId: req.user.id,
      status: 'pending'
    });

    // Count matches (accepted interests both ways)
    const acceptedInterests = await Interest.countDocuments({
      $or: [
        { senderId: req.user.id, status: 'accepted' },
        { receiverId: req.user.id, status: 'accepted' }
      ]
    });

    // Get opposite gender profiles count
    const matchesCount = await Profile.countDocuments({
      gender: profile.gender === 'male' ? 'female' : 'male',
      profileVisibility: { $ne: 'hidden' }
    });

    res.status(200).json({
      success: true,
      data: {
        profileViews: profile.profileViews || 0,
        interests: interestsReceived,
        matches: Math.min(matchesCount, 100), // Cap at 100 for display
        profileCompletion: profile.profileCompletion || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
