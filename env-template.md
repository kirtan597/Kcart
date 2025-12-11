# 🔧 Environment Variables Template

## 🌐 **Frontend Environment Variables (Netlify)**

Set these in your Netlify dashboard under Site Settings > Environment Variables:

```env
VITE_BACKEND_URL=https://your-backend-name.vercel.app
VITE_RAZORPAY_KEY_ID=rzp_live_your_razorpay_key_id
```

## 🖥️ **Backend Environment Variables (Vercel)**

Set these in your Vercel dashboard under Settings > Environment Variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kcart

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Image Storage (Cloudinary)
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Payment Gateways
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
RAZORPAY_KEY_ID=rzp_live_your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Admin Credentials
ADMIN_EMAIL=admin@kcart.com
ADMIN_PASSWORD=secureAdminPassword123
```

## 🔗 **How to Connect Frontend and Backend**

1. **Deploy Backend First:**
   ```bash
   cd server
   vercel --prod
   ```
   
2. **Note Backend URL:** Copy the URL from Vercel output (e.g., `https://kcart-backend-abc123.vercel.app`)

3. **Update Frontend Environment:**
   - Go to Netlify Dashboard
   - Site Settings > Environment Variables
   - Set `VITE_BACKEND_URL` to your backend URL

4. **Redeploy Frontend:**
   - Trigger new deployment in Netlify
   - Or push changes to GitHub for auto-deploy

## 🧪 **Testing Connection**

1. **Test Backend API:**
   ```bash
   curl https://your-backend-url.vercel.app/api/product/list
   ```

2. **Test Frontend:**
   - Open browser dev tools
   - Go to Network tab
   - Visit your Netlify site
   - Check if API calls are successful

## 🚨 **Troubleshooting**

### **Products Not Loading:**
- Check browser console for errors
- Verify `VITE_BACKEND_URL` is set correctly
- Ensure backend is deployed and accessible

### **CORS Errors:**
- Backend CORS should allow your Netlify domain
- Check server CORS configuration

### **API 404 Errors:**
- Verify backend routes are working
- Check backend deployment logs in Vercel