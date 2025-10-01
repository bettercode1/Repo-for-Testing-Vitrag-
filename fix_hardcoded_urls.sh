#!/bin/bash
# Script to fix hardcoded localhost URLs in React components

# Define the API base URL constant
API_CONST="// API Base URL from environment variable\nconst API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';"

# Replace hardcoded URLs in all component files
find src/components -type f -name "*.js" -exec sed -i "s|http://localhost:5000/api|${API_BASE_URL}|g" {} \;
find src/components -type f -name "*.js" -exec sed -i "s|http://localhost:5000|${API_BASE_URL}|g" {} \;

echo "Fixed hardcoded URLs in component files"

