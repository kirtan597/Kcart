// Demo data initializer for showcasing dashboard features
import userTrackingService from '../services/userTrackingService';

export const initializeDemoData = (forceRefresh = false) => {
  // Check if demo data already exists
  const existingSessions = userTrackingService.getAllSessions();
  if (existingSessions.length > 0 && !forceRefresh) {
    return; // Demo data already exists
  }

  // Create demo user sessions
  const demoSessions = [
    {
      sessionId: 'demo_session_1',
      email: 'arjun.sharma@gmail.com',
      name: 'Arjun Sharma',
      loginTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      logoutTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      duration: 3600, // 1 hour
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      device: {
        type: 'Desktop',
        platform: 'Win32',
        language: 'en-US'
      },
      location: {
        country: 'India',
        city: 'Mumbai',
        timezone: 'Asia/Kolkata'
      },
      token: 'demo_token_1',
      isActive: false,
      activities: [
        {
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          type: 'login',
          description: 'User logged in',
          page: '/login',
          data: {}
        },
        {
          timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
          type: 'page_view',
          description: 'Viewed product catalog',
          page: '/collection',
          data: {}
        },
        {
          timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
          type: 'product_view',
          description: 'Viewed product details',
          page: '/product/123',
          data: { productId: '123' }
        },
        {
          timestamp: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
          type: 'cart_add',
          description: 'Added item to cart',
          page: '/product/123',
          data: { productId: '123', quantity: 1 }
        },
        {
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          type: 'logout',
          description: 'User logged out',
          page: '/dashboard',
          data: {}
        }
      ]
    },
    {
      sessionId: 'demo_session_2',
      email: 'priya.patel@gmail.com',
      name: 'Priya Patel',
      loginTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      logoutTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      duration: 3600, // 1 hour
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
      device: {
        type: 'Mobile',
        platform: 'iPhone',
        language: 'en-US'
      },
      location: {
        country: 'India',
        city: 'Delhi',
        timezone: 'Asia/Kolkata'
      },
      token: 'demo_token_2',
      isActive: false,
      activities: [
        {
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          type: 'login',
          description: 'User logged in',
          page: '/login',
          data: {}
        },
        {
          timestamp: new Date(Date.now() - 230 * 60 * 1000).toISOString(),
          type: 'page_view',
          description: 'Accessed Dashboard',
          page: '/dashboard',
          data: {}
        },
        {
          timestamp: new Date(Date.now() - 200 * 60 * 1000).toISOString(),
          type: 'navigation',
          description: 'Viewed orders',
          page: '/orders',
          data: {}
        }
      ]
    },
    {
      sessionId: 'demo_session_3',
      email: 'vikram.singh@gmail.com',
      name: 'Vikram Singh',
      loginTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      logoutTime: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(), // 23 hours ago
      duration: 1800, // 30 minutes
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      device: {
        type: 'Desktop',
        platform: 'MacIntel',
        language: 'en-US'
      },
      location: {
        country: 'India',
        city: 'Bangalore',
        timezone: 'Asia/Kolkata'
      },
      token: 'demo_token_3',
      isActive: false,
      activities: [
        {
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          type: 'login',
          description: 'User logged in',
          page: '/login',
          data: {}
        },
        {
          timestamp: new Date(Date.now() - 23.5 * 60 * 60 * 1000).toISOString(),
          type: 'page_view',
          description: 'Browsed collection',
          page: '/collection',
          data: {}
        }
      ]
    },
    {
      sessionId: 'demo_session_4',
      email: 'ananya.reddy@gmail.com',
      name: 'Ananya Reddy',
      loginTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      logoutTime: null,
      duration: null,
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X)',
      device: {
        type: 'Tablet',
        platform: 'iPad',
        language: 'en-US'
      },
      location: {
        country: 'India',
        city: 'Hyderabad',
        timezone: 'Asia/Kolkata'
      },
      token: 'demo_token_4',
      isActive: true,
      activities: [
        {
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          type: 'login',
          description: 'User logged in',
          page: '/login',
          data: {}
        },
        {
          timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
          type: 'page_view',
          description: 'Accessed Dashboard',
          page: '/dashboard',
          data: {}
        },
        {
          timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
          type: 'navigation',
          description: 'Viewed profile',
          page: '/profile',
          data: {}
        },
        {
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          type: 'product_view',
          description: 'Viewed product details',
          page: '/product/456',
          data: { productId: '456' }
        },
        {
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          type: 'page_view',
          description: 'Accessed Dashboard',
          page: '/dashboard',
          data: {}
        }
      ]
    },
    {
      sessionId: 'demo_session_5',
      email: 'rohit.gupta@gmail.com',
      name: 'Rohit Gupta',
      loginTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      logoutTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(),
      duration: 2700, // 45 minutes
      ipAddress: '192.168.1.104',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      device: {
        type: 'Desktop',
        platform: 'Linux x86_64',
        language: 'en-US'
      },
      location: {
        country: 'India',
        city: 'Pune',
        timezone: 'Asia/Kolkata'
      },
      token: 'demo_token_5',
      isActive: false,
      activities: [
        {
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'login',
          description: 'User logged in',
          page: '/login',
          data: {}
        },
        {
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(),
          type: 'page_view',
          description: 'Browsed products',
          page: '/collection',
          data: {}
        },
        {
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
          type: 'order_placed',
          description: 'Placed an order',
          page: '/place-order',
          data: { orderId: 'ORD001', amount: 299 }
        }
      ]
    }
  ];

  // Store demo sessions
  localStorage.setItem('kcart_user_sessions', JSON.stringify(demoSessions));
  
  console.log('Demo user session data initialized');
};

// Function to clear demo data
export const clearDemoData = () => {
  userTrackingService.clearAllSessions();
  console.log('Demo data cleared');
};

// Function to check if current user is a demo user
export const isDemoUser = (email) => {
  const demoEmails = [
    'arjun.sharma@gmail.com',
    'priya.patel@gmail.com',
    'vikram.singh@gmail.com',
    'ananya.reddy@gmail.com',
    'rohit.gupta@gmail.com'
  ];
  return demoEmails.includes(email);
};