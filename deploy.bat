@echo off
echo 🚀 Starting Kcart Deployment Process...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run from project root.
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
cd client
call npm install

REM Build the project
echo 🔨 Building project...
call npm run build

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo 📁 Build output is in client/dist/
    echo.
    echo 🌐 Deployment Instructions:
    echo For Vercel: vercel --prod
    echo For Netlify: netlify deploy --prod --dir=client/dist
    echo.
    echo 🔧 Don't forget to set environment variables:
    echo VITE_BACKEND_URL=https://your-backend-url
    echo VITE_RAZORPAY_KEY_ID=your_production_key
) else (
    echo ❌ Build failed! Check the errors above.
    exit /b 1
)