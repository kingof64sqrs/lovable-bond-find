const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Basic Info
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  profileFor: {
    type: String,
    enum: ['self', 'son', 'daughter', 'brother', 'sister', 'friend'],
    default: 'self'
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Gender is required']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  age: {
    type: Number
  },
  phone: {
    type: String,
    trim: true
  },
  
  // Physical Attributes
  height: {
    type: String
  },
  weight: {
    type: Number
  },
  
  // Religious & Cultural
  religion: {
    type: String,
    required: [true, 'Religion is required']
  },
  caste: {
    type: String
  },
  motherTongue: {
    type: String
  },
  maritalStatus: {
    type: String,
    enum: ['never-married', 'divorced', 'widowed', 'awaiting-divorce'],
    default: 'never-married'
  },
  
  // Education & Career
  education: {
    type: String
  },
  educationDetails: {
    type: String
  },
  college: {
    type: String
  },
  occupation: {
    type: String
  },
  company: {
    type: String
  },
  employedIn: {
    type: String,
    enum: ['private', 'government', 'business', 'not-working']
  },
  annualIncome: {
    type: String
  },
  
  // Family Details
  familyType: {
    type: String,
    enum: ['nuclear', 'joint']
  },
  fatherName: {
    type: String
  },
  fatherOccupation: {
    type: String
  },
  motherName: {
    type: String
  },
  motherOccupation: {
    type: String
  },
  siblings: {
    type: String
  },
  
  // Location
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  
  // About
  about: {
    type: String,
    maxlength: 1000
  },
  hobbies: [{
    type: String
  }],
  
  // Profile Status
  profileCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  photos: [{
    url: {
      type: String
    },
    isPrimary: {
      type: Boolean,
      default: false
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Privacy Settings
  profileVisibility: {
    type: String,
    enum: ['all', 'premium', 'matches', 'hidden'],
    default: 'all'
  },
  photoVisibility: {
    type: String,
    enum: ['all', 'premium', 'matches'],
    default: 'all'
  },
  phoneVisibility: {
    type: String,
    enum: ['none', 'premium', 'matches'],
    default: 'none'
  },
  
  // Metadata
  profileViews: {
    type: Number,
    default: 0
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  premiumExpiryDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes (userId index is defined in field definition with unique: true)
profileSchema.index({ gender: 1, religion: 1, city: 1 });
profileSchema.index({ age: 1 });
profileSchema.index({ maritalStatus: 1 });
profileSchema.index({ isPremium: 1 });

// Calculate age before saving
profileSchema.pre('save', function(next) {
  if (this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    this.age = age;
  }
  next();
});

// Calculate profile completion
profileSchema.methods.calculateCompletion = function() {
  const fields = [
    'name', 'gender', 'dateOfBirth', 'phone', 'height', 'religion',
    'motherTongue', 'maritalStatus', 'education', 'occupation',
    'country', 'state', 'city', 'about'
  ];
  
  let completed = 0;
  fields.forEach(field => {
    if (this[field]) completed++;
  });
  
  if (this.photos && this.photos.length > 0) completed++;
  if (this.hobbies && this.hobbies.length > 0) completed++;
  
  this.profileCompletion = Math.round((completed / (fields.length + 2)) * 100);
};

module.exports = mongoose.model('Profile', profileSchema);
