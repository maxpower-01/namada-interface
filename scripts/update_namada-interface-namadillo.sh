#!/bin/bash

# Description: This script updates the Namada interface repository, rebuilds Docker containers if updates are found, and restarts the application.
# Usage: Run this script from the repository root directory.

echo "Fetching updates from the repository..."
git fetch origin

LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/main)

if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
    echo "Updates found. Pulling the latest changes..."
    git pull origin main
    echo "Stopping and removing the existing Docker container..."
    docker stop namada-interface-namadillo-1 2>/dev/null || true
    docker rm namada-interface-namadillo-1 2>/dev/null || true
    docker compose -p namada-interface -f docker/namadillo/docker-compose.yml down --remove-orphans
    echo "Rebuilding Docker containers..."
    docker compose -f docker/namadillo/docker-compose.yml build
    echo "Starting the updated Namada interface..."
    docker compose -p namada-interface -f docker/namadillo/docker-compose.yml up -d
else
    echo "No updates found. The local repository is up to date."
fi
