import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Store the getToken function globally
let getTokenFunction = null;

export const setAuthFunction = (getToken) => {
  getTokenFunction = getToken;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - Add Clerk JWT token as Bearer
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get the JWT token from Clerk via the stored getToken function
      if (getTokenFunction) {
        const token = await getTokenFunction();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('✓ Clerk JWT token injected in Authorization header');
        }
      }
    } catch (error) {
      console.error('Error getting Clerk token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Clerk session expired');
      window.location.href = '/';
    }
    
    if (error.response?.status === 403) {
      console.error('Access denied (403):', error.response.data);
    }
    
    if (error.response?.status === 500) {
      console.error('Server error (500):', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
