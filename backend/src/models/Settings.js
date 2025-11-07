const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  notifications: {
    newMatches: {
      type: Boolean,
      default: true
    },
    profileViews: {
      type: Boolean,
      default: true
    },
    interests: {
      type: Boolean,
      default: true
    },
    email: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    }
  },
  
  showLastSeen: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index (userId index is defined in field definition with unique: true)

module.exports = mongoose.model('Settings', settingsSchema);
