import React from 'react';
import { ExternalLink, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CopyButton from './CopyButton';
import { formatDate } from '../utils/helpers';

const UrlCard = ({ url, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 break-all line-clamp-2 mb-1">
              {url.originalurl}
            </h3>
            <p className="text-xs text-gray-500">
              Created {formatDate(url.createdAt)}
            </p>
          </div>
        </div>

        {/* Short URL */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Short URL</p>
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-primary-600 break-all">
              {url.shorturl}
            </code>
            <CopyButton text={url.shorturl} />
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{url.clickCount || 0}</p>
              <p className="text-xs text-gray-500">Clicks</p>
            </div>
          </div>
          <Link
            to={`/analytics/${url.code}`}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <BarChart3 size={18} />
            <span className="text-sm">Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
