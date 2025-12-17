import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Eye,
  Star,
  PieChart,
  Activity,
  Globe,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import AnalyticsCard from '../components/DashboardComponents/AnalyticsCard';
import RealtimeStats from '../components/DashboardComponents/RealtimeStats';
import SalesChart from '../components/DashboardComponents/SalesChart';
import ThemeToggle from '../components/DashboardComponents/ThemeToggle';
import UserSessions from '../components/DashboardComponents/UserSessions';
import AISection from '../components/DashboardComponents/AISection';
import ProtectedRoute from '../components/ProtectedRoute';
import dashboardService from '../services/dashboardService';
import userTrackingService from '../services/userTrackingService';

const DashboardContent = () => {
  const { products, navigate, token } = useContext(ShopContext);
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    topProducts: [],
    categoryStats: [],
    monthlyStats: []
  });
  const [loading, setLoading] = useState(true);

  // Record user activity when dashboard is accessed
  useEffect(() => {
    if (token) {
      userTrackingService.recordActivity({
        type: 'page_view',
        description: 'Accessed Dashboard',
        data: { page: '/dashboard' }
      });
    }
  }, [token]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch data from dashboard service
        const [overview, recentOrders, categoryStats, salesData, topProducts] = await Promise.all([
          dashboardService.getDashboardOverview(),
          dashboardService.getRecentOrders(),
          dashboardService.getCategoryStats(),
          dashboardService.getSalesData('30d'),
          dashboardService.getTopProducts(products)
        ]);

        setDashboardData({
          ...overview,
          recentOrders,
          categoryStats,
          monthlyStats: salesData,
          topProducts
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="bg-black text-white py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-2">Dashboard</h1>
            <p className="text-gray-300 text-sm md:text-base">Analytics & Insights</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Live Data</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            icon={<Package className="w-6 h-6" />}
            title="Total Products"
            value={dashboardData.totalProducts}
            change={`+${dashboardData.growth?.products || 12}%`}
            changeType="positive"
            description="Active inventory items"
            trend={[20, 25, 22, 30, 28, 35, dashboardData.totalProducts]}
          />
          <AnalyticsCard
            icon={<Users className="w-6 h-6" />}
            title="Total Users"
            value={dashboardData.totalUsers?.toLocaleString()}
            change={`+${dashboardData.growth?.users || 8}%`}
            changeType="positive"
            description="Registered customers"
            trend={[800, 900, 950, 1100, 1150, 1200, dashboardData.totalUsers]}
          />
          <AnalyticsCard
            icon={<ShoppingCart className="w-6 h-6" />}
            title="Total Orders"
            value={dashboardData.totalOrders}
            change={`+${dashboardData.growth?.orders || 15}%`}
            changeType="positive"
            description="Completed transactions"
            trend={[600, 650, 700, 750, 800, 850, dashboardData.totalOrders]}
          />
          <AnalyticsCard
            icon={<DollarSign className="w-6 h-6" />}
            title="Revenue"
            value={`$${dashboardData.totalRevenue?.toLocaleString()}`}
            change={`+${dashboardData.growth?.revenue || 23}%`}
            changeType="positive"
            description="Total earnings"
            trend={[30000, 35000, 38000, 42000, 44000, 45000, dashboardData.totalRevenue]}
          />
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            icon={<Eye className="w-6 h-6" />}
            title="Page Views"
            value={`${(dashboardData.pageViews / 1000).toFixed(1)}K`}
            change={`+${dashboardData.growth?.pageViews || 18}%`}
            changeType="positive"
            description="This month"
          />
          <AnalyticsCard
            icon={<Target className="w-6 h-6" />}
            title="Conversion Rate"
            value={`${dashboardData.conversionRate}%`}
            change={`+${dashboardData.growth?.conversion || 0.4}%`}
            changeType="positive"
            description="Visitors to customers"
          />
          <AnalyticsCard
            icon={<Clock className="w-6 h-6" />}
            title="Avg. Session"
            value={dashboardData.avgSession}
            change={`+${dashboardData.growth?.session || 12}s`}
            changeType="positive"
            description="Time on site"
          />
          <AnalyticsCard
            icon={<Zap className="w-6 h-6" />}
            title="Bounce Rate"
            value={`${dashboardData.bounceRate}%`}
            change={`${dashboardData.growth?.bounce || -2.3}%`}
            changeType="positive"
            description="Single page visits"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2">
            <SalesChart data={dashboardData.monthlyStats} />
          </div>

          {/* Real-time Stats */}
          <div>
            <RealtimeStats />
          </div>
        </div>

        {/* Category Distribution */}
        <div className="mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Category Performance</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64">
                <CategoryChart data={dashboardData.categoryStats} />
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Category Insights</h4>
                {dashboardData.categoryStats.map((category, index) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{category.value}%</div>
                      <div className="text-xs text-gray-500">Market Share</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Orders */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Recent Orders</h3>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-400" />
                <button 
                  onClick={() => {
                    userTrackingService.recordActivity({
                      type: 'navigation',
                      description: 'Viewed all orders',
                      data: { from: 'dashboard' }
                    });
                    navigate('/orders');
                  }}
                  className="text-xs text-black hover:underline"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 font-medium">Order ID</th>
                    <th className="text-left py-3 font-medium">Customer</th>
                    <th className="text-left py-3 font-medium">Amount</th>
                    <th className="text-left py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        userTrackingService.recordActivity({
                          type: 'order_view',
                          description: `Viewed order ${order.id}`,
                          data: { orderId: order.id }
                        });
                      }}
                    >
                      <td className="py-3 font-mono text-xs">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3 font-medium">${order.amount}</td>
                      <td className="py-3">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Top Products</h3>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <button 
                  onClick={() => {
                    userTrackingService.recordActivity({
                      type: 'navigation',
                      description: 'Viewed all products',
                      data: { from: 'dashboard' }
                    });
                    navigate('/collection');
                  }}
                  className="text-xs text-black hover:underline"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {dashboardData.topProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  onClick={() => {
                    userTrackingService.recordActivity({
                      type: 'product_view',
                      description: `Viewed product ${product.name}`,
                      data: { productId: product._id, productName: product.name }
                    });
                    navigate(`/product/${product._id}`);
                  }}
                >
                  <div className="relative">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.sales} sales this month</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${product.price}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-400" />
                      <span className="text-xs text-gray-500">4.5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="mb-8">
          <AISection />
        </div>

        {/* User Sessions Section */}
        <div className="mb-8">
          <UserSessions />
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-black text-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => {
                  userTrackingService.recordActivity({
                    type: 'navigation',
                    description: 'Quick action: View Products',
                    data: { action: 'view_products' }
                  });
                  navigate('/collection');
                }}
                className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Package className="w-6 h-6" />
                <span className="text-sm">View Products</span>
              </button>
              <button
                onClick={() => {
                  userTrackingService.recordActivity({
                    type: 'navigation',
                    description: 'Quick action: Manage Orders',
                    data: { action: 'manage_orders' }
                  });
                  navigate('/orders');
                }}
                className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-sm">Manage Orders</span>
              </button>
              <button
                onClick={() => {
                  userTrackingService.recordActivity({
                    type: 'navigation',
                    description: 'Quick action: User Profile',
                    data: { action: 'user_profile' }
                  });
                  navigate('/profile');
                }}
                className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Users className="w-6 h-6" />
                <span className="text-sm">User Profile</span>
              </button>
              <button
                onClick={() => {
                  userTrackingService.recordActivity({
                    type: 'navigation',
                    description: 'Quick action: Support',
                    data: { action: 'support' }
                  });
                  navigate('/contact');
                }}
                className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Globe className="w-6 h-6" />
                <span className="text-sm">Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component with Protection
const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
};



// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

// Revenue Chart Component
const RevenueChart = ({ data }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <div className="h-full flex items-end justify-between gap-2">
      {data.map((item, index) => (
        <div
          key={item.month}
          className="flex-1 bg-black rounded-t-sm min-h-[20px] relative group"
          style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            ${item.revenue.toLocaleString()}
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
            {item.month}
          </div>
        </div>
      ))}
    </div>
  );
};

// Category Chart Component
const CategoryChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2 flex-1">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ 
                    backgroundColor: item.color,
                    width: `${(item.value / total) * 100}%`
                  }}
                />
              </div>
              <span className="text-sm text-gray-500 w-8">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;