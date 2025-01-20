#!/bin/bash

echo "Setting up the backend..."

# Install Node.js dependencies
npm install express sqlite3 body-parser cors

echo "Starting the backend server on localhost:3031..."
node backend.js