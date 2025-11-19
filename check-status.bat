@echo off
echo ========================================
echo   E-Commerce Status Check
echo ========================================
echo.

echo [1] Checking Backend (Port 5000)...
curl -s http://localhost:5000/ >nul 2>&1
if %errorlevel% == 0 (
    echo     ✓ Backend is RUNNING
) else (
    echo     ✗ Backend is NOT running
    echo       Start with: cd server ^&^& npm run demo
)
echo.

echo [2] Checking Client (Port 5175)...
curl -s http://localhost:5175/ >nul 2>&1
if %errorlevel% == 0 (
    echo     ✓ Client is RUNNING
) else (
    echo     ✗ Client is NOT running
    echo       Start with: cd client ^&^& npm run dev
)
echo.

echo [3] Testing Products API...
curl -s http://localhost:5000/api/product/list >nul 2>&1
if %errorlevel% == 0 (
    echo     ✓ Products API is working
) else (
    echo     ✗ Products API failed
)
echo.

echo [4] Checking products.json...
if exist "server\data\products.json" (
    echo     ✓ products.json exists
) else (
    echo     ✗ products.json missing
    echo       It will be created when server starts
)
echo.

echo ========================================
echo   URLs:
echo   Backend: http://localhost:5000
echo   Client:  http://localhost:5175
echo   Admin:   http://localhost:5174
echo ========================================
echo.
pause
