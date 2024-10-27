@echo off
REM Set environment variables
set NODE_ENV=production
set JWT_SECRET=your-production-secret-key
set DATABASE_URL=http://docker-db-url:3001
set PORT=3000

REM Build and run Docker containers
echo Building Docker containers...
docker-compose build

echo Starting Docker containers...
docker-compose up -d

REM Check if Docker started successfully
if %ERRORLEVEL% equ 0 (
    echo Application is running in Docker containers.
    echo Access the application at http://localhost:%PORT%
) else (
    echo Failed to start Docker containers.
    exit /b 1
)
pause
