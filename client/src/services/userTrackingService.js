// User tracking service for login records and session management
class UserTrackingService {
  constructor() {
    this.storageKey = 'kcart_user_sessions';
    this.currentSessionKey = 'kcart_current_session';
  }

  // Get all stored user sessions
  getAllSessions() {
    try {
      const sessions = localStorage.getItem(this.storageKey);
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error reading sessions:', error);
      return [];
    }
  }

  // Get current session
  getCurrentSession() {
    try {
      const session = localStorage.getItem(this.currentSessionKey);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error('Error reading current session:', error);
      return null;
    }
  }

  // Record a new login
  recordLogin(userInfo, token) {
    const sessionId = this.generateSessionId();
    const loginTime = new Date().toISOString();
    
    const sessionData = {
      sessionId,
      email: userInfo.email || 'Unknown',
      name: userInfo.name || 'Unknown User',
      loginTime,
      logoutTime: null,
      duration: null,
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent,
      device: this.getDeviceInfo(),
      location: this.getLocationInfo(),
      token: token,
      isActive: true,
      activities: []
    };

    // Store current session
    localStorage.setItem(this.currentSessionKey, JSON.stringify(sessionData));

    // Add to sessions history
    const sessions = this.getAllSessions();
    sessions.unshift(sessionData); // Add to beginning of array
    
    // Keep only last 50 sessions to prevent storage overflow
    if (sessions.length > 50) {
      sessions.splice(50);
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(sessions));

    return sessionData;
  }

  // Record logout
  recordLogout() {
    const currentSession = this.getCurrentSession();
    if (!currentSession) return;

    const logoutTime = new Date().toISOString();
    const duration = this.calculateDuration(currentSession.loginTime, logoutTime);

    // Update current session
    currentSession.logoutTime = logoutTime;
    currentSession.duration = duration;
    currentSession.isActive = false;

    // Update in sessions history
    const sessions = this.getAllSessions();
    const sessionIndex = sessions.findIndex(s => s.sessionId === currentSession.sessionId);
    if (sessionIndex !== -1) {
      sessions[sessionIndex] = currentSession;
      localStorage.setItem(this.storageKey, JSON.stringify(sessions));
    }

    // Clear current session
    localStorage.removeItem(this.currentSessionKey);

    return currentSession;
  }

  // Record user activity
  recordActivity(activity) {
    const currentSession = this.getCurrentSession();
    if (!currentSession) return;

    const activityData = {
      timestamp: new Date().toISOString(),
      type: activity.type,
      description: activity.description,
      page: window.location.pathname,
      data: activity.data || {}
    };

    currentSession.activities.push(activityData);
    
    // Keep only last 20 activities per session
    if (currentSession.activities.length > 20) {
      currentSession.activities.splice(0, currentSession.activities.length - 20);
    }

    localStorage.setItem(this.currentSessionKey, JSON.stringify(currentSession));

    // Update in sessions history
    const sessions = this.getAllSessions();
    const sessionIndex = sessions.findIndex(s => s.sessionId === currentSession.sessionId);
    if (sessionIndex !== -1) {
      sessions[sessionIndex] = currentSession;
      localStorage.setItem(this.storageKey, JSON.stringify(sessions));
    }
  }

  // Get login statistics
  getLoginStats() {
    const sessions = this.getAllSessions();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const stats = {
      totalSessions: sessions.length,
      todayLogins: 0,
      weekLogins: 0,
      monthLogins: 0,
      uniqueUsers: new Set(),
      averageSessionDuration: 0,
      mostActiveHour: 0,
      deviceBreakdown: {},
      locationBreakdown: {}
    };

    let totalDuration = 0;
    let completedSessions = 0;
    const hourCounts = new Array(24).fill(0);

    sessions.forEach(session => {
      const loginDate = new Date(session.loginTime);
      
      // Count logins by time period
      if (loginDate >= today) stats.todayLogins++;
      if (loginDate >= thisWeek) stats.weekLogins++;
      if (loginDate >= thisMonth) stats.monthLogins++;

      // Unique users
      stats.uniqueUsers.add(session.email);

      // Duration calculation
      if (session.duration) {
        totalDuration += session.duration;
        completedSessions++;
      }

      // Most active hour
      hourCounts[loginDate.getHours()]++;

      // Device breakdown
      const device = session.device?.type || 'Unknown';
      stats.deviceBreakdown[device] = (stats.deviceBreakdown[device] || 0) + 1;

      // Location breakdown
      const location = session.location?.country || 'Unknown';
      stats.locationBreakdown[location] = (stats.locationBreakdown[location] || 0) + 1;
    });

    stats.uniqueUsers = stats.uniqueUsers.size;
    stats.averageSessionDuration = completedSessions > 0 ? totalDuration / completedSessions : 0;
    stats.mostActiveHour = hourCounts.indexOf(Math.max(...hourCounts));

    return stats;
  }

  // Get recent sessions for dashboard
  getRecentSessions(limit = 10) {
    const sessions = this.getAllSessions();
    return sessions.slice(0, limit).map(session => ({
      ...session,
      formattedLoginTime: this.formatDateTime(session.loginTime),
      formattedLogoutTime: session.logoutTime ? this.formatDateTime(session.logoutTime) : 'Active',
      formattedDuration: session.duration ? this.formatDuration(session.duration) : 'Ongoing'
    }));
  }

  // Check if user has logged in before
  hasUserLoggedInBefore(email) {
    const sessions = this.getAllSessions();
    return sessions.some(session => session.email === email);
  }

  // Get user's login history
  getUserLoginHistory(email) {
    const sessions = this.getAllSessions();
    return sessions.filter(session => session.email === email);
  }

  // Utility methods
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  calculateDuration(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return Math.floor((end - start) / 1000); // Duration in seconds
  }

  formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }

  formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  getClientIP() {
    // In a real application, you would get this from the server
    return 'Client IP'; // Placeholder
  }

  getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let deviceType = 'Desktop';
    
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      deviceType = 'Tablet';
    } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      deviceType = 'Mobile';
    }

    return {
      type: deviceType,
      userAgent: userAgent,
      platform: navigator.platform,
      language: navigator.language
    };
  }

  getLocationInfo() {
    // In a real application, you would use geolocation API or IP-based location
    return {
      country: 'Unknown',
      city: 'Unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  // Clear all session data (for testing or privacy)
  clearAllSessions() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.currentSessionKey);
  }

  // Export session data
  exportSessions() {
    const sessions = this.getAllSessions();
    const dataStr = JSON.stringify(sessions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kcart_sessions_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }
}

export default new UserTrackingService();