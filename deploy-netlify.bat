@echo off
echo ========================================
echo    Kcart E-commerce Netlify Deployment
echo ========================================
echo.

echo [1/4] Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install client dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Building client application...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Failed to build client application
    pause
    exit /b 1
)

echo.
echo [3/4] Installing Netlify Functions dependencies...
cd ../netlify/functions
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install functions dependencies
    pause
    exit /b 1
)

cd ../..

echo.
echo [4/4] Deployment ready!
echo.
echo ========================================
echo    DEPLOYMENT INSTRUCTIONS
echo ========================================
echo.
echo Option 1 - Netlify CLI (Recommended):
echo   1. Install Netlify CLI: npm install -g netlify-cli
echo   2. Login to Netlify: netlify login
echo   3. Deploy: netlify deploy --prod
echo.
echo Option 2 - Git Integration:
echo   1. Push your code to GitHub/GitLab
echo   2. Connect repository in Netlify dashboard
echo   3. Netlify will auto-deploy on push
echo.
echo Option 3 - Manual Upload:
echo   1. Zip the entire project folder
echo   2. Upload to Netlify dashboard
echo   3. Configure build settings as shown below
echo.
echo ========================================
echo    BUILD SETTINGS FOR NETLIFY
echo ========================================
echo Build command: cd client && npm install && npm run build
echo Publish directory: client/dist
echo Functions directory: netlify/functions
echo.
echo Environment Variables to set in Netlify:
echo - VITE_RAZORPAY_KEY_ID=your_razorpay_key
echo.
echo ========================================
echo    API ENDPOINTS AVAILABLE
echo ========================================
echo - GET  /api/product/list - Get all products
echo - POST /api/cart/add - Add to cart
echo - POST /api/user/register - User registration
echo - POST /api/order/place - Place order
echo.
echo Your frontend will automatically connect to these APIs!
echo.
pause