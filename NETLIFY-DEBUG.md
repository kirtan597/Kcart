# 🔍 Netlify Deployment Debug Guide

## 🚨 **If Products Are Not Showing**

### **Step 1: Check Netlify Functions**

1. **Go to your Netlify site dashboard**
2. **Click on "Functions" tab**
3. **Verify these functions are deployed:**
   - `products`
   - `cart` 
   - `user`
   - `test`

### **Step 2: Test API Endpoints Directly**

Open these URLs in your browser (replace `your-site-name` with your actual Netlify site name):

```
https://your-site-name.netlify.app/.netlify/functions/test
https://your-site-name.netlify.app/.netlify/functions/products
https://your-site-name.netlify.app/api/product/list
```

**Expected Response:**
```json
{
  "success": true,
  "products": [...],
  "pagination": {...}
}
```

### **Step 3: Check Browser Console**

1. **Open your Netlify site**
2. **Press F12 to open Developer Tools**
3. **Go to Console tab**
4. **Look for errors like:**
   - `Failed to fetch`
   - `CORS error`
   - `404 Not Found`

### **Step 4: Environment Variables**

In Netlify Dashboard > Site Settings > Environment Variables, set:

```
VITE_BACKEND_URL=https://your-site-name.netlify.app
```

**OR leave it empty** (recommended for same-domain functions)

### **Step 5: Check Network Tab**

1. **Open Developer Tools**
2. **Go to Network tab**
3. **Refresh the page**
4. **Look for API calls to `/api/product/list`**
5. **Check if they return 200 status**

## 🔧 **Common Issues & Solutions**

### **❌ Functions Not Deployed**
- **Problem**: Functions folder not found
- **Solution**: Ensure `netlify.toml` has correct functions path
- **Fix**: `functions = "../netlify/functions"`

### **❌ 404 on API Calls**
- **Problem**: Redirects not working
- **Solution**: Check `netlify.toml` redirects section
- **Test**: Visit `/.netlify/functions/products` directly

### **❌ CORS Errors**
- **Problem**: Missing CORS headers
- **Solution**: Functions already include CORS headers
- **Check**: Verify headers in function response

### **❌ Environment Variables**
- **Problem**: Wrong backend URL
- **Solution**: Set `VITE_BACKEND_URL` or leave empty
- **Test**: Check `window.location.origin` in console

## 🧪 **Manual Testing Steps**

### **1. Test Function Directly**
```bash
curl https://your-site-name.netlify.app/.netlify/functions/products
```

### **2. Test Through Redirect**
```bash
curl https://your-site-name.netlify.app/api/product/list
```

### **3. Check Function Logs**
- Go to Netlify Dashboard
- Click on "Functions" tab
- Click on "products" function
- Check logs for errors

## 📱 **Quick Fix Checklist**

- [ ] Functions are deployed in Netlify dashboard
- [ ] `netlify.toml` has correct configuration
- [ ] Environment variables are set (or empty)
- [ ] API endpoints return 200 status
- [ ] Browser console shows no errors
- [ ] Network tab shows successful API calls

## 🆘 **If Still Not Working**

1. **Redeploy the site** (trigger new build)
2. **Clear browser cache** (Ctrl+F5)
3. **Check Netlify build logs** for errors
4. **Verify all files are committed** to GitHub
5. **Test in incognito mode** to rule out cache issues

## 📞 **Debug Information to Collect**

If you need help, provide:
- Netlify site URL
- Browser console errors
- Network tab screenshot
- Function logs from Netlify dashboard