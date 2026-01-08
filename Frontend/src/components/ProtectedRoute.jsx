import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
