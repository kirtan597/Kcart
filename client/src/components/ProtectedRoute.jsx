import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ShopContext);
  const location = useLocation();

  // If user is not authenticated, show access denied page
  if (!token) {
    return <AccessDeniedPage currentPath={location.pathname} />;
  }

  // If authenticated, render the protected component
  return children;
};

// Access Denied Component
const AccessDeniedPage = ({ currentPath }) => {
  const { navigate } = useContext(ShopContext);

  useEffect(() => {
    // Store the attempted path to redirect after login
    localStorage.setItem('redirectAfterLogin', currentPath);
  }, [currentPath]);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Lock Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6"
        >
          <Lock className="w-10 h-10 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Access Restricted
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          The dashboard is only accessible to logged-in users. Please sign in to your account to view analytics and manage your data.
        </motion.p>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 rounded-lg p-6 mb-8 text-left"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Dashboard Features
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              Real-time analytics and insights
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              Order and user management
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              Sales performance tracking
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              Login history and session records
            </li>
          </ul>
        </motion.div>

        {/* Login Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLoginRedirect}
          className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
        >
          Sign In to Continue
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-gray-500 mt-6"
        >
          Don't have an account? You can create one during the login process.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ProtectedRoute;