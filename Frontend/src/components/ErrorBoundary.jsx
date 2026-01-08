import React from 'react';
import { RotateCw } from 'lucide-react';

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const handleError = (event) => {
      setHasError(true);
      setError(event.reason);
    };

    window.addEventListener('unhandledrejection', handleError);
    return () => window.removeEventListener('unhandledrejection', handleError);
  }, []);

  if (hasError) {
    return fallback ? (
      fallback(error, () => {
        setHasError(false);
        setError(null);
      })
    ) : (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <RotateCw size={20} />
            <span>Refresh Page</span>
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
