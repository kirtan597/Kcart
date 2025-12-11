@echo off
echo 🚀 Deploying Kcart Backend to Vercel...

REM Check if we're in the right directory
if not exist "server\server.js" (
    echo ❌ Error: server\server.js not found. Please run from project root.
    exit /b 1
)

REM Navigate to server directory
cd server

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing Vercel CLI...
    call npm install -g vercel
)

REM Deploy to Vercel
echo 🚀 Deploying backend...
call vercel --prod

echo ✅ Backend deployment initiated!
echo.
echo 🔧 Next steps:
echo 1. Note your backend URL from Vercel output
echo 2. Set environment variables in Vercel dashboard:
echo    - MONGODB_URI
echo    - JWT_SECRET
echo    - CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
echo    - STRIPE_SECRET_KEY
echo    - RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
echo    - ADMIN_EMAIL, ADMIN_PASSWORD
echo.
echo 3. Update frontend environment variable:
echo    VITE_BACKEND_URL=https://your-backend-url.vercel.app
echo.
echo 4. Redeploy frontend with new backend URL