// Dashboard data service for demo purposes
// In a real application, this would connect to actual APIs

export const dashboardService = {
  // Simulate API delay
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get dashboard overview data
  async getDashboardOverview() {
    await this.delay(500); // Simulate API call
    
    return {
      totalProducts: 156,
      totalUsers: 1247,
      totalOrders: 892,
      totalRevenue: 45670,
      pageViews: 24700,
      conversionRate: 3.2,
      avgSession: "4m 32s",
      bounceRate: 42.1,
      growth: {
        products: 12,
        users: 8,
        orders: 15,
        revenue: 23,
        pageViews: 18,
        conversion: 0.4,
        session: 12,
        bounce: -2.3
      }
    };
  },

  // Get recent orders
  async getRecentOrders() {
    await this.delay(300);
    
    return [
      { 
        id: 'ORD001', 
        customer: 'Arjun Sharma', 
        amount: 299, 
        status: 'Delivered', 
        date: '2024-12-15',
        items: 3
      },
      { 
        id: 'ORD002', 
        customer: 'Priya Patel', 
        amount: 199, 
        status: 'Processing', 
        date: '2024-12-14',
        items: 2
      },
      { 
        id: 'ORD003', 
        customer: 'Vikram Singh', 
        amount: 399, 
        status: 'Shipped', 
        date: '2024-12-13',
        items: 4
      },
      { 
        id: 'ORD004', 
        customer: 'Ananya Reddy', 
        amount: 149, 
        status: 'Pending', 
        date: '2024-12-12',
        items: 1
      },
      { 
        id: 'ORD005', 
        customer: 'Rohit Gupta', 
        amount: 249, 
        status: 'Delivered', 
        date: '2024-12-11',
        items: 2
      }
    ];
  },

  // Get category statistics
  async getCategoryStats() {
    await this.delay(200);
    
    return [
      { name: 'Men', value: 45, color: '#000000', revenue: 20500, orders: 402 },
      { name: 'Women', value: 35, color: '#404040', revenue: 15800, orders: 312 },
      { name: 'Kids', value: 20, color: '#808080', revenue: 9370, orders: 178 }
    ];
  },

  // Get sales data for charts
  async getSalesData(timeframe = '30d') {
    await this.delay(400);
    
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 365;
    
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000);
      const baseRevenue = 1000 + Math.sin(i / 7) * 500; // Weekly pattern
      const randomVariation = Math.random() * 1000;
      
      return {
        date: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        revenue: Math.floor(baseRevenue + randomVariation),
        orders: Math.floor((baseRevenue + randomVariation) / 50),
        customers: Math.floor((baseRevenue + randomVariation) / 80)
      };
    });
  },

  // Get real-time activity
  async getRealtimeActivity() {
    return {
      activeUsers: 127 + Math.floor(Math.random() * 20) - 10,
      currentOrders: 23 + Math.floor(Math.random() * 10) - 5,
      pageViews: 1847 + Math.floor(Math.random() * 50),
      conversionRate: 3.2 + (Math.random() - 0.5) * 0.5
    };
  },

  // Get top products with sales data
  async getTopProducts(products) {
    await this.delay(300);
    
    if (!products || products.length === 0) {
      return [];
    }

    return products.slice(0, 5).map((product, index) => ({
      ...product,
      sales: Math.floor(Math.random() * 100) + 50 - (index * 10),
      revenue: Math.floor((Math.random() * 5000) + 2000 - (index * 500)),
      rating: 4.0 + Math.random() * 1,
      reviews: Math.floor(Math.random() * 200) + 50
    }));
  },

  // Generate activity feed
  generateActivityFeed() {
    const activities = [
      { type: 'user_joined', message: 'New user registered', icon: 'Users' },
      { type: 'order_placed', message: 'Order placed', icon: 'ShoppingBag' },
      { type: 'page_view', message: 'Product page viewed', icon: 'Eye' },
      { type: 'cart_add', message: 'Item added to cart', icon: 'ShoppingCart' },
      { type: 'review_added', message: 'Product review posted', icon: 'Star' }
    ];

    return activities[Math.floor(Math.random() * activities.length)];
  }
};

export default dashboardService;