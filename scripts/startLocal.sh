#!/bin/bash

# Set the environment variables
export NODE_ENV=development
export JWT_SECRET="your-development-secret-key"  # Replace with your actual development secret
export DATABASE_URL="http://localhost:3001"      # Example URL for your custom database
export PORT=3000

# Check if the encrypted directory and files are set up
node ./utils/setupEncryptedFiles.js

# Start the Node.js application
echo "Starting the application locally..."
node server.js
