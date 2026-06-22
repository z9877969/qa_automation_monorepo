@echo off
echo Starting Project Headliner...

where docker >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker not found.
    echo Install Docker Desktop: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

docker compose up --build

echo.
echo All services are up:
echo   Frontend ^-^> http://localhost:5173
echo   Backend  ^-^> http://localhost:5000
echo   MySQL    ^-^> localhost:3306
pause
