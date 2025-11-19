@echo off
echo ========================================
echo   Starting E-Commerce Demo
echo ========================================
echo.
echo This will open 3 terminal windows:
echo 1. Backend Server (Port 5000)
echo 2. Client (Port 5173)
echo 3. Admin Panel (Port 5174)
echo.
echo Admin Login: admin@demo.com / admin123
echo.
echo ========================================
echo.

start cmd /k "cd server && npm run demo"
timeout /t 3 /nobreak >nul
start cmd /k "cd client && npm run dev"
timeout /t 2 /nobreak >nul
start cmd /k "cd admin && npm run dev"

echo.
echo All servers are starting...
echo Check the opened terminal windows!
echo.
pause
