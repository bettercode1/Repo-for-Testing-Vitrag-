// Centralized API configuration
// In production, REACT_APP_API_URL should be set to your backend URL
// Example: https://your-backend.onrender.com/api

const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

export const getApiUrl = (endpoint) => {
  // Ensure endpoint starts with a single slash
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
};

export const API_URL = API_BASE_URL;

const apiConfig = {
  getApiUrl,
  API_URL
};

export default apiConfig;

