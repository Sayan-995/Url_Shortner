import { useState, useCallback } from 'react';
import apiClient from '../api/client';

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalytics = useCallback(async (shortCode) => {
    setIsLoading(true);
    setError(null);
    setAnalyticsData(null);
    try {
      // GraphQL query - fetch ALL fields
      const query = `
        query {
          analytics(shortCode: "${shortCode}") {
            clickCount
            uniqueClickCount
            countryCounts { stat count }
            regionCounts { stat count }
            cityCounts { stat count }
            timeCounts { stat count }
            dateCounts { stat count }
            refererCounts { stat count }
            browserCounts { stat count }
            osCounts { stat count }
            deviceCounts { stat count }
          }
        }
      `;

      console.log('Sending GraphQL query:', query);
      
      const response = await apiClient.post('/analytics', { query });
      
      console.log('Analytics response:', response.data);
      
      if (response.data?.data?.analytics) {
        const analyticsResult = response.data.data.analytics;
        
        setAnalyticsData({
          clickCount: analyticsResult.clickCount || 0,
          uniqueClickCount: analyticsResult.uniqueClickCount || 0,
          countryData: analyticsResult.countryCounts?.reduce((acc, item) => {
            acc[item.stat] = item.count;
            return acc;
          }, {}) || {},
          regionData: analyticsResult.regionCounts?.reduce((acc, item) => {
            acc[item.stat] = item.count;
            return acc;
          }, {}) || {},
          cityData: analyticsResult.cityCounts?.reduce((acc, item) => {
            acc[item.stat] = item.count;
            return acc;
          }, {}) || {},
          timeData: analyticsResult.timeCounts?.reduce((acc, item) => {
            acc[item.stat] = item.count;
            return acc;
          }, {}) || {},
          dateData: analyticsResult.dateCounts?.reduce((acc, item) => {
            acc[item.stat] = item.count;
            return acc;
          }, {}) || {},
          refererData: analyticsResult.refererCounts?.reduce((acc, item) => {
            acc[item.stat] = item.count;
            return acc;
          }, {}) || {},
          deviceData: analyticsResult.deviceCounts?.reduce((acc, item) => {
            acc[item.stat] = item.count;
            return acc;
          }, {}) || {},
          browserData: analyticsResult.browserCounts?.reduce((acc, item) => {
            acc[item.stat] = item.count;
            return acc;
          }, {}) || {},
          osData: analyticsResult.osCounts?.reduce((acc, item) => {
            acc[item.stat] = item.count;
            return acc;
          }, {}) || {},
        });
      } else if (response.data?.errors) {
        throw new Error(response.data.errors[0]?.message || 'GraphQL error');
      }
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError(err.message || 'Failed to fetch analytics');
      setAnalyticsData({
        clickCount: 0,
        uniqueClickCount: 0,
        countryData: {},
        regionData: {},
        cityData: {},
        timeData: {},
        dateData: {},
        refererData: {},
        deviceData: {},
        browserData: {},
        osData: {},
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    analyticsData,
    isLoading,
    error,
    fetchAnalytics,
  };
};
