# Environment Setup Guide

## Local Development Setup

### 1. Create `.env` file in project root
```bash
# Create .env file
touch .env
```

### 2. Add the following content to `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Production Deployment (Render)

### Frontend Environment Variables
In your Render dashboard for the **frontend service**:

1. Go to **Environment** tab
2. Add the following environment variable:
   ```
   Key: REACT_APP_API_URL
   Value: https://YOUR-BACKEND-SERVICE-NAME.onrender.com/api
   ```
3. Replace `YOUR-BACKEND-SERVICE-NAME` with your actual backend service name

### Backend Environment Variables
Your backend should already have these set in Render:
```
DATABASE_URL=postgresql://...
PORT=5000
FLASK_ENV=production
```

## Verification

### Check if Environment Variable is Set
In your React app, you can verify by checking the browser console:
```javascript
console.log('API URL:', process.env.REACT_APP_API_URL);
```

### Expected Values
- **Local:** `http://localhost:5000/api`
- **Production:** `https://your-backend-name.onrender.com/api`

## Troubleshooting

### Issue: ERR_CONNECTION_REFUSED in Production
**Solution:** Make sure `REACT_APP_API_URL` is set correctly in Render environment variables.

### Issue: API calls work locally but not in production
**Solution:** 
1. Verify backend is deployed and running on Render
2. Check CORS settings in backend allow your frontend domain
3. Ensure `REACT_APP_API_URL` points to correct backend URL

### Issue: Changes not reflecting after setting environment variable
**Solution:** 
1. Re-deploy the frontend service in Render
2. Clear browser cache
3. Environment variables are embedded at build time, so rebuilding is required

## Important Notes

⚠️ **Environment variables in React:**
- Must start with `REACT_APP_`
- Are embedded at **build time**, not runtime
- Changing them requires a rebuild/redeploy
- Never store secrets in React environment variables (they're visible in browser)

✅ **Correct approach:**
- Sensitive operations (auth, database) happen in backend
- Frontend only stores API endpoint URL

