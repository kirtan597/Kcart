import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useContext(ShopContext);
  const location = useLocation();

  // Wait for authentication init
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!token) {
    // Store the attempted path to redirect after login (only if not already there)
    if (location.pathname !== '/login') {
      localStorage.setItem('redirectAfterLogin', location.pathname);
    }
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
