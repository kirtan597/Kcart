import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Monitor, 
  Smartphone, 
  Tablet, 
  MapPin, 
  Calendar,
  Activity,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Filter
} from 'lucide-react';
import userTrackingService from '../../services/userTrackingService';

const UserSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filter, setFilter] = useState('all'); // all, today, week, month

  useEffect(() => {
    loadSessionData();
  }, [filter]);

  const loadSessionData = () => {
    setLoading(true);
    try {
      const allSessions = userTrackingService.getRecentSessions(20);
      const sessionStats = userTrackingService.getLoginStats();
      
      // Filter sessions based on selected filter
      let filteredSessions = allSessions;
      const now = new Date();
      
      switch (filter) {
        case 'today':
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          filteredSessions = allSessions.filter(session => 
            new Date(session.loginTime) >= today
          );
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          filteredSessions = allSessions.filter(session => 
            new Date(session.loginTime) >= weekAgo
          );
          break;
        case 'month':
          const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1);
          filteredSessions = allSessions.filter(session => 
            new Date(session.loginTime) >= monthAgo
          );
          break;
        default:
          filteredSessions = allSessions;
      }
      
      setSessions(filteredSessions);
      setStats(sessionStats);
    } catch (error) {
      console.error('Error loading session data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportSessions = () => {
    userTrackingService.exportSessions();
  };

  const handleClearSessions = () => {
    if (window.confirm('Are you sure you want to clear all session data? This action cannot be undone.')) {
      userTrackingService.clearAllSessions();
      loadSessionData();
    }
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100';
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-black border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-medium">User Sessions</h3>
          <span className="px-2 py-1 bg-black text-white text-xs rounded-full">
            {sessions.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          {/* Action Buttons */}
          <button
            onClick={handleExportSessions}
            className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
            title="Export Sessions"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleClearSessions}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            title="Clear All Sessions"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-black">{stats.totalSessions}</div>
          <div className="text-xs text-gray-500">Total Sessions</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-black">{stats.uniqueUsers}</div>
          <div className="text-xs text-gray-500">Unique Users</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-black">{stats.todayLogins}</div>
          <div className="text-xs text-gray-500">Today's Logins</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-black">
            {Math.floor(stats.averageSessionDuration / 60)}m
          </div>
          <div className="text-xs text-gray-500">Avg Duration</div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 font-medium">User</th>
              <th className="text-left py-3 font-medium">Login Time</th>
              <th className="text-left py-3 font-medium">Duration</th>
              <th className="text-left py-3 font-medium">Device</th>
              <th className="text-left py-3 font-medium">Status</th>
              <th className="text-left py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <motion.tr
                key={session.sessionId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-50 hover:bg-gray-50"
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-medium">
                      {session.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{session.name}</div>
                      <div className="text-xs text-gray-500">{session.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    {session.formattedLoginTime}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {session.formattedDuration}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1 text-xs">
                    {getDeviceIcon(session.device?.type)}
                    {session.device?.type || 'Unknown'}
                  </div>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.isActive)}`}>
                    {session.isActive ? 'Active' : 'Ended'}
                  </span>
                </td>
                <td className="py-3">
                  <button
                    onClick={() => {
                      setSelectedSession(session);
                      setShowDetails(true);
                    }}
                    className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {sessions.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Sessions Found</h3>
          <p className="text-gray-500">No user sessions match the selected filter criteria.</p>
        </div>
      )}

      {/* Session Details Modal */}
      <AnimatePresence>
        {showDetails && selectedSession && (
          <SessionDetailsModal
            session={selectedSession}
            onClose={() => {
              setShowDetails(false);
              setSelectedSession(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Session Details Modal Component
const SessionDetailsModal = ({ session, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Session Details</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <EyeOff className="w-5 h-5" />
          </button>
        </div>

        {/* Session Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium mb-3">User Information</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">Name:</span> {session.name}</div>
              <div><span className="text-gray-500">Email:</span> {session.email}</div>
              <div><span className="text-gray-500">Session ID:</span> {session.sessionId}</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Session Details</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">Login:</span> {session.formattedLoginTime}</div>
              <div><span className="text-gray-500">Logout:</span> {session.formattedLogoutTime}</div>
              <div><span className="text-gray-500">Duration:</span> {session.formattedDuration}</div>
            </div>
          </div>
        </div>

        {/* Device & Location Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium mb-3">Device Information</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">Type:</span> {session.device?.type || 'Unknown'}</div>
              <div><span className="text-gray-500">Platform:</span> {session.device?.platform || 'Unknown'}</div>
              <div><span className="text-gray-500">Language:</span> {session.device?.language || 'Unknown'}</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Location & Network</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">Country:</span> {session.location?.country || 'Unknown'}</div>
              <div><span className="text-gray-500">Timezone:</span> {session.location?.timezone || 'Unknown'}</div>
              <div><span className="text-gray-500">IP Address:</span> {session.ipAddress || 'Unknown'}</div>
            </div>
          </div>
        </div>

        {/* Activities */}
        {session.activities && session.activities.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Recent Activities</h4>
            <div className="max-h-40 overflow-y-auto bg-gray-50 rounded-lg p-3">
              {session.activities.slice(-10).map((activity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm py-1">
                  <Activity className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">{activity.description}</span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UserSessions;