#!/bin/bash

# Define environment variables for Docker
export NODE_ENV=production
export JWT_SECRET="your-production-secret-key"  # Replace with a secure production secret
export DATABASE_URL="http://docker-db-url:3001" # Replace with the appropriate database URL for Docker
export PORT=3000

# Build the Docker image using docker-compose
echo "Building Docker containers..."
docker-compose build

# Start the Docker containers using docker-compose
echo "Starting Docker containers..."
docker-compose up -d

# Check if the application is running
if [ $? -eq 0 ]; then
    echo "Application is running in Docker containers."
    echo "Access the application at http://localhost:$PORT"
else
    echo "Failed to start Docker containers."
    exit 1
fi
