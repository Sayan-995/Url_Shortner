import { useCallback, useState } from 'react';
import analyticsService from '../services/analyticsService';

export const useAnalyticsService = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalyticsData = useCallback(async (shortCode) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getAnalytics(shortCode);
      setAnalytics(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics');
      setAnalytics(analyticsService.getDefaultAnalytics());
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTopCountry = useCallback(() => {
    if (!analytics) return null;
    return analyticsService.getTopItem(analytics.countryCounts);
  }, [analytics]);

  const getTopBrowser = useCallback(() => {
    if (!analytics) return null;
    return analyticsService.getTopItem(analytics.browserCounts);
  }, [analytics]);

  const getTopCity = useCallback(() => {
    if (!analytics) return null;
    return analyticsService.getTopItem(analytics.cityCounts);
  }, [analytics]);

  const getClickRate = useCallback(() => {
    if (!analytics) return 0;
    return analyticsService.getClickRate(analytics);
  }, [analytics]);

  const clearAnalytics = useCallback(() => {
    setAnalytics(null);
    setError(null);
  }, []);

  return {
    analytics,
    isLoading,
    error,
    fetchAnalyticsData,
    getTopCountry,
    getTopBrowser,
    getTopCity,
    getClickRate,
    clearAnalytics,
  };
};
