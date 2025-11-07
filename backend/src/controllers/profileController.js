const Profile = require('../models/Profile');
const User = require('../models/User');
const Preference = require('../models/Preference');
const calculateMatchScore = require('../utils/calculateMatchScore');

// @desc    Get/Create user profile
// @route   GET /api/profiles/me
// @access  Private
exports.getMyProfile = async (req, res, next) => {
  try {
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

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/profiles/me
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: 'Profile not found'
        }
      });
    }

    // Update fields
    const updateFields = { ...req.body };
    delete updateFields.userId; // Prevent userId change
    delete updateFields.profileViews; // Prevent manual manipulation

    Object.assign(profile, updateFields);

    // Calculate profile completion
    profile.calculateCompletion();

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        profileId: profile._id,
        profileCompletion: profile.profileCompletion
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get profile by ID
// @route   GET /api/profiles/:id
// @access  Public/Private
exports.getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: 'Profile not found'
        }
      });
    }

    // Check if profile is hidden
    if (profile.profileVisibility === 'hidden') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'PROFILE_HIDDEN',
          message: 'This profile is not visible'
        }
      });
    }

    // Determine if viewer can see contact details
    const canViewContact = req.user && (
      req.user.id.toString() === profile.userId.toString() ||
      req.user.role === 'admin'
    );

    // Hide sensitive info based on privacy settings
    const profileData = profile.toObject();
    
    if (!canViewContact) {
      if (profile.phoneVisibility === 'none') {
        delete profileData.phone;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        ...profileData,
        canViewContact
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search profiles
// @route   POST /api/profiles/search
// @access  Public
exports.searchProfiles = async (req, res, next) => {
  try {
    const {
      gender,
      ageRange,
      religion,
      city,
      state,
      education,
      maritalStatus,
      limit = 10,
      skip = 0
    } = req.body;

    // Build query
    const query = {
      profileVisibility: { $ne: 'hidden' }
    };

    if (gender) query.gender = gender;
    if (religion && religion.length > 0) query.religion = { $in: religion };
    if (city) query.city = new RegExp(city, 'i');
    if (state) query.state = new RegExp(state, 'i');
    if (maritalStatus && maritalStatus.length > 0) query.maritalStatus = { $in: maritalStatus };

    if (ageRange) {
      query.age = {
        $gte: ageRange.min || 18,
        $lte: ageRange.max || 100
      };
    }

    if (education && education.length > 0) {
      query.education = { $in: education.map(e => new RegExp(e, 'i')) };
    }

    // Exclude current user's profile if authenticated
    if (req.user) {
      const myProfile = await Profile.findOne({ userId: req.user.id });
      if (myProfile) {
        query._id = { $ne: myProfile._id };
      }
    }

    const total = await Profile.countDocuments(query);
    
    const profiles = await Profile.find(query)
      .select('-phone -about') // Don't return sensitive data in list
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ isPremium: -1, createdAt: -1 });

    // Calculate match score if user is authenticated
    let profilesWithScore = profiles;
    if (req.user) {
      const userPreference = await Preference.findOne({ userId: req.user.id });
      profilesWithScore = profiles.map(profile => ({
        ...profile.toObject(),
        matchScore: calculateMatchScore(userPreference, profile)
      }));
    }

    res.status(200).json({
      success: true,
      data: {
        profiles: profilesWithScore,
        total,
        hasMore: skip + profiles.length < total
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get matches based on preferences
// @route   GET /api/matches
// @access  Private
exports.getMatches = async (req, res, next) => {
  try {
    const { type = 'all', skip = 0, limit = 10 } = req.query;

    // Get user's profile and preferences
    const myProfile = await Profile.findOne({ userId: req.user.id });
    if (!myProfile) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: 'Please complete your profile first'
        }
      });
    }

    const preferences = await Preference.findOne({ userId: req.user.id });

    // Build query for opposite gender
    const query = {
      gender: myProfile.gender === 'male' ? 'female' : 'male',
      _id: { $ne: myProfile._id },
      profileVisibility: { $ne: 'hidden' }
    };

    // Add filters based on type
    if (type === 'premium') {
      query.isPremium = true;
    } else if (type === 'new') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      query.createdAt = { $gte: sevenDaysAgo };
    }

    const profiles = await Profile.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ isPremium: -1, createdAt: -1 });

    // Calculate match scores
    const matches = profiles.map(profile => {
      const matchScore = calculateMatchScore(preferences, profile);
      return {
        id: profile._id,
        name: profile.name,
        age: profile.age,
        location: `${profile.city}, ${profile.state}`,
        education: profile.education,
        occupation: profile.occupation,
        matchScore,
        photo: profile.photos && profile.photos.length > 0 
          ? profile.photos.find(p => p.isPrimary)?.url || profile.photos[0].url
          : null
      };
    });

    // Sort by match score for recommended
    if (type === 'recommended') {
      matches.sort((a, b) => b.matchScore - a.matchScore);
    }

    const total = await Profile.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        matches,
        total
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload profile photo
// @route   POST /api/profiles/photos
// @access  Private
exports.uploadPhoto = async (req, res, next) => {
  try {
    // TODO: Implement Cloudinary upload
    // For now, return mock response
    
    res.status(200).json({
      success: true,
      message: 'Photo upload endpoint - Cloudinary integration needed',
      data: {
        url: 'https://via.placeholder.com/400',
        photoId: 'mock_photo_id'
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
