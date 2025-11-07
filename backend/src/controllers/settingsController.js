const Settings = require('../models/Settings');

// @desc    Get user settings
// @route   GET /api/settings
// @access  Private
exports.getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne({ userId: req.user.id });

    // Create default settings if not exists
    if (!settings) {
      settings = await Settings.create({ userId: req.user.id });
    }

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user settings
// @route   PUT /api/settings
// @access  Private
exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = await Settings.create({
        userId: req.user.id,
        ...req.body
      });
    } else {
      // Update nested objects properly
      if (req.body.notifications) {
        settings.notifications = {
          ...settings.notifications.toObject(),
          ...req.body.notifications
        };
      }

      if (req.body.showLastSeen !== undefined) {
        settings.showLastSeen = req.body.showLastSeen;
      }

      await settings.save();
    }

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
