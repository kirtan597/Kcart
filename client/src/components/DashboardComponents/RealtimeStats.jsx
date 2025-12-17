import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, ShoppingBag, Eye } from 'lucide-react';

const RealtimeStats = () => {
  const [stats, setStats] = useState({
    activeUsers: 127,
    currentOrders: 23,
    pageViews: 1847,
    conversionRate: 3.2
  });

  const [updates, setUpdates] = useState([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updateTypes = [
        { type: 'user_joined', message: 'New user joined', icon: Users },
        { type: 'order_placed', message: 'Order placed', icon: ShoppingBag },
        { type: 'page_view', message: 'Page viewed', icon: Eye },
      ];

      const randomUpdate = updateTypes[Math.floor(Math.random() * updateTypes.length)];
      const newUpdate = {
        id: Date.now(),
        ...randomUpdate,
        timestamp: new Date().toLocaleTimeString()
      };

      setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);

      // Update stats randomly
      setStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + (Math.random() > 0.5 ? 1 : -1),
        currentOrders: Math.max(0, prev.currentOrders + (Math.random() > 0.7 ? 1 : 0)),
        pageViews: prev.pageViews + Math.floor(Math.random() * 3),
        conversionRate: Math.max(0, prev.conversionRate + (Math.random() - 0.5) * 0.1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-green-500" />
        <h3 className="text-lg font-medium">Real-time Activity</h3>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          key={stats.activeUsers}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          className="text-center p-3 bg-gray-50 rounded-lg"
        >
          <div className="text-2xl font-bold text-black">{stats.activeUsers}</div>
          <div className="text-xs text-gray-500">Active Users</div>
        </motion.div>
        
        <motion.div 
          key={stats.currentOrders}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          className="text-center p-3 bg-gray-50 rounded-lg"
        >
          <div className="text-2xl font-bold text-black">{stats.currentOrders}</div>
          <div className="text-xs text-gray-500">Live Orders</div>
        </motion.div>
        
        <motion.div 
          key={Math.floor(stats.pageViews)}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          className="text-center p-3 bg-gray-50 rounded-lg"
        >
          <div className="text-2xl font-bold text-black">{stats.pageViews}</div>
          <div className="text-xs text-gray-500">Page Views</div>
        </motion.div>
        
        <motion.div 
          key={stats.conversionRate.toFixed(1)}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          className="text-center p-3 bg-gray-50 rounded-lg"
        >
          <div className="text-2xl font-bold text-black">{stats.conversionRate.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">Conversion</div>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
        <AnimatePresence>
          {updates.map((update) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
            >
              <div className="p-1 bg-black text-white rounded">
                <update.icon className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{update.message}</p>
                <p className="text-xs text-gray-500">{update.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RealtimeStats;