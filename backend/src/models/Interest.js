const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: 500
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
interestSchema.index({ senderId: 1 });
interestSchema.index({ receiverId: 1 });
interestSchema.index({ status: 1 });

// Prevent duplicate interests (compound index)
interestSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

module.exports = mongoose.model('Interest', interestSchema);
