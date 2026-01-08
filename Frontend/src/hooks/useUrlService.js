import { useCallback } from 'react';
import { useUrlStore } from '../store/store';
import urlService from '../services/urlService';

export const useUrlService = () => {
  const { setUrls, addUrl, setError, clearError } = useUrlStore();

  const fetchAllUrls = useCallback(async () => {
    clearError();
    try {
      const urls = await urlService.getUrls();
      setUrls(urls);
      return urls;
    } catch (error) {
      setError(error.message || 'Failed to fetch URLs');
      throw error;
    }
  }, [setUrls, setError, clearError]);

  const createShortUrl = useCallback(
    async (originalUrl) => {
      clearError();
      try {
        const shortUrl = await urlService.shortenUrl(originalUrl);
        const code = shortUrl.split('/').pop();
        const newUrl = {
          code,
          shorturl: shortUrl,
          originalurl: originalUrl,
          createdAt: new Date().toISOString(),
          clickCount: 0,
        };
        addUrl(newUrl);
        return newUrl;
      } catch (error) {
        setError(error.message || 'Failed to shorten URL');
        throw error;
      }
    },
    [addUrl, setError, clearError]
  );

  const deleteUrlByCode = useCallback(
    async (code) => {
      clearError();
      try {
        await urlService.deleteUrl(code);
        // Refresh the list after deletion
        await fetchAllUrls();
      } catch (error) {
        setError(error.message || 'Failed to delete URL');
        throw error;
      }
    },
    [fetchAllUrls, setError, clearError]
  );

  return {
    fetchAllUrls,
    createShortUrl,
    deleteUrlByCode,
  };
};
