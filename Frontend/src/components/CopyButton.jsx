import React, { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

const CopyButton = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
        copied
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {copied ? (
        <>
          <Check size={16} />
          <span className="text-sm">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={16} />
          <span className="text-sm">{label}</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;
