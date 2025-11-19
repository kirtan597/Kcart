@echo off
echo ========================================
echo   Installing Dependencies
echo ========================================
echo.

echo [1/3] Installing Server dependencies...
cd server
call npm install
cd ..
echo.

echo [2/3] Installing Client dependencies...
cd client
call npm install
cd ..
echo.

echo [3/3] Installing Admin dependencies...
cd admin
call npm install
cd ..
echo.

echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next step: Run start-demo.bat to launch the app
echo.
pause
