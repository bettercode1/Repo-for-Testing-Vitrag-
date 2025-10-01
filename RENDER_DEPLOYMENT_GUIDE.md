# Render Deployment Guide for Vitrag Testing Lab

## 📋 Prerequisites
1. A Render account (sign up at https://render.com)
2. Your project pushed to GitHub, GitLab, or Bitbucket
3. PostgreSQL database credentials (you can use your existing Neon database or create one on Render)

## 🚀 Quick Deployment Steps

### Step 1: Prepare Your Repository
1. Make sure all changes are committed to your Git repository
2. Push to your remote repository (GitHub/GitLab/Bitbucket)

### Step 2: Create PostgreSQL Database on Render (Optional)
If you want to create a new database on Render instead of using your existing Neon database:

1. Go to Render Dashboard → New → PostgreSQL
2. Name: `vitrag-db`
3. Database: `vitragLLP`
4. User: `vitrag_user`
5. Region: Oregon (or closest to you)
6. Plan: Free (for testing)
7. Click "Create Database"
8. **Save the "Internal Database URL"** - you'll need this!

### Step 3: Deploy Backend Service

1. Go to Render Dashboard → New → Web Service
2. Connect your repository
3. Configure:
   - **Name**: `vitrag-backend`
   - **Region**: Oregon
   - **Branch**: `dev` (or your main branch)
   - **Root Directory**: Leave empty
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && gunicorn app:app`
   - **Plan**: Free (for testing)

4. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   DATABASE_URL = <your-database-url>
   FRONTEND_URL = <will-add-after-frontend-deployment>
   FLASK_ENV = production
   ```
   
5. Click "Create Web Service"
6. **Save the backend URL** (e.g., https://vitrag-backend.onrender.com)

### Step 4: Deploy Frontend Service

1. Go to Render Dashboard → New → Web Service
2. Connect the same repository
3. Configure:
   - **Name**: `vitrag-frontend`
   - **Region**: Oregon
   - **Branch**: `dev` (or your main branch)
   - **Root Directory**: Leave empty
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm install -g serve && serve -s build -l $PORT`
   - **Plan**: Free (for testing)

4. Add Environment Variables:
   ```
   REACT_APP_API_URL = <your-backend-url>/api
   ```
   Example: `https://vitrag-backend.onrender.com/api`

5. Click "Create Web Service"
6. **Save the frontend URL** (e.g., https://vitrag-frontend.onrender.com)

### Step 5: Update Backend Environment Variables

1. Go back to your backend service in Render
2. Go to "Environment" tab
3. Update the `FRONTEND_URL` variable:
   ```
   FRONTEND_URL = <your-frontend-url>
   ```
   Example: `https://vitrag-frontend.onrender.com`
4. Save changes (this will trigger a redeploy)

### Step 6: Initialize Database Tables

After both services are deployed:

1. Go to your backend service in Render
2. Click on "Shell" tab (on the left sidebar)
3. Run these commands:
   ```bash
   cd backend
   python create_tables.py
   ```

## ✅ Verify Deployment

1. Open your frontend URL in a browser
2. Try logging in
3. Check if data loads correctly

## 📝 Important Notes

### Free Tier Limitations:
- Services spin down after 15 minutes of inactivity
- First request after inactivity takes 30-60 seconds (cold start)
- Database has limited storage
- Good for testing, not production!

### Database Options:
- **Option 1**: Keep using your existing Neon database (just use the same DATABASE_URL)
- **Option 2**: Create a new Render PostgreSQL database (free tier available)

### Troubleshooting:

**If backend fails to start:**
- Check logs in Render dashboard
- Verify DATABASE_URL is correct
- Make sure all environment variables are set

**If frontend can't connect to backend:**
- Verify `REACT_APP_API_URL` is correct (should end with `/api`)
- Check CORS settings in backend
- Look at browser console for errors

**If database connection fails:**
- Verify DATABASE_URL format: `postgresql://user:password@host:port/database`
- For Neon: make sure URL includes `?sslmode=require`
- Check database is accessible (not behind firewall)

## 🔄 Updating Your App

When you push changes to your Git repository:
1. Render automatically detects changes
2. Rebuilds and redeploys your services
3. No manual steps needed!

## 💰 Cost Estimate

For testing with Free Tier:
- Backend: Free
- Frontend: Free
- Database: Free (Render) or existing Neon database
- **Total: $0/month**

## 📞 Support

If you encounter issues:
1. Check Render logs (Dashboard → Service → Logs)
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly

---

**Your app will be live at:**
- Frontend: `https://vitrag-frontend.onrender.com`
- Backend API: `https://vitrag-backend.onrender.com/api`

(URLs will be different based on your service names)

