import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const EmptyState = ({ icon: Icon = AlertCircle, title, description, action, actionLabel = 'Try Again' }) => {
  return (
    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Icon size={32} className="text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {action && (
        <button
          onClick={action}
          className="flex items-center justify-center space-x-2 mx-auto px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <RefreshCw size={18} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
