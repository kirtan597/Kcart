<div align="center">

# 🛒 **Kcart** - Modern E-Commerce Platform

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&duration=3000&pause=1000&color=000000&center=true&vCenter=true&width=600&lines=Welcome+to+Kcart!;Modern+E-Commerce+Solution;Built+with+React+%26+Node.js;Full-Stack+Shopping+Experience" alt="Typing SVG" />

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.10-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">

</div>

## 🌟 **Features Overview**

<div align="center">

### 🎯 **Core Features**
| Feature | Description | Status |
|---------|-------------|--------|
| 🏠 **Modern Homepage** | Hero carousel, latest collections, best sellers | ✅ |
| 🛍️ **Product Catalog** | Advanced filtering, search, categories | ✅ |
| 🛒 **Shopping Cart** | Add/remove items, quantity management | ✅ |
| 💳 **Secure Checkout** | Multiple payment gateways integration | ✅ |
| 👤 **User Authentication** | Login, register, password reset | ✅ |
| 📱 **Responsive Design** | Mobile-first, cross-device compatibility | ✅ |
| 📧 **Contact System** | EmailJS integration for inquiries | ✅ |
| 🎨 **Black & White Theme** | Modern, clean aesthetic design | ✅ |

</div>

---

## 🚀 **Tech Stack**

<div align="center">

### **Frontend Arsenal**
<img src="https://skillicons.dev/icons?i=react,vite,tailwind,js,html,css" />

### **Backend Powerhouse**  
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,jwt" />

### **Development Tools**
<img src="https://skillicons.dev/icons?i=git,github,vscode,npm" />

</div>

### 📦 **Dependencies Breakdown**

#### **Client Side**
```json
{
  "🎨 UI/UX": ["@mui/material", "tailwindcss", "react-icons", "lucide-react"],
  "🔄 State & Routing": ["react-router-dom", "axios"],
  "✨ Animations": ["lenis", "swiper"],
  "📧 Communication": ["@emailjs/browser", "react-toastify"],
  "⚡ Build Tools": ["vite", "@vitejs/plugin-react"]
}
```

#### **Server Side**
```json
{
  "🔐 Security": ["bcrypt", "jsonwebtoken", "validator"],
  "🗄️ Database": ["mongoose"],
  "💳 Payments": ["stripe", "razorpay"],
  "📧 Email": ["nodemailer"],
  "☁️ Storage": ["cloudinary", "multer"],
  "🌐 Server": ["express", "cors", "dotenv"]
}
```

---

## 🏗️ **Project Architecture**

<div align="center">

```mermaid
graph TB
    A[🌐 Client - React App] --> B[🔗 API Gateway]
    B --> C[🖥️ Server - Node.js/Express]
    C --> D[🗄️ MongoDB Database]
    C --> E[☁️ Cloudinary Storage]
    C --> F[💳 Payment Gateways]
    A --> G[📧 EmailJS Service]
    H[👨‍💼 Admin Panel] --> B
```

</div>

### 📁 **Folder Structure**
```
📦 Kcart E-Commerce
├── 🎨 client/          # React Frontend
│   ├── 📄 src/pages/   # Page components
│   ├── 🧩 src/components/ # Reusable components
│   └── 🎯 src/context/ # State management
├── 🖥️ server/          # Node.js Backend
│   ├── 🛣️ routes/      # API endpoints
│   ├── 📊 models/      # Database schemas
│   └── 🔧 controllers/ # Business logic
└── 👨‍💼 admin/          # Admin Dashboard
    └── 📊 Management interface
```

---

## 🎨 **Design Philosophy**

<div align="center">

### **Black & White Minimalism**
<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="500">

**🎯 Design Principles:**
- ⚫ **Shiny Black** accents for premium feel
- ⚪ **Clean White** backgrounds for clarity  
- 🎨 **Minimalist** approach for better UX
- 📱 **Mobile-first** responsive design
- ✨ **Smooth animations** and transitions

</div>

---

## 🚀 **Quick Start Guide**

### 📋 **Prerequisites**
```bash
Node.js >= 18.0.0
npm >= 9.0.0
MongoDB >= 6.0.0
```

### ⚡ **Installation**

<details>
<summary>🔧 <strong>Step-by-step Setup</strong></summary>

#### 1️⃣ **Clone Repository**
```bash
git clone https://github.com/yourusername/kcart-ecommerce.git
cd kcart-ecommerce
```

#### 2️⃣ **Install Dependencies**
```bash
# Install all dependencies at once
./install-all.bat

# Or install individually:
cd client && npm install
cd ../server && npm install  
cd ../admin && npm install
```

#### 3️⃣ **Environment Setup**
```bash
# Client (.env)
VITE_BACKEND_URL=http://localhost:4000

# Server (.env)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
ADMIN_EMAIL=admin@kcart.com
ADMIN_PASSWORD=admin123
```

#### 4️⃣ **Launch Application**
```bash
# Start all services
./start-demo.bat

# Or start individually:
cd server && npm run server    # Backend on :4000
cd client && npm run dev       # Frontend on :5173  
cd admin && npm run dev        # Admin on :5174
```

</details>

---

## 🌟 **Key Features Showcase**

<div align="center">

### 🏠 **Homepage Experience**
- 🎠 **Dynamic Hero Carousel** with smooth transitions
- 🏷️ **Brand Carousel** with promotional offers
- 🆕 **Latest Collections** showcase
- 🔥 **Best Sellers** section
- 📱 **App Download** promotion

### 🛍️ **Shopping Experience**  
- 🔍 **Advanced Search** with filters
- 📱 **Product Gallery** with zoom functionality
- 🛒 **Smart Cart** management
- 💳 **Secure Checkout** process
- 📦 **Order Tracking** system

### 👤 **User Management**
- 🔐 **Secure Authentication** with JWT
- 👤 **Profile Management** 
- 📧 **Email Verification**
- 🔑 **Password Reset** functionality
- 📋 **Order History**

### 📧 **Communication**
- 📬 **Contact Form** with EmailJS
- 🗺️ **Interactive Map** (Satellite view)
- 📱 **Social Media** integration
- 💬 **Real-time Notifications**

### 👨‍💼 **Admin Dashboard**
- 📊 **Analytics Dashboard**
- 📦 **Product Management** (CRUD)
- 👥 **User Management**
- 📋 **Order Management**
- 💰 **Sales Reports**

</div>

---

## 🎯 **API Endpoints**

<details>
<summary>📡 <strong>Backend API Routes</strong></summary>

### 🔐 **Authentication**
```
POST /api/user/register     # User registration
POST /api/user/login        # User login  
POST /api/user/admin        # Admin login
POST /api/user/forgot       # Password reset
```

### 🛍️ **Products**
```
GET  /api/product/list      # Get all products
GET  /api/product/:id       # Get single product
POST /api/product/add       # Add product (Admin)
POST /api/product/remove    # Remove product (Admin)
```

### 🛒 **Cart & Orders**
```
POST /api/cart/add          # Add to cart
POST /api/cart/update       # Update cart
POST /api/cart/get          # Get cart items
POST /api/order/place       # Place order
POST /api/order/stripe      # Stripe payment
POST /api/order/razorpay    # Razorpay payment
```

</details>

---

## 🌐 **Live Demo**

<div align="center">

### 🚀 **Experience Kcart Live**
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Kcart-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://e-commerce-website-4w6a.vercel.app)

### 🧪 **Test Credentials**
```
👤 User Account:
Email: user@gmail.com
Password: 12345678

👨‍💼 Admin Account:
Email: admin@kcart.com  
Password: admin123
```

</div>

---

## 🎨 **Screenshots & Demo**

<div align="center">

### 🖥️ **Desktop Experience**
<img src="https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif" width="600">

### 📱 **Mobile Responsive**  
<img src="https://user-images.githubusercontent.com/74038190/212284136-03988914-d42b-45cb-b001-c9c85524f92d.gif" width="300">

</div>

---

## 🔮 **Future Enhancements**

<div align="center">

| Feature | Priority | Status |
|---------|----------|--------|
| 🌟 **Product Reviews & Ratings** | High | 🔄 Planning |
| 💝 **Wishlist Functionality** | High | 🔄 Planning |
| 🎫 **Coupon & Discount System** | Medium | 🔄 Planning |
| 📧 **Email Notifications** | Medium | 🔄 Planning |
| 📱 **Progressive Web App (PWA)** | Low | 🔄 Planning |
| 🔔 **Push Notifications** | Low | 🔄 Planning |

</div>

---

## 🤝 **Contributing**

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284145-bf2c01a8-c448-4f1a-b911-996024c84606.gif" width="400">

### **We Welcome Contributions!**

</div>

1. 🍴 **Fork** the repository
2. 🌿 **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 **Push** to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 **Open** a Pull Request

---

## 📄 **License**

<div align="center">

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 👨‍💻 **Developer**

**Kirtan Panchal**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kirtan-panchal-309760320/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kirtan597)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:kirtan.2082006@gmail.com)

---

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">

### ⭐ **If you found this project helpful, please give it a star!** ⭐

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=000000&center=true&vCenter=true&width=600&lines=Thank+you+for+visiting+Kcart!;Happy+Shopping!+🛒;Built+with+❤️+and+React" alt="Typing SVG" />

</div>