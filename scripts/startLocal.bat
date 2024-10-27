@echo off
REM Set environment variables
set NODE_ENV=development
set JWT_SECRET=your-development-secret-key
set DATABASE_URL=http://localhost:3001
set PORT=3000

REM Ensure the setup of encrypted files
node .\utils\setupEncryptedFiles.js

REM Start the application
echo Starting the application locally...
node server.js
pause
