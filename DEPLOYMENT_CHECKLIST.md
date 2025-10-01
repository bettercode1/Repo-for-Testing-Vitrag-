# ✅ Render Deployment Checklist

**Print this page and check off items as you complete them!**

---

## 📋 Pre-Deployment Setup

- [ ] Code is committed to Git
- [ ] Repository is pushed to GitHub/GitLab/Bitbucket
- [ ] Have Render account (sign up at render.com if needed)
- [ ] Have database URL ready
  ```
  postgresql://neondb_owner:npg_eHZv0ncD8irC@ep-muddy-pond-a6nccqdf.us-west-2.aws.neon.tech/neondb?sslmode=require
  ```

---

## 🔧 Step 1: Backend Deployment

### Create Service
- [ ] Go to render.com and login
- [ ] Click "New +" → "Web Service"
- [ ] Connect your Git repository
- [ ] Select your project

### Configure Service
- [ ] **Name**: `vitrag-backend` (or your choice)
- [ ] **Region**: Oregon (or closest to you)
- [ ] **Branch**: `dev` (or your main branch)
- [ ] **Root Directory**: (leave empty)
- [ ] **Runtime**: Python 3

### Build & Start Commands
- [ ] **Build Command**: 
  ```
  pip install -r backend/requirements.txt
  ```
- [ ] **Start Command**:
  ```
  cd backend && gunicorn app:app
  ```

### Environment Variables (Click "Advanced")
- [ ] Add `DATABASE_URL`:
  ```
  postgresql://neondb_owner:npg_eHZv0ncD8irC@ep-muddy-pond-a6nccqdf.us-west-2.aws.neon.tech/neondb?sslmode=require
  ```
- [ ] Add `FLASK_ENV`:
  ```
  production
  ```

### Deploy & Verify
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (3-5 minutes)
- [ ] Copy backend URL: `_______________________________`
- [ ] Test health check: `https://your-backend-url/api/health`

---

## 🎨 Step 2: Frontend Deployment

### Create Service
- [ ] Go to Render Dashboard
- [ ] Click "New +" → "Web Service"
- [ ] Connect the **same repository**
- [ ] Select your project

### Configure Service
- [ ] **Name**: `vitrag-frontend` (or your choice)
- [ ] **Region**: Oregon (same as backend)
- [ ] **Branch**: `dev` (or your main branch)
- [ ] **Root Directory**: (leave empty)
- [ ] **Runtime**: Node

### Build & Start Commands
- [ ] **Build Command**:
  ```
  npm install && npm run build
  ```
- [ ] **Start Command**:
  ```
  npx serve -s build
  ```

### Environment Variables (Click "Advanced")
- [ ] Add `REACT_APP_API_URL`:
  ```
  https://YOUR-BACKEND-NAME.onrender.com/api
  ```
  ⚠️ Use YOUR actual backend URL from Step 1!

### Deploy & Verify
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (3-5 minutes)
- [ ] Copy frontend URL: `_______________________________`
- [ ] Open frontend URL in browser

---

## 🔗 Step 3: Connect Services

### Update Backend CORS
- [ ] Go back to Backend Service in Render
- [ ] Click "Environment" tab
- [ ] Click "Add Environment Variable"
- [ ] Add `FRONTEND_URL`:
  ```
  https://YOUR-FRONTEND-NAME.onrender.com
  ```
  ⚠️ Use YOUR actual frontend URL from Step 2!
- [ ] Click "Save Changes"
- [ ] Wait for backend to redeploy (1-2 minutes)

---

## ✅ Final Verification

### Test Backend
- [ ] Open: `https://your-backend-url/api/health`
- [ ] Should see: `{"status": "healthy", "database": "connected"}`

### Test Frontend
- [ ] Open: `https://your-frontend-url`
- [ ] Frontend loads successfully
- [ ] No console errors (press F12 to check)

### Test Functionality
- [ ] Can login with credentials
- [ ] Dashboard loads
- [ ] Data displays correctly
- [ ] Can add/view customers
- [ ] Can add/view test requests
- [ ] All features work

---

## 📝 Record Your URLs

**Write down your deployment URLs:**

```
Backend URL:  https://________________________________.onrender.com

Frontend URL: https://________________________________.onrender.com

Health Check: https://________________________________.onrender.com/api/health
```

**Share this with your team:**
```
Frontend URL: https://________________________________.onrender.com
```

---

## 🎉 Success Indicators

You're done when ALL of these are true:

- ✅ Both services show "Live" in Render dashboard
- ✅ Health check returns healthy status
- ✅ Frontend loads without errors
- ✅ Login works
- ✅ Data loads correctly
- ✅ All features operational

---

## 🚨 If Something Goes Wrong

### Backend Won't Start
1. Check Render logs: Dashboard → Backend Service → Logs
2. Verify `DATABASE_URL` is correct (includes `?sslmode=require`)
3. Check all environment variables are set

### Frontend Won't Load
1. Check browser console (F12) for errors
2. Verify `REACT_APP_API_URL` ends with `/api`
3. Check Render logs: Dashboard → Frontend Service → Logs

### CORS Errors
1. Verify `FRONTEND_URL` in backend matches your frontend URL exactly
2. No trailing slashes
3. Must include `https://`

### Database Connection Failed
1. Check Neon database is active
2. Verify database URL hasn't expired
3. Test connection from backend logs

---

## 📞 Need Help?

- **Simple Guide**: [START_HERE.md](START_HERE.md)
- **Detailed Guide**: [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)
- **Technical Details**: [DEPLOYMENT_CHANGES_SUMMARY.md](DEPLOYMENT_CHANGES_SUMMARY.md)
- **Render Support**: https://render.com/docs

---

## ⏱️ Time Tracking

Started: ___:___ 

Completed: ___:___

Total Time: _______ minutes

---

**Remember**: Free tier services sleep after 15 minutes of inactivity. First load after sleep takes 30-60 seconds. This is normal!

---

**Congratulations on your deployment! 🎉**

Print this page for easy reference during deployment.

