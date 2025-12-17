# Kcart E-commerce Setup Guide

## Backend Setup (Server)

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Update the `.env` file in the server directory with your actual credentials:

```env
# Database - Choose one option:
# Option 1: Local MongoDB (requires MongoDB installed locally)
MONGODB_URI=mongodb://localhost:27017/kcart

# Option 2: MongoDB Atlas (cloud database)
# MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/kcart?retryWrites=true&w=majority

# Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Email (for OTP functionality)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Seed Database with Sample Products
```bash
npm run seed-products
```

### 4. Start the Backend Server
```bash
npm run dev
```

The server will start on http://localhost:5000

## Frontend Setup (Client)

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The client will start on http://localhost:5173

## Admin Panel Setup

### 1. Install Dependencies
```bash
cd admin
npm install
```

### 2. Start the Admin Panel
```bash
npm run dev
```

The admin panel will start on http://localhost:5174

## Default Admin Credentials
- Email: admin@demo.com
- Password: admin123

## Notes
- Make sure MongoDB is running if using local database
- The backend must be running before starting the frontend
- All demo mode functionality has been removed - you now have a fully functional e-commerce system