# Render Environment Variables Setup Guide

## Problem
Your frontend and backend are on different Render domains, causing CORS errors. This guide will fix the issue.

## Solution: Set Environment Variables on Render

### Backend Service Environment Variables
Go to your **backend** service on Render and set these environment variables:

1. **FRONTEND_URL**
   - **Value**: `https://repo-for-testing-vitrag-1.onrender.com`
   - **Description**: Your frontend domain (where your React app is hosted)

2. **DATABASE_URL** (if not already set)
   - **Value**: Your PostgreSQL connection string
   - **Example**: `postgresql://user:password@host/database?sslmode=require`

3. **SESSION_SECRET** (optional, for security)
   - **Value**: Any random secure string
   - **Example**: `your-secret-key-here-make-it-random-and-long`

### Frontend Service Environment Variables
Go to your **frontend** service on Render and set these environment variables:

1. **REACT_APP_API_URL**
   - **Value**: `https://repo-for-testing-vitrag.onrender.com/api`
   - **Description**: Your backend API endpoint (include `/api` suffix)
   - **Important**: Do NOT include trailing slash

## How to Set Environment Variables on Render

### Step-by-Step Instructions:

1. **Login to Render Dashboard**
   - Go to https://dashboard.render.com

2. **For Backend Service:**
   - Click on your backend service (repo-for-testing-vitrag)
   - Go to **Environment** tab
   - Click **Add Environment Variable**
   - Add `FRONTEND_URL` = `https://repo-for-testing-vitrag-1.onrender.com`
   - Click **Save Changes**
   - Your backend will automatically redeploy

3. **For Frontend Service:**
   - Click on your frontend service (repo-for-testing-vitrag-1)
   - Go to **Environment** tab
   - Click **Add Environment Variable**
   - Add `REACT_APP_API_URL` = `https://repo-for-testing-vitrag.onrender.com/api`
   - Click **Save Changes**
   - Your frontend will automatically redeploy

## Important Notes About URLs

### ✅ Correct Format:
- Backend `FRONTEND_URL`: `https://repo-for-testing-vitrag-1.onrender.com` (NO trailing slash, NO /api)
- Frontend `REACT_APP_API_URL`: `https://repo-for-testing-vitrag.onrender.com/api` (WITH /api, NO trailing slash)

### ❌ Incorrect Formats to Avoid:
- ~~`https://repo-for-testing-vitrag.onrender.com/api/`~~ (trailing slash)
- ~~`https://repo-for-testing-vitrag.onrender.com`~~ (missing /api)
- ~~`https://repo-for-testing-vitrag-1.onrender.com/`~~ (trailing slash)

## What Was Fixed in the Code

### 1. Backend CORS Configuration (`backend/app.py`)
- ✅ Added your production frontend URL to allowed origins
- ✅ Added console log to show which origins are allowed
- ✅ Made CORS configuration more robust

### 2. Frontend API URL Handling (`src/services/database.js`)
- ✅ Fixed double slash issue (`//samples` → `/samples`)
- ✅ Automatically removes trailing slashes from API_BASE_URL
- ✅ Added logging to see actual API requests

## After Setting Environment Variables

1. **Wait for redeployment** (both services will redeploy automatically)
2. **Check backend logs** - You should see:
   ```
   🔒 CORS enabled for origins: ['http://localhost:3000', 'http://localhost:3001', 'https://repo-for-testing-vitrag-1.onrender.com']
   ```
3. **Open your frontend** - The CORS errors should be gone
4. **Check browser console** - You should see:
   ```
   🌐 API Request to: https://repo-for-testing-vitrag.onrender.com/api/samples
   🌐 API Request to: https://repo-for-testing-vitrag.onrender.com/api/test-requests
   🌐 API Request to: https://repo-for-testing-vitrag.onrender.com/api/customers
   ```

## Troubleshooting

### If CORS errors persist:
1. Check that environment variables are set correctly (no typos)
2. Make sure both services have redeployed
3. Clear browser cache and hard refresh (Ctrl+Shift+R)
4. Check backend logs to confirm CORS origins

### If 404 errors on dashboard endpoints:
These need to be implemented in your backend:
- `/dashboard/stats`
- `/dashboard/recent-tests`
- `/dashboard/pending-tests`

### If database connection fails:
1. Verify `DATABASE_URL` is set correctly
2. Check that your database is running
3. Verify SSL mode is set to `require` for Neon database

## Quick Verification Checklist

- [ ] Backend has `FRONTEND_URL` environment variable
- [ ] Frontend has `REACT_APP_API_URL` environment variable
- [ ] Both services have redeployed
- [ ] Backend logs show correct CORS origins
- [ ] Frontend can make API requests without CORS errors
- [ ] Database connection is working

## Notes

- Environment variables are case-sensitive
- Changes to environment variables trigger automatic redeployment
- The code changes I made ensure backward compatibility with local development
- Your local development setup (localhost) will continue to work

