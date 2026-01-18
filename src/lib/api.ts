// API Service for Admin Panel
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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
  return response.json();
}

async function apiPost<T>(endpoint: string, data: any): Promise<{ success: boolean; data: T }> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
}

async function apiPut<T>(endpoint: string, data: any): Promise<{ success: boolean; data: T }> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
}

async function apiDelete(endpoint: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
}

// Admin Services
export const adminAPI = {
  // Dashboard
  getDashboardStats: () => apiGet('/admin/dashboard-stats'),
  
  // Members
  getMembers: () => apiGet('/admin/members'),
  deleteMember: (id: string) => apiDelete(`/admin/members/${id}`),
  
  // Form Data
  getFormData: () => apiGet('/admin/form-data'),
  addFormData: (data: any) => apiPost('/admin/form-data', data),
  
  // Settings
  getSettings: () => apiGet('/admin/settings'),
  updateSettings: (data: any) => apiPut('/admin/settings', data),
  
  // Approvals
  getApprovals: () => apiGet('/admin/approvals'),
  
  // Matches
  getMatches: () => apiGet('/admin/matches'),
  
  // Membership Plans
  getMembershipPlans: () => apiGet('/admin/membership-plans'),
  createMembershipPlan: (data: any) => apiPost('/admin/membership-plans', data),
  
  // Advertisements
  getAdvertisements: () => apiGet('/admin/advertisements'),
  createAdvertisement: (data: any) => apiPost('/admin/advertisements', data),
  
  // User Activity
  getUserActivity: () => apiGet('/admin/user-activity'),
  
  // Content
  getContent: () => apiGet('/admin/content'),
  createContent: (data: any) => apiPost('/admin/content', data),
  
  // Email Templates
  getEmailTemplates: () => apiGet('/admin/email-templates'),
  createEmailTemplate: (data: any) => apiPost('/admin/email-templates', data),
  
  // Contact Data
  getContactData: () => apiGet('/admin/contact-data'),
  
  // Member Report
  getMemberReport: () => apiGet('/admin/member-report'),
  
  // Payment Options
  getPaymentOptions: () => apiGet('/admin/payment-options'),
  createPaymentOption: (data: any) => apiPost('/admin/payment-options', data),
};

// Reference Data Services
export const referenceDataAPI = {
  // Religions
  getReligions: () => apiGet('/reference/religions'),
  createReligion: (data: any) => apiPost('/reference/religions', data),
  updateReligion: (id: string, data: any) => apiPut(`/reference/religions/${id}`, data),
  deleteReligion: (id: string) => apiDelete(`/reference/religions/${id}`),
  
  // Castes
  getCastes: () => apiGet('/reference/castes'),
  createCaste: (data: any) => apiPost('/reference/castes', data),
  updateCaste: (id: string, data: any) => apiPut(`/reference/castes/${id}`, data),
  deleteCaste: (id: string) => apiDelete(`/reference/castes/${id}`),
  
  // Sub Castes
  getSubCastes: () => apiGet('/reference/sub-castes'),
  createSubCaste: (data: any) => apiPost('/reference/sub-castes', data),
  updateSubCaste: (id: string, data: any) => apiPut(`/reference/sub-castes/${id}`, data),
  deleteSubCaste: (id: string) => apiDelete(`/reference/sub-castes/${id}`),
  
  // Gotras
  getGotras: () => apiGet('/reference/gotras'),
  createGotra: (data: any) => apiPost('/reference/gotras', data),
  updateGotra: (id: string, data: any) => apiPut(`/reference/gotras/${id}`, data),
  deleteGotra: (id: string) => apiDelete(`/reference/gotras/${id}`),
  
  // Countries
  getCountries: () => apiGet('/reference/countries'),
  createCountry: (data: any) => apiPost('/reference/countries', data),
  updateCountry: (id: string, data: any) => apiPut(`/reference/countries/${id}`, data),
  deleteCountry: (id: string) => apiDelete(`/reference/countries/${id}`),
  
  // States
  getStates: () => apiGet('/reference/states'),
  createState: (data: any) => apiPost('/reference/states', data),
  updateState: (id: string, data: any) => apiPut(`/reference/states/${id}`, data),
  deleteState: (id: string) => apiDelete(`/reference/states/${id}`),
  
  // Cities
  getCities: () => apiGet('/reference/cities'),
  createCity: (data: any) => apiPost('/reference/cities', data),
  updateCity: (id: string, data: any) => apiPut(`/reference/cities/${id}`, data),
  deleteCity: (id: string) => apiDelete(`/reference/cities/${id}`),
  
  // Occupations
  getOccupations: () => apiGet('/reference/occupations'),
  createOccupation: (data: any) => apiPost('/reference/occupations', data),
  updateOccupation: (id: string, data: any) => apiPut(`/reference/occupations/${id}`, data),
  deleteOccupation: (id: string) => apiDelete(`/reference/occupations/${id}`),
  
  // Educations
  getEducations: () => apiGet('/reference/educations'),
  createEducation: (data: any) => apiPost('/reference/educations', data),
  updateEducation: (id: string, data: any) => apiPut(`/reference/educations/${id}`, data),
  deleteEducation: (id: string) => apiDelete(`/reference/educations/${id}`),
  
  // Mother Tongues
  getMotherTongues: () => apiGet('/reference/mother-tongues'),
  createMotherTongue: (data: any) => apiPost('/reference/mother-tongues', data),
  updateMotherTongue: (id: string, data: any) => apiPut(`/reference/mother-tongues/${id}`, data),
  deleteMotherTongue: (id: string) => apiDelete(`/reference/mother-tongues/${id}`),
  
  // Stars
  getStars: () => apiGet('/reference/stars'),
  createStar: (data: any) => apiPost('/reference/stars', data),
  updateStar: (id: string, data: any) => apiPut(`/reference/stars/${id}`, data),
  deleteStar: (id: string) => apiDelete(`/reference/stars/${id}`),
  
  // Rasis
  getRasis: () => apiGet('/reference/rasis'),
  createRasi: (data: any) => apiPost('/reference/rasis', data),
  updateRasi: (id: string, data: any) => apiPut(`/reference/rasis/${id}`, data),
  deleteRasi: (id: string) => apiDelete(`/reference/rasis/${id}`),
  
  // Annual Incomes
  getAnnualIncomes: () => apiGet('/reference/annual-incomes'),
  createAnnualIncome: (data: any) => apiPost('/reference/annual-incomes', data),
  updateAnnualIncome: (id: string, data: any) => apiPut(`/reference/annual-incomes/${id}`, data),
  deleteAnnualIncome: (id: string) => apiDelete(`/reference/annual-incomes/${id}`),
  
  // Doshs
  getDoshs: () => apiGet('/reference/doshs'),
  createDosh: (data: any) => apiPost('/reference/doshs', data),
  updateDosh: (id: string, data: any) => apiPut(`/reference/doshs/${id}`, data),
  deleteDosh: (id: string) => apiDelete(`/reference/doshs/${id}`),
};

// User Activity Services
export const userActivityAPI = {
  getExpressInterests: () => apiGet('/user-activity/express-interests'),
  getMessages: () => apiGet('/user-activity/messages'),
  getViewedProfiles: () => apiGet('/user-activity/viewed-profiles'),
  getBlockedProfiles: () => apiGet('/user-activity/blocked-profiles'),
  getShortlistedProfiles: () => apiGet('/user-activity/shortlisted-profiles'),
};

// Site Settings Services
export const siteSettingsAPI = {
  getFaviconLogo: () => apiGet('/admin/settings/favicon-logo'),
  updateFaviconLogo: (data: any) => apiPut('/admin/settings/favicon-logo', data),
  
  getHomeBanner: () => apiGet('/admin/settings/home-banner'),
  updateHomeBanner: (data: any) => apiPut('/admin/settings/home-banner', data),
  
  getWatermark: () => apiGet('/admin/settings/watermark'),
  updateWatermark: (data: any) => apiPut('/admin/settings/watermark', data),
  
  getFieldConfig: () => apiGet('/admin/settings/fields'),
  updateFieldConfig: (data: any) => apiPut('/admin/settings/fields', data),
  
  getMenuConfig: () => apiGet('/admin/settings/menu-items'),
  updateMenuConfig: (data: any) => apiPut('/admin/settings/menu-items', data),
  
  getProfileIdConfig: () => apiGet('/admin/settings/profile-id'),
  updateProfileIdConfig: (data: any) => apiPut('/admin/settings/profile-id', data),
  
  getEmailSettings: () => apiGet('/admin/settings/email'),
  updateEmailSettings: (data: any) => apiPut('/admin/settings/email', data),
  
  getBasicSiteConfig: () => apiGet('/admin/settings/basic-config'),
  updateBasicSiteConfig: (data: any) => apiPut('/admin/settings/basic-config', data),
  
  getAnalyticsCode: () => apiGet('/admin/settings/analytics'),
  updateAnalyticsCode: (data: any) => apiPut('/admin/settings/analytics', data),
  
  getSocialMedia: () => apiGet('/admin/settings/social-media'),
  updateSocialMedia: (data: any) => apiPut('/admin/settings/social-media', data),
  
  getAppBanner: () => apiGet('/admin/settings/app-banner'),
  updateAppBanner: (data: any) => apiPut('/admin/settings/app-banner', data),
};

export default {
  admin: adminAPI,
  reference: referenceDataAPI,
  userActivity: userActivityAPI,
  siteSettings: siteSettingsAPI,
};
