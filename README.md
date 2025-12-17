# 🛒 Kcart - Premium E-commerce Platform

<div align="center">

![Kcart Logo](https://img.shields.io/badge/Kcart-Premium%20Shopping-black?style=for-the-badge&logo=shopping-cart)

**Your Perfect Shopping Destination**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://kcart-ecommerce.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/kirtan597/Kcart)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

*A modern, full-stack e-commerce platform with stunning UI, comprehensive dashboard, and AI integration*

</div>

---

## ✨ **Key Highlights**

<table>
<tr>
<td width="50%">

### 🎨 **Modern Design**
- Minimalist hero section with animations
- Black & white theme with elegant typography
- Responsive design for all devices
- Smooth scrolling and transitions

### 🛍️ **Shopping Experience**
- Advanced product catalog with filters
- Smart search functionality
- Seamless cart management
- Multiple payment options (Indian)

</td>
<td width="50%">

### 📊 **Analytics Dashboard**
- Real-time sales tracking
- User session monitoring
- Interactive charts and graphs
- Comprehensive order management

### 🤖 **AI Integration**
- Bytez.js SDK integration
- AI-powered recommendations
- Smart product categorization
- Intelligent user insights

</td>
</tr>
</table>

---

## 🚀 **Features Overview**

### 🛒 **E-commerce Core**
- **Product Management**: Complete CRUD operations with image galleries
- **Shopping Cart**: Persistent cart with size/quantity selection
- **User Authentication**: Secure login/register with JWT tokens
- **Order Processing**: Full order lifecycle management
- **Payment Integration**: Google Pay, Paytm, PhonePe, Cash on Delivery

### 📱 **User Experience**
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Search & Filters**: Advanced filtering by category, price, size
- **Product Reviews**: Rating and review system
- **Wishlist**: Save favorite products
- **Order Tracking**: Real-time order status updates

### 🎛️ **Admin Dashboard**
- **Analytics**: Sales charts, user metrics, revenue tracking
- **Product Management**: Add, edit, delete products with bulk operations
- **Order Management**: Process orders, update status, manage inventory
- **User Management**: View user sessions, track activities
- **AI Insights**: Powered by Bytez.js for intelligent analytics

### 🔧 **Technical Features**
- **Modern Stack**: React 18, Vite, Tailwind CSS, Node.js, MongoDB
- **Authentication**: JWT-based secure authentication
- **File Upload**: Cloudinary integration for image management
- **Email Service**: Nodemailer for order confirmations
- **Payment Processing**: Multiple Indian payment gateways
- **Deployment**: Netlify frontend, Railway/Render backend

---

## 🛠️ **Technology Stack**

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-0055FF?style=flat-square&logo=framer)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat-square&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=json-web-tokens)

### Services & Tools
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=flat-square&logo=cloudinary)
![Netlify](https://img.shields.io/badge/Netlify-Deployment-00C7B7?style=flat-square&logo=netlify)
![Bytez.js](https://img.shields.io/badge/Bytez.js-AI%20SDK-FF6B6B?style=flat-square)

</div>

---

## 📁 **Project Architecture**

```
Kcart/
├── 📱 client/                          # React Frontend
│   ├── 🎨 src/
│   │   ├── 📄 pages/                   # Route components
│   │   │   ├── Home.jsx               # Landing page with hero
│   │   │   ├── Collection.jsx         # Product catalog
│   │   │   ├── Dashboard.jsx          # Admin analytics
│   │   │   ├── PlaceOrder.jsx         # Checkout process
│   │   │   └── AIChat.jsx             # AI integration
│   │   ├── 🧩 components/             # Reusable components
│   │   │   ├── Hero.jsx               # Animated hero section
│   │   │   ├── Navbar.jsx             # Navigation
│   │   │   ├── ProductItem.jsx        # Product cards
│   │   │   └── DashboardComponents/   # Dashboard widgets
│   │   ├── 🔧 services/               # API services
│   │   │   ├── bytezService.js        # AI integration
│   │   │   ├── dashboardService.js    # Analytics
│   │   │   └── userTrackingService.js # User monitoring
│   │   ├── 🎯 context/                # State management
│   │   └── 🎨 assets/                 # Images & icons
│   ├── 🌐 netlify/functions/          # Serverless functions
│   └── 📦 public/                     # Static assets
├── 🖥️ server/                          # Node.js Backend
│   ├── 📊 controllers/                # Business logic
│   ├── 🗃️ models/                     # Database schemas
│   ├── 🛣️ routes/                     # API endpoints
│   ├── 🔧 middleware/                 # Auth & validation
│   └── 📈 data/                       # Seed data
├── 👨‍💼 admin/                          # Admin Panel
│   ├── 📊 Dashboard                   # Admin interface
│   ├── 📦 Product Management          # CRUD operations
│   └── 📋 Order Processing            # Order management
└── 📚 docs/                           # Documentation
    ├── SETUP.md                       # Setup guide
    ├── DASHBOARD_README.md            # Dashboard docs
    └── AI_INTEGRATION_GUIDE.md        # AI features
```

---

## 🚀 **Quick Start Guide**

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
MongoDB (local or cloud)
```

### 1️⃣ **Clone & Install**
```bash
# Clone the repository
git clone https://github.com/kirtan597/Kcart.git
cd Kcart/E-commerce-website

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Install admin dependencies
cd ../admin
npm install
```

### 2️⃣ **Environment Setup**
```bash
# Server environment (.env)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=admin@kcart.com
ADMIN_PASSWORD=admin123

# Client environment (.env)
VITE_BACKEND_URL=http://localhost:5000
VITE_BYTEZ_API_KEY=your_bytez_api_key
```

### 3️⃣ **Database Setup**
```bash
# Seed the database with sample products
cd server
npm run seed
```

### 4️⃣ **Start Development**
```bash
# Terminal 1: Start backend server
cd server
npm run dev

# Terminal 2: Start frontend client
cd client
npm run dev

# Terminal 3: Start admin panel
cd admin
npm run dev
```

### 5️⃣ **Access Applications**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5174

---

## 🎯 **Demo Credentials**

<table>
<tr>
<th>Role</th>
<th>Email</th>
<th>Password</th>
<th>Access</th>
</tr>
<tr>
<td>👤 Customer</td>
<td><code>user@gmail.com</code></td>
<td><code>12345678</code></td>
<td>Shopping, Orders, Profile</td>
</tr>
<tr>
<td>👨‍💼 Admin</td>
<td><code>admin@kcart.com</code></td>
<td><code>admin123</code></td>
<td>Dashboard, Analytics, Management</td>
</tr>
</table>

---

## 📊 **API Documentation**

### 🔐 **Authentication**
```http
POST /api/user/register    # User registration
POST /api/user/login       # User login
POST /api/user/admin       # Admin login
```

### 🛍️ **Products**
```http
GET    /api/product/list      # Get all products
POST   /api/product/add       # Add new product (admin)
POST   /api/product/remove    # Remove product (admin)
GET    /api/product/single    # Get single product
```

### 🛒 **Cart & Orders**
```http
POST   /api/cart/add          # Add to cart
POST   /api/cart/update       # Update cart
GET    /api/cart/get          # Get cart items
POST   /api/order/place       # Place order
GET    /api/order/userorders  # Get user orders
GET    /api/order/list        # Get all orders (admin)
POST   /api/order/status      # Update order status
```

---

## 🎨 **UI/UX Features**

### 🌟 **Hero Section**
- Animated typewriter effect
- Infinite scrolling product showcase
- Smooth parallax animations
- Interactive hover effects
- Call-to-action button leading to dashboard

### 🎯 **Product Catalog**
- Grid/list view toggle
- Advanced filtering system
- Search with autocomplete
- Sort by price, popularity, rating
- Lazy loading for performance

### 📊 **Dashboard Analytics**
- Real-time sales charts
- User session tracking
- Revenue analytics
- Top products insights
- Geographic user distribution

### 💳 **Payment Integration**
- Google Pay
- Paytm
- PhonePe
- Cash on Delivery
- Secure payment processing

---

## 🤖 **AI Integration**

### Bytez.js SDK Features
```javascript
// AI-powered product recommendations
const recommendations = await bytezService.getRecommendations(userId);

// Intelligent search suggestions
const suggestions = await bytezService.getSearchSuggestions(query);

// Sentiment analysis for reviews
const sentiment = await bytezService.analyzeSentiment(reviewText);

// Smart categorization
const category = await bytezService.categorizeProduct(productData);
```

### AI Dashboard Features
- Predictive analytics
- Customer behavior insights
- Inventory optimization
- Sales forecasting
- Automated product tagging

---

## 📱 **Mobile Responsiveness**

<div align="center">

| Device | Breakpoint | Features |
|--------|------------|----------|
| 📱 Mobile | < 768px | Touch-optimized, Swipe gestures |
| 📱 Tablet | 768px - 1024px | Adaptive layout, Touch & click |
| 🖥️ Desktop | > 1024px | Full features, Hover effects |

</div>

---

## 🚀 **Deployment**

### **Netlify (Frontend)**
```bash
# Build and deploy
npm run build
netlify deploy --prod
```

### **Railway/Render (Backend)**
```bash
# Deploy to Railway
railway login
railway link
railway up
```

### **Environment Variables**
```bash
# Production environment
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=production_secret
CLOUDINARY_NAME=production_name
```

---

## 📈 **Performance Metrics**

<div align="center">

![Performance](https://img.shields.io/badge/Lighthouse-95%2B-green?style=flat-square&logo=lighthouse)
![Speed](https://img.shields.io/badge/Load%20Time-<2s-brightgreen?style=flat-square)
![SEO](https://img.shields.io/badge/SEO%20Score-98%2F100-green?style=flat-square)

</div>

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

---

## 🔧 **Development Scripts**

```bash
# Client
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Server
npm run dev          # Start with nodemon
npm run start        # Start production server
npm run seed         # Seed database
npm run test         # Run tests

# Admin
npm run dev          # Start admin panel
npm run build        # Build admin panel
```

---

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure responsive design

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Author**

<div align="center">

**Kirtan Panchal**

[![GitHub](https://img.shields.io/badge/GitHub-kirtan597-black?style=flat-square&logo=github)](https://github.com/kirtan597)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/kirtan597)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=flat-square&logo=gmail)](mailto:kirtan597@gmail.com)

*Full-Stack Developer | E-commerce Specialist | AI Enthusiast*

</div>

---

## 🙏 **Acknowledgments**

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Cloudinary** for image management
- **MongoDB** for the database solution
- **Netlify** for seamless deployment

---

<div align="center">

### 🌟 **Star this repository if you found it helpful!**

[![Stars](https://img.shields.io/github/stars/kirtan597/Kcart?style=social)](https://github.com/kirtan597/Kcart/stargazers)
[![Forks](https://img.shields.io/github/forks/kirtan597/Kcart?style=social)](https://github.com/kirtan597/Kcart/network/members)
[![Issues](https://img.shields.io/github/issues/kirtan597/Kcart?style=social)](https://github.com/kirtan597/Kcart/issues)

**Made with ❤️ by Kirtan Panchal**

</div>