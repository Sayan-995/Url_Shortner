/**
 * Central export file for easier imports
 * Usage: import { useUrls, Alert } from '@/index'
 */

// Hooks
export { useUrls } from './hooks/useUrls';
export { useAnalytics } from './hooks/useAnalytics';
export { useUrlService } from './hooks/useUrlService';
export { useAnalyticsService } from './hooks/useAnalyticsService';

// Store
export { useAuthStore, useUrlStore } from './store/store';

// Components
export { default as Navigation } from './components/Navigation';
export { default as Alert } from './components/Alert';
export { default as CopyButton } from './components/CopyButton';
export { default as UrlCard } from './components/UrlCard';
export { default as UrlListItem } from './components/UrlListItem';
export { default as QRCodeModal } from './components/QRCodeModal';
export { default as ShortenedUrlResult } from './components/ShortenedUrlResult';
export { default as StatsOverview } from './components/StatsOverview';
export { default as LoadingSpinner } from './components/LoadingSpinner';
export { default as EmptyState } from './components/EmptyState';
export { default as ErrorBoundary } from './components/ErrorBoundary';
export { default as ProtectedRoute } from './components/ProtectedRoute';

// Services
export { default as urlService } from './services/urlService';
export { default as analyticsService } from './services/analyticsService';

// Utils
export * from './utils/helpers';
export * from './utils/validators';
export * from './utils/formatters';
export * from './utils/storage';

// API
export { default as apiClient } from './api/client';
export * as urlApi from './api/urls';

// Config
export { default as config } from './config/index';

// Constants
export * from './constants/api';
