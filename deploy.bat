@echo off
echo ========================================
echo   Deploying E-commerce Site to Netlify
echo ========================================

echo.
echo Building client application...
cd client
call npm install
if errorlevel 1 (
    echo Failed to install dependencies
    pause
    exit /b 1
)

call npm run build
if errorlevel 1 (
    echo Build failed
    pause
    exit /b 1
)

cd ..

echo.
echo Deploying to Netlify...
netlify deploy

echo.
echo If everything looks good, deploy to production:
echo netlify deploy --prod
echo.
pause