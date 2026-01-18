// Frontend User API Service
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL || 'http://140.238.227.29:3000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Generic API functions
async function apiGet<T>(endpoint: string): Promise<{ success: boolean; data: T }> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function apiPost<T>(endpoint: string, data: any): Promise<{ success: boolean; data: T }> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function apiPut<T>(endpoint: string, data: any): Promise<{ success: boolean; data: T }> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function apiDelete(endpoint: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// User Profile APIs
export const profileAPI = {
  // Get current user profile
  getMyProfile: () => apiGet('/profile/me'),
  
  // Get profile by ID
  getProfile: (id: string) => apiGet(`/profile/${id}`),
  
  // Create profile
  createProfile: (data: any) => apiPost('/profile', data),
  
  // Update profile
  updateProfile: (data: any) => apiPut('/profile', data),
  
  // Upload profile photo
  uploadPhoto: async (file: File) => {
    const formData = new FormData();
    formData.append('photo', file);
    const response = await fetch(`${API_BASE_URL}/profile/photo`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: formData
    });
    return response.json();
  }
};

// Search & Match APIs
export const searchAPI = {
  // Search profiles with filters
  searchProfiles: (filters: any) => apiPost('/search', filters),
  
  // Get matches for current user
  getMatches: () => apiGet('/matches'),
  
  // Get match recommendations
  getRecommendations: () => apiGet('/matches/recommendations'),
  
  // Get similar profiles
  getSimilarProfiles: (profileId: string) => apiGet(`/matches/similar/${profileId}`)
};

// Interest & Connection APIs
export const interestAPI = {
  // Send interest to a profile
  sendInterest: (profileId: string | number) => apiPost('/interests/send', { profileId: String(profileId) }),

  // Get received interests
  getReceivedInterests: () => apiGet('/interests/received'),

  // Get sent interests
  getSentInterests: () => apiGet('/interests/sent'),

  // Accept interest
  acceptInterest: (interestId: string) => apiPost(`/interests/${interestId}/accept`, {}),

  // Decline interest
  declineInterest: (interestId: string) => apiPost(`/interests/${interestId}/decline`, {}),

  // Get mutual interests (matches)
  getMutualInterests: () => apiGet('/interests/mutual')
};

// User Activity APIs
export const activityAPI = {
  // Add profile to shortlist
  addToShortlist: (profileId: string) => apiPost('/activity/shortlist', { profileId }),
  
  // Remove from shortlist
  removeFromShortlist: (profileId: string) => apiDelete(`/activity/shortlist/${profileId}`),
  
  // Get shortlisted profiles
  getShortlist: () => apiGet('/activity/shortlist'),
  
  // Block a profile
  blockProfile: (profileId: string) => apiPost('/activity/block', { profileId }),
  
  // Unblock a profile
  unblockProfile: (profileId: string) => apiDelete(`/activity/block/${profileId}`),
  
  // Get blocked profiles
  getBlockedProfiles: () => apiGet('/activity/blocked'),
  
  // Track profile view
  viewProfile: (profileId: string) => apiPost('/activity/view', { profileId }),
  
  // Get profile viewers
  getProfileViewers: () => apiGet('/activity/viewers'),
  
  // Get viewed profiles
  getViewedProfiles: () => apiGet('/activity/viewed')
};

// Messaging APIs
export const messageAPI = {
  // Send message
  sendMessage: (recipientId: string, message: string) => 
    apiPost('/messages/send', { recipientId, message }),
  
  // Get conversations
  getConversations: () => apiGet('/messages/conversations'),
  
  // Get messages with a user
  getMessages: (userId: string) => apiGet(`/messages/${userId}`),
  
  // Mark messages as read
  markAsRead: (conversationId: string) => apiPut(`/messages/${conversationId}/read`, {})
};

// Dashboard APIs
export const dashboardAPI = {
  // Get dashboard stats
  getStats: () => apiGet('/dashboard/stats'),
  
  // Get recent activity
  getRecentActivity: () => apiGet('/dashboard/activity'),
  
  // Get notifications
  getNotifications: () => apiGet('/dashboard/notifications'),
  
  // Mark notification as read
  markNotificationRead: (notificationId: string) => 
    apiPut(`/dashboard/notifications/${notificationId}/read`, {})
};

// Settings APIs
export const settingsAPI = {
  // Get user settings
  getSettings: () => apiGet('/settings'),
  
  // Update settings
  updateSettings: (settings: any) => apiPut('/settings', settings),
  
  // Update password
  updatePassword: (oldPassword: string, newPassword: string) => 
    apiPost('/settings/password', { oldPassword, newPassword }),
  
  // Update privacy settings
  updatePrivacy: (privacy: any) => apiPut('/settings/privacy', privacy),
  
  // Update notification settings
  updateNotifications: (notifications: any) => apiPut('/settings/notifications', notifications)
};

// Payment & Subscription APIs
export const subscriptionAPI = {
  // Get subscription plans
  getPlans: () => apiGet('/subscription/plans'),
  
  // Get current subscription
  getCurrentSubscription: () => apiGet('/subscription/current'),
  
  // Subscribe to plan
  subscribe: (planId: string, paymentDetails: any) => 
    apiPost('/subscription/subscribe', { planId, paymentDetails }),
  
  // Cancel subscription
  cancelSubscription: () => apiPost('/subscription/cancel', {}),
  
  // Get payment history
  getPaymentHistory: () => apiGet('/subscription/payments')
};

// Contact & Support APIs
export const supportAPI = {
  // Submit contact form
  submitContact: (data: any) => apiPost('/contact', data),
  
  // Submit feedback
  submitFeedback: (data: any) => apiPost('/feedback', data),
  
  // Report profile
  reportProfile: (profileId: string, reason: string) => 
    apiPost('/report', { profileId, reason }),
  
  // Get help articles
  getHelpArticles: () => apiGet('/help/articles'),
  
  // Get FAQs
  getFAQs: () => apiGet('/help/faqs')
};

export const userAPI = {
  profileAPI,
  searchAPI,
  interestAPI,
  activityAPI,
  messageAPI,
  dashboardAPI,
  settingsAPI,
  subscriptionAPI,
  supportAPI
};

export default userAPI;
