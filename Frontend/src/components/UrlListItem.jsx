import React from 'react';
import { Link } from 'react-router-dom';
import CopyButton from './CopyButton';
import { formatDate } from '../utils/helpers';
import { BarChart3, QrCode, ExternalLink, Trash2 } from 'lucide-react';

const UrlListItem = ({ url, onShowQR }) => {
  const fullShortUrl = `${import.meta.env.VITE_API_URL}/${url.shorturl}`;
  
  return (
    <div className="glass backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* URL Info */}
        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">Original URL</p>
            <p className="text-sm text-white break-all line-clamp-2 hover:line-clamp-none transition-all">
              {url.originalurl}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono text-pink-300 bg-pink-500/20 px-3 py-1 rounded-lg border border-pink-500/30">
                {url.shorturl}
              </code>
              <CopyButton text={fullShortUrl} label="Copy" />
            </div>
            <a 
              href={fullShortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-indigo-400 transition-colors"
              title="Open shortened URL"
            >
              <ExternalLink size={16} />
            </a>
          </div>
          
          <p className="text-xs text-gray-400">
            📅 Created {formatDate(url.createdAt)}
          </p>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-4 lg:gap-6 flex-wrap sm:flex-nowrap">
          {/* Click Stats */}
          <div className="flex gap-4">
            <div className="text-center px-4 py-3 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl border border-purple-500/30">
              <p className="text-2xl font-bold gradient-text">{url.clickCount || 0}</p>
              <p className="text-xs text-gray-300 mt-1">Total Clicks</p>
            </div>
            <div className="text-center px-4 py-3 bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-xl border border-pink-500/30">
              <p className="text-2xl font-bold text-pink-300">{url.uniqueClickCount || 0}</p>
              <p className="text-xs text-gray-300 mt-1">Unique</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link
              to={`/analytics/${url.code}`}
              className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl transition-all flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-purple-500/30"
            >
              <BarChart3 size={16} />
              <span>Analytics</span>
            </Link>
            <button
              onClick={() => onShowQR?.(url.code)}
              className="px-4 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-xl transition-all flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-pink-500/30"
              title="Generate QR Code"
            >
              <QrCode size={16} />
              <span>QR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlListItem;
