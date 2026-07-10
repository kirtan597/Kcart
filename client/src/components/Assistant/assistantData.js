import {
  Package, ShoppingCart, Users, BarChart2, Tag, Layers,
  Warehouse, CreditCard, Settings, FileText, HelpCircle,
  Video, Truck, RotateCcw, Phone, Activity, TrendingUp,
  Download, PlusCircle, AlertCircle, Star, BookOpen,
} from 'lucide-react';

// ── Searchable index ─────────────────────────────────────────────────────────
export const SEARCH_INDEX = [
  { id: 's1',  label: 'Products',         route: '/collection',  category: 'Pages',    keywords: ['product', 'inventory', 'catalog', 'items'] },
  { id: 's2',  label: 'Orders',           route: '/orders',      category: 'Pages',    keywords: ['order', 'purchase', 'transaction', 'buy'] },
  { id: 's3',  label: 'Dashboard',        route: '/dashboard',   category: 'Pages',    keywords: ['dashboard', 'analytics', 'overview', 'stats'] },
  { id: 's4',  label: 'My Profile',       route: '/profile',     category: 'Pages',    keywords: ['profile', 'account', 'settings', 'user'] },
  { id: 's5',  label: 'Cart',             route: '/cart',        category: 'Pages',    keywords: ['cart', 'basket', 'checkout'] },
  { id: 's6',  label: 'Contact Support',  route: '/contact',     category: 'Pages',    keywords: ['contact', 'support', 'help', 'ticket'] },
  { id: 's7',  label: 'About',            route: '/about',       category: 'Pages',    keywords: ['about', 'company', 'team'] },
  { id: 's8',  label: 'Men\'s Collection',route: '/collection',  category: 'Category', keywords: ['men', 'male', 'topwear', 'bottomwear'] },
  { id: 's9',  label: 'Women\'s Collection',route:'/collection', category: 'Category', keywords: ['women', 'female', 'dress', 'fashion'] },
  { id: 's10', label: 'Kids Collection',  route: '/collection',  category: 'Category', keywords: ['kids', 'children', 'boys', 'girls'] },
  { id: 's11', label: 'Revenue Report',   route: '/dashboard',   category: 'Reports',  keywords: ['revenue', 'earnings', 'income', 'report'] },
  { id: 's12', label: 'Order Analytics',  route: '/dashboard',   category: 'Reports',  keywords: ['analytics', 'orders', 'stats', 'chart'] },
  { id: 's13', label: 'User Sessions',    route: '/dashboard',   category: 'Reports',  keywords: ['sessions', 'users', 'logins', 'activity'] },
  { id: 's14', label: 'Bestsellers',      route: '/collection',  category: 'Products', keywords: ['bestseller', 'popular', 'top', 'trending'] },
  { id: 's15', label: 'New Arrivals',     route: '/collection',  category: 'Products', keywords: ['new', 'arrivals', 'latest', 'fresh'] },
];

// ── Quick actions ────────────────────────────────────────────────────────────
export const QUICK_ACTIONS = [
  { id: 'qa1',  icon: Package,     label: 'View Products',   desc: 'Browse full catalog',      route: '/collection' },
  { id: 'qa2',  icon: ShoppingCart,label: 'Manage Orders',   desc: 'Track & update orders',    route: '/orders' },
  { id: 'qa3',  icon: Users,       label: 'Customer List',   desc: 'View all customers',       route: '/dashboard' },
  { id: 'qa4',  icon: BarChart2,   label: 'Analytics',       desc: 'Revenue & growth data',    route: '/dashboard' },
  { id: 'qa5',  icon: Tag,         label: 'Categories',      desc: 'Men, Women, Kids',         route: '/collection' },
  { id: 'qa6',  icon: Star,        label: 'Bestsellers',     desc: 'Top performing products',  route: '/collection' },
  { id: 'qa7',  icon: Warehouse,   label: 'Inventory',       desc: 'Stock levels & alerts',    route: '/collection' },
  { id: 'qa8',  icon: CreditCard,  label: 'Payments',        desc: 'Transaction history',      route: '/orders' },
  { id: 'qa9',  icon: Settings,    label: 'Profile Settings',desc: 'Account & preferences',    route: '/profile' },
  { id: 'qa10', icon: Phone,       label: 'Support',         desc: 'Get help from our team',   route: '/contact' },
];

// ── Contextual suggestions per route ────────────────────────────────────────
export const CONTEXTUAL_SUGGESTIONS = {
  '/dashboard': [
    { id: 'cs1', icon: TrendingUp,  label: 'View Revenue',      desc: 'Check earnings overview',   route: '/dashboard' },
    { id: 'cs2', icon: ShoppingCart,label: "Today's Orders",    desc: 'Orders placed today',       route: '/orders' },
    { id: 'cs3', icon: Star,        label: 'Top Products',      desc: 'Best performing items',     route: '/collection' },
    { id: 'cs4', icon: Download,    label: 'Export Analytics',  desc: 'Download session data',     route: '/dashboard' },
  ],
  '/orders': [
    { id: 'cs5', icon: AlertCircle, label: 'Pending Orders',    desc: 'Orders awaiting action',    route: '/orders' },
    { id: 'cs6', icon: Activity,    label: 'Delivered Orders',  desc: 'Successfully completed',    route: '/orders' },
    { id: 'cs7', icon: Download,    label: 'Export CSV',        desc: 'Download order data',       route: '/orders' },
    { id: 'cs8', icon: PlusCircle,  label: 'Create Order',      desc: 'Add a manual order',        route: '/orders' },
  ],
  '/collection': [
    { id: 'cs9',  icon: PlusCircle, label: 'Add Product',       desc: 'List a new item',           route: '/collection' },
    { id: 'cs10', icon: AlertCircle,label: 'Low Stock',         desc: 'Items running low',         route: '/collection' },
    { id: 'cs11', icon: Star,       label: 'Best Sellers',      desc: 'Top selling products',      route: '/collection' },
    { id: 'cs12', icon: Layers,     label: 'Categories',        desc: 'Browse by category',        route: '/collection' },
  ],
  '/profile': [
    { id: 'cs13', icon: Users,      label: 'Update Profile',    desc: 'Edit your information',     route: '/profile' },
    { id: 'cs14', icon: Settings,   label: 'Security',          desc: 'Password & 2FA',            route: '/profile' },
    { id: 'cs15', icon: Activity,   label: 'Login History',     desc: 'Recent session activity',   route: '/dashboard' },
    { id: 'cs16', icon: Phone,      label: 'Contact Support',   desc: 'Reach our team',            route: '/contact' },
  ],
  '/cart': [
    { id: 'cs17', icon: ShoppingCart,label: 'View Cart',        desc: 'Review your items',         route: '/cart' },
    { id: 'cs18', icon: Package,    label: 'Continue Shopping', desc: 'Browse more products',      route: '/collection' },
    { id: 'cs19', icon: CreditCard, label: 'Checkout',          desc: 'Complete your purchase',    route: '/cart' },
    { id: 'cs20', icon: Tag,        label: 'Apply Coupon',      desc: 'Add a discount code',       route: '/cart' },
  ],
  default: [
    { id: 'cs21', icon: TrendingUp,  label: 'Dashboard',        desc: 'Back to overview',          route: '/dashboard' },
    { id: 'cs22', icon: Package,     label: 'Products',         desc: 'Browse catalog',            route: '/collection' },
    { id: 'cs23', icon: ShoppingCart,label: 'Orders',           desc: 'Manage orders',             route: '/orders' },
    { id: 'cs24', icon: Phone,       label: 'Support',          desc: 'Get help',                  route: '/contact' },
  ],
};

// ── Help center resources ────────────────────────────────────────────────────
export const HELP_RESOURCES = [
  { id: 'h1', icon: BookOpen,   label: 'Documentation',    desc: 'Full platform guide',        href: '#', external: false },
  { id: 'h2', icon: HelpCircle, label: 'FAQs',             desc: 'Common questions answered',  href: '#', external: false },
  { id: 'h3', icon: Video,      label: 'Video Tutorials',  desc: 'Step-by-step walkthroughs',  href: '#', external: true  },
  { id: 'h4', icon: Truck,      label: 'Shipping Guide',   desc: 'Delivery & tracking info',   href: '#', external: false },
  { id: 'h5', icon: CreditCard, label: 'Payment Guide',    desc: 'Accepted methods & billing', href: '#', external: false },
  { id: 'h6', icon: RotateCcw,  label: 'Returns Guide',    desc: '30-day return policy',       href: '#', external: false },
  { id: 'h7', icon: Phone,      label: 'Contact Support',  desc: 'Talk to our team',           href: '/contact', external: false },
  { id: 'h8', icon: Activity,   label: 'System Status',    desc: 'Platform uptime & incidents',href: '#', external: true  },
];

// ── Dashboard notifications ──────────────────────────────────────────────────
export const NOTIFICATIONS = [
  { id: 'n1', icon: Activity,    label: 'Inventory synced',           time: '2 min ago',  type: 'info'    },
  { id: 'n2', icon: CreditCard,  label: 'Payment completed — ₹2,499', time: '14 min ago', type: 'success' },
  { id: 'n3', icon: Users,       label: 'New customer registered',    time: '1 hr ago',   type: 'info'    },
  { id: 'n4', icon: FileText,    label: 'Weekly report ready',        time: '3 hr ago',   type: 'info'    },
  { id: 'n5', icon: Truck,       label: 'Order #1452 shipped',        time: '5 hr ago',   type: 'success' },
  { id: 'n6', icon: RotateCcw,   label: 'Order #1448 refunded',       time: '1 day ago',  type: 'warning' },
];

export const NOTIFICATION_COLORS = {
  info:    'bg-blue-50 text-blue-600',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-yellow-50 text-yellow-700',
  error:   'bg-red-50 text-red-600',
};
