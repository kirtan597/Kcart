import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('dashboard-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dashboard-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dashboard-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-12 h-6 rounded-full transition-colors duration-300 ${
        isDark ? 'bg-gray-700' : 'bg-gray-200'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {/* Toggle Circle */}
      <motion.div
        className={`absolute w-5 h-5 rounded-full shadow-md flex items-center justify-center ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
        animate={{
          x: isDark ? 12 : -12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-yellow-400" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </motion.div>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1">
        <Sun className={`w-3 h-3 transition-opacity ${isDark ? 'opacity-30' : 'opacity-70'} text-yellow-500`} />
        <Moon className={`w-3 h-3 transition-opacity ${isDark ? 'opacity-70' : 'opacity-30'} text-gray-400`} />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;