import apiClient from './client';

export const urlApi = {
  // Create a short URL
  createShortUrl: (url) => {
    return apiClient.post('/url', { url });
  },

  // Get all URLs for the current user
  getAllUrls: () => {
    return apiClient.get('/url');
  },

  // Get a single URL
  getUrl: (code) => {
    return apiClient.get(`/url/${code}`);
  },

  // Delete a URL
  deleteUrl: (code) => {
    return apiClient.delete(`/url/${code}`);
  },

  // Health check
  healthCheck: () => {
    return apiClient.get('/health-check');
  },
};

// GraphQL Analytics query
export const getAnalyticsQuery = (shortCode) => {
  return `
    query {
      analytics(shortCode: "${shortCode}") {
        clickCount
        uniqueClickCount
        countryCounts { stat count }
        regionCounts { stat count }
        cityCounts { stat count }
        browserCounts { stat count }
        osCounts { stat count }
        timeCounts { stat count }
        dateCounts { stat count }
        refererCounts { stat count }
        deviceCounts { stat count }
      }
    }
  `;
};

// Fetch analytics from GraphQL endpoint
export const fetchGraphQLAnalytics = async (shortCode) => {
  try {
    const response = await apiClient.post('/analytics', {
      query: getAnalyticsQuery(shortCode),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};
