/**
 * Configuration for environment-specific settings
 */

const env = import.meta.env;

export const config = {
  isDevelopment: env.DEV,
  isProduction: env.PROD,
  
  api: {
    baseUrl: env.VITE_API_URL,
    timeout: 10000,
    retries: 2,
  },

  app: {
    name: 'SnapURL',
    description: 'Professional URL Shortener',
    version: '1.0.0',
  },

  features: {
    analytics: true,
    qrCode: true,
    export: false,
    customDomain: false,
  },

  limits: {
    maxUrlLength: 2048,
    maxShortCodeLength: 8,
    minShortCodeLength: 4,
  },

  cache: {
    enabled: true,
    ttl: 300000, // 5 minutes
  },
};

export default config;
