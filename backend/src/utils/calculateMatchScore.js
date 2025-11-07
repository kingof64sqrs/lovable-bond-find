/**
 * Calculate match score between user preferences and a profile
 * @param {Object} preferences - User's preferences
 * @param {Object} profile - Profile to match against
 * @returns {Number} - Match score (0-100)
 */
const calculateMatchScore = (preferences, profile) => {
  if (!preferences || !profile) return 50;

  let score = 0;
  let criteria = 0;

  // Age match (15 points)
  if (preferences.ageRange && profile.age) {
    criteria++;
    if (profile.age >= preferences.ageRange.min && profile.age <= preferences.ageRange.max) {
      score += 15;
    } else {
      const diff = Math.min(
        Math.abs(profile.age - preferences.ageRange.min),
        Math.abs(profile.age - preferences.ageRange.max)
      );
      score += Math.max(0, 15 - diff * 2);
    }
  }

  // Religion match (20 points)
  if (preferences.religion && preferences.religion.length > 0 && profile.religion) {
    criteria++;
    if (preferences.religion.includes(profile.religion.toLowerCase())) {
      score += 20;
    }
  }

  // Marital status match (10 points)
  if (preferences.maritalStatus && preferences.maritalStatus.length > 0 && profile.maritalStatus) {
    criteria++;
    if (preferences.maritalStatus.includes(profile.maritalStatus)) {
      score += 10;
    }
  }

  // Education match (15 points)
  if (preferences.education && preferences.education.length > 0 && profile.education) {
    criteria++;
    if (preferences.education.some(edu => 
      profile.education.toLowerCase().includes(edu.toLowerCase())
    )) {
      score += 15;
    }
  }

  // Location match (20 points)
  if (preferences.location && profile.city) {
    criteria++;
    const locationMatch = 
      (preferences.location.cities && preferences.location.cities.includes(profile.city)) ||
      (preferences.location.states && preferences.location.states.includes(profile.state)) ||
      (preferences.location.countries && preferences.location.countries.includes(profile.country));
    
    if (locationMatch) {
      score += 20;
    }
  }

  // Mother tongue match (10 points)
  if (preferences.motherTongue && preferences.motherTongue.length > 0 && profile.motherTongue) {
    criteria++;
    if (preferences.motherTongue.includes(profile.motherTongue)) {
      score += 10;
    }
  }

  // Occupation match (10 points)
  if (preferences.occupation && preferences.occupation.length > 0 && profile.occupation) {
    criteria++;
    if (preferences.occupation.some(occ => 
      profile.occupation.toLowerCase().includes(occ.toLowerCase())
    )) {
      score += 10;
    }
  }

  // If no criteria matched, return base score
  if (criteria === 0) return 50;

  // Normalize score to 0-100
  return Math.min(100, Math.round(score));
};

module.exports = calculateMatchScore;
