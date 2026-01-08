import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Download, X } from 'lucide-react';

const QRCodeModal = ({ url, onClose }) => {
  const qrRef = useRef();

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `qr-code-${url.code}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">QR Code</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg flex justify-center mb-6" ref={qrRef}>
          <QRCode
            value={url.shorturl}
            size={256}
            level="H"
            includeMargin={true}
          />
        </div>

        <p className="text-center text-sm text-gray-600 mb-6">{url.shorturl}</p>

        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Download size={18} />
          <span>Download QR Code</span>
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;
