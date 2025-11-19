# 🔧 Troubleshooting Guide

## ✅ Current Status

Your demo e-commerce is now running with:
- ✅ Backend server on http://localhost:5000
- ✅ Client on http://localhost:5175
- ✅ 20 dummy products loaded
- ✅ API working correctly

## 🌐 Access Your Site

1. **Customer Website:** http://localhost:5175
2. **Admin Panel:** Install and run admin separately (see below)
3. **Backend API:** http://localhost:5000

## 🔍 If Products Still Don't Show

### Step 1: Check Browser Console
1. Open your browser to http://localhost:5175
2. Press F12 to open Developer Tools
3. Go to the "Console" tab
4. Look for messages like:
   - "Fetching products from: http://localhost:5000/api/product/list"
   - "Products set: 20 items"

### Step 2: Check Network Tab
1. In Developer Tools, go to "Network" tab
2. Refresh the page
3. Look for a request to `/api/product/list`
4. Click on it and check:
   - Status should be 200
   - Response should show products array

### Step 3: Hard Refresh
Sometimes the browser caches old code:
- Windows: Ctrl + Shift + R
- Or: Ctrl + F5

### Step 4: Clear Browser Cache
1. Press Ctrl + Shift + Delete
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh the page

## 🐛 Common Issues

### Issue 1: "LOADING PRODUCTS..." Never Goes Away

**Cause:** Backend not running or wrong URL

**Solution:**
```bash
# Check if backend is running
curl http://localhost:5000/api/product/list

# If it fails, restart backend:
cd E-commerce-website/server
npm run demo
```

### Issue 2: CORS Error in Console

**Cause:** Backend CORS not configured

**Solution:** Already fixed in serverSimple.js with `app.use(cors())`

### Issue 3: Network Error / Connection Refused

**Cause:** Backend not running on port 5000

**Solution:**
1. Check if another app is using port 5000
2. Stop that app or change port in .env files

### Issue 4: Empty Products Array

**Cause:** products.json file is empty or corrupted

**Solution:**
```bash
# Delete the file
cd E-commerce-website/server/data
del products.json

# Restart server - it will recreate with dummy data
cd ..
npm run demo
```

## 📊 Verify API Manually

### Test 1: Using Browser
Open: http://localhost:5000/api/product/list

You should see JSON with 20 products.

### Test 2: Using PowerShell
```powershell
curl http://localhost:5000/api/product/list
```

### Test 3: Using Test Page
Open: E-commerce-website/test-api.html in your browser

## 🔄 Complete Reset

If nothing works, do a complete reset:

```bash
# Stop all servers (Ctrl+C in each terminal)

# Delete node_modules and reinstall
cd E-commerce-website/server
rmdir /s /q node_modules
del package-lock.json
npm install

cd ../client
rmdir /s /q node_modules
del package-lock.json
npm install

# Delete products.json
cd ../server/data
del products.json

# Restart everything
cd ..
npm run demo

# In another terminal
cd ../client
npm run dev
```

## 📱 Check if It's Working

1. Open http://localhost:5175
2. You should see:
   - Hero banner at top
   - "LATEST COLLECTIONS" section with 10 products
   - "BEST SELLERS" section
   - Footer

3. Click "COLLECTION" in menu
   - Should show all 20 products
   - Filters should work (Men/Women/Kids)

## 🎯 Still Having Issues?

Check these files have the correct content:

1. **server/.env**
   ```
   PORT=5000
   JWT_SECRET=demo-secret-key-12345
   ADMIN_EMAIL=admin@demo.com
   ADMIN_PASSWORD=admin123
   ```

2. **client/.env**
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

3. **server/data/products.json**
   - Should have 20 products
   - If empty or missing, delete it and restart server

## 💡 Pro Tips

1. **Always start backend first**, then client
2. **Wait 5 seconds** after starting backend before starting client
3. **Check terminal output** for errors
4. **Use browser DevTools** to see what's happening
5. **Hard refresh** (Ctrl+Shift+R) after code changes

## 🆘 Emergency Commands

```bash
# Kill all Node processes (if servers won't stop)
taskkill /F /IM node.exe

# Check what's using port 5000
netstat -ano | findstr :5000

# Check what's using port 5175
netstat -ano | findstr :5175
```

---

**Need more help?** Check the browser console (F12) for detailed error messages!
/