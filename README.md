# Kcart - E-commerce Platform

A modern e-commerce platform with React frontend and serverless backend.

## 🚀 Features

- 🛍️ Product catalog with search and filters
- 🛒 Shopping cart functionality
- 👤 User authentication
- 📦 Order management
- 🔧 Admin panel
- 📱 Responsive design

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Netlify Serverless Functions
- **Database**: In-memory (demo data)
- **Deployment**: Netlify

## 📁 Project Structure

```
E-commerce-website/
├── client/                 # React frontend
│   ├── src/               # Source code
│   ├── netlify/functions/ # Serverless functions
│   └── dist/              # Build output
├── admin/                 # Admin panel
├── server/                # Original backend (reference)
└── netlify/               # Function templates
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Netlify CLI

### Installation & Deployment

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd E-commerce-website
   ```

2. **Deploy to Netlify**
   ```bash
   ./deploy.bat
   ```

3. **Or deploy manually**
   ```bash
   cd client
   npm install
   npm run build
   cd ..
   netlify deploy --prod
   ```

## 🧪 Demo Credentials

- **User**: user@gmail.com / 12345678
- **Admin**: admin@kcart.com / admin123

## 📊 API Endpoints

- `/api/product/*` → Products API
- `/api/cart/*` → Cart API  
- `/api/user/*` → Authentication API
- `/api/order/*` → Orders API

## 🌐 Deployment

The site uses Netlify serverless functions for the backend. Simply run `deploy.bat` or use the Netlify CLI to deploy.

## 👨‍💻 Author

**Kirtan Panchal**