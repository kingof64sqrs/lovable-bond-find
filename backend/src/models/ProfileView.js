const mongoose = require('mongoose');

const profileViewSchema = new mongoose.Schema({
  viewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  viewedProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  viewedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
profileViewSchema.index({ viewerId: 1 });
profileViewSchema.index({ viewedProfileId: 1 });
profileViewSchema.index({ viewerId: 1, viewedProfileId: 1 });
profileViewSchema.index({ viewedAt: -1 });

module.exports = mongoose.model('ProfileView', profileViewSchema);
