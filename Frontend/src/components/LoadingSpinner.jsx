import React from 'react';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-b-primary-500`}></div>
      <p className="text-sm text-gray-600">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
