#!/bin/bash

echo "🚀 Deploying Kcart Backend to Vercel..."

# Check if we're in the right directory
if [ ! -f "server/server.js" ]; then
    echo "❌ Error: server/server.js not found. Please run from project root."
    exit 1
fi

# Navigate to server directory
cd server

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🚀 Deploying backend..."
vercel --prod

echo "✅ Backend deployment initiated!"
echo ""
echo "🔧 Next steps:"
echo "1. Note your backend URL from Vercel output"
echo "2. Set environment variables in Vercel dashboard:"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET"
echo "   - CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"
echo "   - STRIPE_SECRET_KEY"
echo "   - RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET"
echo "   - ADMIN_EMAIL, ADMIN_PASSWORD"
echo ""
echo "3. Update frontend environment variable:"
echo "   VITE_BACKEND_URL=https://your-backend-url.vercel.app"
echo ""
echo "4. Redeploy frontend with new backend URL"