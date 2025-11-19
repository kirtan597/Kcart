# 🎯 Demo E-Commerce Setup (No Database Required!)

This is a simplified demo version that works **WITHOUT** MongoDB, Cloudinary, or payment gateways.
Perfect for testing and learning!

## ✨ Features
- ✅ 20 Pre-loaded dummy products
- ✅ No database setup needed
- ✅ No external API keys required
- ✅ Works completely offline
- ✅ Full shopping cart functionality
- ✅ Admin panel to manage products
- ✅ User authentication (in-memory)

## 🚀 Quick Start

### Step 1: Install Dependencies

**Backend:**
```bash
cd E-commerce-website/server
npm install
```

**Client:**
```bash
cd E-commerce-website/client
npm install
```

**Admin:**
```bash
cd E-commerce-website/admin
npm install
```

### Step 2: Run the Application

Open **3 separate terminals**:

**Terminal 1 - Backend (Demo Mode):**
```bash
cd E-commerce-website/server
npm run demo
```
Server will start on: http://localhost:5000

**Terminal 2 - Client:**
```bash
cd E-commerce-website/client
npm run dev
```
Client will start on: http://localhost:5173 (or similar)

**Terminal 3 - Admin Panel:**
```bash
cd E-commerce-website/admin
npm run dev
```
Admin will start on: http://localhost:5174 (or similar)

## 🔑 Login Credentials

### Admin Panel
- **Email:** admin@demo.com
- **Password:** admin123

### User (Create your own or use these test credentials)
- Register a new account on the client site
- Or login with any account you create

## 📦 What's Included

### Pre-loaded Products:
- Men's T-shirts
- Men's Jackets
- Men's Trousers
- Women's Jackets
- Women's Palazzo Pants
- Kids' T-shirts and Tops

All products come with:
- Multiple images (from Unsplash)
- Different sizes (S, M, L, XL)
- Categories and subcategories
- Prices ranging from $100-$220

## 🎨 How to Add More Products

1. Go to Admin Panel (http://localhost:5174)
2. Login with admin credentials
3. Click "Add Items"
4. Fill in product details:
   - Name
   - Description
   - Price
   - Category (Men/Women/Kids)
   - Subcategory (Topwear/Bottomwear/Winterwear)
   - Sizes
   - Bestseller (Yes/No)
5. Click "ADD" (images will use placeholders)

## 📝 Notes

- Products are stored in `server/data/products.json`
- User data is stored in memory (resets on server restart)
- Cart data is stored in memory
- Orders are stored in memory
- No real payment processing (COD only works)

## 🔄 Reset to Default Products

If you want to reset to the original 20 dummy products:
1. Stop the server
2. Delete `server/data/products.json`
3. Restart the server with `npm run demo`

## 🎯 Perfect For:
- Learning MERN stack
- Testing e-commerce features
- Portfolio projects
- Demos and presentations
- Quick prototyping

Enjoy your demo e-commerce store! 🛍️
