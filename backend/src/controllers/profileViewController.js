const ProfileView = require('../models/ProfileView');
const Profile = require('../models/Profile');

// @desc    Track profile view
// @route   POST /api/profile-views
// @access  Private
exports.trackView = async (req, res, next) => {
  try {
    const { profileId } = req.body;

    if (!profileId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Profile ID is required'
        }
      });
    }

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: 'Profile not found'
        }
      });
    }

    // Don't track own profile views
    if (profile.userId.toString() === req.user.id.toString()) {
      return res.status(200).json({
        success: true,
        message: 'Own profile view not tracked'
      });
    }

    // Create view record
    await ProfileView.create({
      viewerId: req.user.id,
      viewedProfileId: profileId
    });

    // Increment profile view count
    profile.profileViews += 1;
    await profile.save();

    res.status(200).json({
      success: true,
      message: 'View recorded'
    });
  } catch (error) {
    // If duplicate view (same viewer viewing same profile again), just return success
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: 'View already recorded'
      });
    }
    next(error);
  }
};

// @desc    Get profile viewers
// @route   GET /api/profile-views
// @access  Private
exports.getViewers = async (req, res, next) => {
  try {
    const { skip = 0, limit = 20 } = req.query;

    // Get user's profile
    const myProfile = await Profile.findOne({ userId: req.user.id });
    if (!myProfile) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: 'Profile not found'
        }
      });
    }

    const views = await ProfileView.find({ viewedProfileId: myProfile._id })
      .sort({ viewedAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    // Get viewer profiles
    const viewersWithProfiles = await Promise.all(
      views.map(async (view) => {
        const viewerProfile = await Profile.findOne({ userId: view.viewerId })
          .select('name age city photos');

        return {
          profile: {
            id: viewerProfile._id,
            name: viewerProfile.name,
            age: viewerProfile.age,
            city: viewerProfile.city,
            photo: viewerProfile.photos && viewerProfile.photos.length > 0
              ? viewerProfile.photos.find(p => p.isPrimary)?.url || viewerProfile.photos[0].url
              : null
          },
          viewedAt: view.viewedAt
        };
      })
    );

    res.status(200).json({
      success: true,
      data: viewersWithProfiles
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
