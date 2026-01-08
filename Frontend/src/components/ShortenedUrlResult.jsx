import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

const ShortenedUrlResult = ({ result, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(result.shorturl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy && onCopy();
    }
  };

  return (
    <div className="bg-gradient-main rounded-lg p-6 text-white shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Your shortened URL is ready!</h3>
      
      <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm mb-4">
        <p className="text-sm text-blue-100 mb-2">Shortened URL</p>
        <p className="text-xl font-mono font-bold break-all">{result.shorturl}</p>
      </div>

      <button
        onClick={handleCopy}
        className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all ${
          copied
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-white text-primary-600 hover:bg-blue-50'
        }`}
      >
        {copied ? (
          <>
            <Check size={20} />
            <span>Copied to clipboard!</span>
          </>
        ) : (
          <>
            <Copy size={20} />
            <span>Copy URL</span>
          </>
        )}
      </button>

      <p className="text-sm text-blue-100 mt-4 text-center">
        You can now share this URL and view detailed analytics!
      </p>
    </div>
  );
};

export default ShortenedUrlResult;
