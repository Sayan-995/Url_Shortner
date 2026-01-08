/**
 * Validation schemas and utilities
 */

export const validators = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  url: (url) => {
    try {
      new URL(url);
      // Check if it's a valid protocol
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  },

  password: (password) => {
    return password && password.length >= 6;
  },

  shortCode: (code) => {
    return /^[a-zA-Z0-9-_]+$/.test(code);
  },
};

export const validateForm = (formData, schema) => {
  const errors = {};

  Object.keys(schema).forEach((field) => {
    const validator = schema[field];
    if (!validator(formData[field])) {
      errors[field] = `Invalid ${field}`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
