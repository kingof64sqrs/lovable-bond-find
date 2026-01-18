// Central API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://140.238.227.29:3000/api';

// Helper function to construct API URLs
export const getApiUrl = (endpoint: string): string => {
  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
};
