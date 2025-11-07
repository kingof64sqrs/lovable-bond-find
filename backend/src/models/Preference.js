const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  ageRange: {
    min: {
      type: Number,
      default: 18
    },
    max: {
      type: Number,
      default: 40
    }
  },
  
  heightRange: {
    min: {
      type: String
    },
    max: {
      type: String
    }
  },
  
  maritalStatus: [{
    type: String,
    enum: ['never-married', 'divorced', 'widowed', 'awaiting-divorce']
  }],
  
  religion: [{
    type: String
  }],
  
  caste: [{
    type: String
  }],
  
  motherTongue: [{
    type: String
  }],
  
  education: [{
    type: String
  }],
  
  occupation: [{
    type: String
  }],
  
  location: {
    countries: [{
      type: String
    }],
    states: [{
      type: String
    }],
    cities: [{
      type: String
    }]
  }
}, {
  timestamps: true
});

// Index (userId index is defined in field definition with unique: true)

module.exports = mongoose.model('Preference', preferenceSchema);
