import apiClient from '../api/client';

class UrlService {
  /**
   * Create a shortened URL
   * @param {string} originalUrl - The original URL to shorten
   * @returns {Promise<string>} - The shortened URL
   */
  async shortenUrl(originalUrl) {
    try {
      const response = await apiClient.post('/url', { url: originalUrl });
      return response.data;
    } catch (error) {
      console.error('Error shortening URL:', error);
      throw error;
    }
  }

  /**
   * Get all URLs for the current user
   * @returns {Promise<Array>} - Array of URL objects
   */
  async getUrls() {
    try {
      const response = await apiClient.get('/url');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching URLs:', error);
      throw error;
    }
  }

  /**
   * Get a single URL by code
   * @param {string} code - The short code
   * @returns {Promise<Object>} - URL object
   */
  async getUrlByCode(code) {
    try {
      const response = await apiClient.get(`/url/${code}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching URL:', error);
      throw error;
    }
  }

  /**
   * Delete a URL
   * @param {string} code - The short code
   * @returns {Promise<void>}
   */
  async deleteUrl(code) {
    try {
      await apiClient.delete(`/url/${code}`);
    } catch (error) {
      console.error('Error deleting URL:', error);
      throw error;
    }
  }

  /**
   * Check if backend is healthy
   * @returns {Promise<boolean>}
   */
  async checkHealth() {
    try {
      const response = await apiClient.get('/health-check');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default new UrlService();
