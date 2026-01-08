import apiClient from '../api/client';

class AnalyticsService {
  /**
   * Fetch analytics for a specific short code
   * @param {string} shortCode - The short code
   * @returns {Promise<Object>} - Analytics data
   */
  async getAnalytics(shortCode) {
    try {
      const query = `
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

      const response = await apiClient.post('/analytics', { query });
      
      if (response.data?.data?.analytics) {
        return response.data.data.analytics;
      } else if (response.data?.analytics) {
        return response.data.analytics;
      }
      
      return this.getDefaultAnalytics();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return this.getDefaultAnalytics();
    }
  }

  /**
   * Get default empty analytics object
   * @returns {Object}
   */
  getDefaultAnalytics() {
    return {
      clickCount: 0,
      uniqueClickCount: 0,
      countryCounts: [],
      regionCounts: [],
      cityCounts: [],
      browserCounts: [],
      osCounts: [],
      timeCounts: [],
      dateCounts: [],
      refererCounts: [],
      deviceCounts: [],
    };
  }

  /**
   * Get click rate percentage
   * @param {Object} analytics - Analytics object
   * @returns {number} - Click rate percentage
   */
  getClickRate(analytics) {
    if (!analytics || !analytics.uniqueClickCount) return 0;
    return Math.round((analytics.clickCount / analytics.uniqueClickCount) * 100);
  }

  /**
   * Get top item from stats
   * @param {Array} stats - Stats array
   * @returns {Object|null}
   */
  getTopItem(stats) {
    if (!stats || stats.length === 0) return null;
    return stats.reduce((prev, current) =>
      prev.count > current.count ? prev : current
    );
  }
}

export default new AnalyticsService();
