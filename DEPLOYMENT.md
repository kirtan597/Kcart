# 🚀 Kcart Deployment Guide

## 📋 **Complete Deployment Steps**

### **🔧 Step 1: Deploy Backend to Vercel**

1. **Create separate Vercel project for backend:**
   ```bash
   cd server
   vercel --prod
   ```

2. **Set environment variables in Vercel dashboard:**
   ```env
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

3. **Note your backend URL:** `https://your-backend-name.vercel.app`

### **🌐 Step 2: Deploy Frontend to Netlify**

1. **Set environment variables in Netlify dashboard:**
   ```env
   VITE_BACKEND_URL=https://your-backend-name.vercel.app
   VITE_RAZORPAY_KEY_ID=your_production_razorpay_key
   ```

2. **Deploy frontend:**
   ```bash
   # Netlify will automatically deploy from GitHub
   # Or manually: netlify deploy --prod --dir=client/dist
   ```

### **🔗 Step 3: Connect Frontend and Backend**

The frontend will automatically connect to the backend using the `VITE_BACKEND_URL` environment variable.

## 🌐 **Alternative: Deploy Both to Vercel**

### **Option A: Separate Deployments (Recommended)**

1. **Backend**: Deploy `server/` folder to Vercel
2. **Frontend**: Deploy `client/` folder to Vercel or Netlify

### **Option B: Monorepo Deployment**

Create `vercel.json` in root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "client/dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/index.html"
    }
  ]
}
```

## 🔧 **Environment Variables Setup**

### **Backend (.env)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kcart
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
RAZORPAY_KEY_ID=rzp_live_your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
ADMIN_EMAIL=admin@kcart.com
ADMIN_PASSWORD=secureAdminPassword123
```

### **Frontend (.env)**
```env
VITE_BACKEND_URL=https://your-backend-name.vercel.app
VITE_RAZORPAY_KEY_ID=rzp_live_your_razorpay_key_id
```

## 🧪 **Testing Deployment**

1. **Test Backend API:**
   ```bash
   curl https://your-backend-name.vercel.app/api/product/list
   ```

2. **Test Frontend:**
   - Visit your Netlify URL
   - Check browser console for API calls
   - Verify products are loading

## 🚨 **Common Issues & Solutions**

### **❌ CORS Errors**
- Ensure backend CORS is configured for your frontend domain
- Add your Netlify URL to CORS origins

### **❌ Environment Variables Not Working**
- Restart deployment after setting env vars
- Check variable names (VITE_ prefix for frontend)

### **❌ API Calls Failing**
- Verify backend URL is correct
- Check network tab in browser dev tools
- Ensure backend is deployed and running

## 📱 **Quick Deploy Commands**

```bash
# Deploy backend to Vercel
cd server && vercel --prod

# Deploy frontend to Netlify (if using CLI)
cd client && npm run build && netlify deploy --prod --dir=dist

# Or use GitHub integration for automatic deployments
```

## 🎯 **Final Checklist**

- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Netlify
- [ ] Environment variables set correctly
- [ ] API endpoints working
- [ ] Products loading on frontend
- [ ] Cart functionality working
- [ ] Authentication working
- [ ] Payment integration configured