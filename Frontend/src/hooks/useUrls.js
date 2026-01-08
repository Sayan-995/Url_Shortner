import { useCallback, useState } from 'react';
import { urlApi } from '../api/urls';
import { useUrlStore } from '../store/store';

export const useUrls = () => {
  const { urls, setUrls, addUrl, deleteUrl, setLoading, setError, clearError } = useUrlStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUrls = useCallback(async () => {
    setIsLoading(true);
    setLoading(true);
    clearError();
    try {
      const response = await urlApi.getAllUrls();
      setUrls(response.data || []);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch URLs';
      setError(message);
      console.error('Error fetching URLs:', error);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [setUrls, setLoading, setError, clearError]);

  const shortenUrl = useCallback(async (originalUrl) => {
    setIsLoading(true);
    setLoading(true);
    clearError();
    try {
      const response = await urlApi.createShortUrl(originalUrl);
      const newUrl = {
        code: response.data.split('/').pop(),
        shorturl: response.data,
        originalurl: originalUrl,
        createdAt: new Date().toISOString(),
        clickCount: 0,
      };
      addUrl(newUrl);
      return newUrl;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to shorten URL';
      setError(message);
      console.error('Error shortening URL:', error);
      throw error;
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [addUrl, setLoading, setError, clearError]);

  return {
    urls,
    isLoading,
    fetchUrls,
    shortenUrl,
  };
};
