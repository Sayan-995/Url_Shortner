export const API_BASE_URL = import.meta.env.VITE_API_URL;

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  VERIFY_TOKEN: '/auth/verify',
};

// URL Endpoints
export const URL_ENDPOINTS = {
  CREATE: '/url',
  GET_ALL: '/url',
  GET_ONE: (code) => `/url/${code}`,
  DELETE: (code) => `/url/${code}`,
  UPDATE: (code) => `/url/${code}`,
};

// Analytics Endpoints
export const ANALYTICS_ENDPOINTS = {
  GRAPHQL: '/analytics',
  GET: (shortCode) => `/analytics?shortCode=${shortCode}`,
};

// Health & Monitoring
export const HEALTH_ENDPOINTS = {
  CHECK: '/health-check',
  STATUS: '/status',
};

// API Response Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Please sign in again.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'Resource not found.',
  INVALID_URL: 'Please enter a valid URL.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 6 characters.',
  PASSWORDS_MISMATCH: 'Passwords do not match.',
  DUPLICATE_EMAIL: 'Email already exists.',
};
