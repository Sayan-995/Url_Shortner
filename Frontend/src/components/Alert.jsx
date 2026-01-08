import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose, autoClose = 5000 }) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const config = {
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      Icon: AlertCircle,
    },
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      Icon: CheckCircle,
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      Icon: AlertCircle,
    },
  };

  const { bgColor, borderColor, textColor, Icon } = config[type];

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-4 flex items-center space-x-3`}>
      <Icon size={20} className={textColor} />
      <p className={`text-sm ${textColor}`}>{message}</p>
    </div>
  );
};

export default Alert;
