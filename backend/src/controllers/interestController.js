const Interest = require('../models/Interest');
const Profile = require('../models/Profile');
const Notification = require('../models/Notification');

// @desc    Send interest
// @route   POST /api/interests
// @access  Private
exports.sendInterest = async (req, res, next) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Receiver ID is required'
        }
      });
    }

    // Check if receiver exists
    const receiverProfile = await Profile.findOne({ userId: receiverId });
    if (!receiverProfile) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: 'Receiver profile not found'
        }
      });
    }

    // Check if already sent interest
    const existingInterest = await Interest.findOne({
      senderId: req.user.id,
      receiverId
    });

    if (existingInterest) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INTEREST_EXISTS',
          message: 'You have already sent interest to this profile'
        }
      });
    }

    // Create interest
    const interest = await Interest.create({
      senderId: req.user.id,
      receiverId,
      message: message || ''
    });

    // Create notification for receiver
    const senderProfile = await Profile.findOne({ userId: req.user.id });
    await Notification.create({
      userId: receiverId,
      type: 'interest',
      title: 'New Interest Received',
      message: `${senderProfile.name} sent you an interest`,
      relatedId: interest._id
    });

    res.status(201).json({
      success: true,
      message: 'Interest sent successfully',
      data: {
        interestId: interest._id
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Respond to interest
// @route   PUT /api/interests/:id
// @access  Private
exports.respondToInterest = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status || !['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Valid status is required (accepted or rejected)'
        }
      });
    }

    const interest = await Interest.findById(req.params.id);

    if (!interest) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'INTEREST_NOT_FOUND',
          message: 'Interest not found'
        }
      });
    }

    // Check if user is the receiver
    if (interest.receiverId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You can only respond to interests sent to you'
        }
      });
    }

    // Update interest
    interest.status = status;
    interest.respondedAt = Date.now();
    await interest.save();

    // Create notification for sender
    const receiverProfile = await Profile.findOne({ userId: req.user.id });
    await Notification.create({
      userId: interest.senderId,
      type: 'interest',
      title: `Interest ${status}`,
      message: `${receiverProfile.name} ${status} your interest`,
      relatedId: interest._id
    });

    res.status(200).json({
      success: true,
      message: `Interest ${status}`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get interests
// @route   GET /api/interests
// @access  Private
exports.getInterests = async (req, res, next) => {
  try {
    const { type = 'received', status } = req.query;

    const query = {};

    if (type === 'sent') {
      query.senderId = req.user.id;
    } else {
      query.receiverId = req.user.id;
    }

    if (status) {
      query.status = status;
    }

    const interests = await Interest.find(query)
      .sort({ sentAt: -1 })
      .populate({
        path: type === 'sent' ? 'receiverId' : 'senderId',
        select: 'email'
      });

    // Get profiles for each interest
    const interestsWithProfiles = await Promise.all(
      interests.map(async (interest) => {
        const profileUserId = type === 'sent' ? interest.receiverId : interest.senderId;
        const profile = await Profile.findOne({ userId: profileUserId })
          .select('name age city photos');

        return {
          id: interest._id,
          profile: {
            id: profile._id,
            name: profile.name,
            age: profile.age,
            city: profile.city,
            photo: profile.photos && profile.photos.length > 0
              ? profile.photos.find(p => p.isPrimary)?.url || profile.photos[0].url
              : null
          },
          message: interest.message,
          status: interest.status,
          sentAt: interest.sentAt,
          respondedAt: interest.respondedAt
        };
      })
    );

    res.status(200).json({
      success: true,
      data: interestsWithProfiles
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
