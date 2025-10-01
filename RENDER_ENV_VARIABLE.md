# Render Environment Variable Configuration

## 🚀 Quick Setup for Production

### Frontend Service (Render Dashboard)

1. **Go to:** Your Frontend Service → **Environment** tab

2. **Add Environment Variable:**

   ```
   Key:   REACT_APP_API_URL
   Value: https://YOUR-BACKEND-SERVICE-NAME.onrender.com/api
   ```

3. **Important Notes:**
   - ⚠️ Replace `YOUR-BACKEND-SERVICE-NAME` with your actual backend service name
   - ✅ Must include `/api` at the end
   - ✅ Must use `https://` (not `http://`)
   - ✅ Do NOT include trailing slash after `/api`

### Example Values

If your backend service is named `vitrag-backend`, then:
```
REACT_APP_API_URL=https://vitrag-backend.onrender.com/api
```

If your backend service is named `vitrag-test-backend`, then:
```
REACT_APP_API_URL=https://vitrag-test-backend.onrender.com/api
```

### After Adding Environment Variable

1. Click **Save**
2. Go to **Manual Deploy** section
3. Click **Deploy latest commit**
4. Wait for build to complete (~5-10 minutes)

### Verification

After deployment, open your app and check browser console:
```javascript
// You should see your backend URL, NOT localhost
console.log(process.env.REACT_APP_API_URL)
```

**Expected output:**
```
https://your-backend-name.onrender.com/api
```

**Wrong (old behavior):**
```
http://localhost:5000/api
```

---

## 🔧 Local Development

Create `.env` file in project root:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

This allows you to test locally while using the same code that runs in production.

---

## ✅ Checklist

- [ ] Backend service is deployed and running on Render
- [ ] Frontend service exists on Render
- [ ] Environment variable `REACT_APP_API_URL` is added to frontend
- [ ] Value matches your backend URL + `/api`
- [ ] Frontend redeployed after adding environment variable
- [ ] No `ERR_CONNECTION_REFUSED` errors in browser console
- [ ] All API calls working in production

---

## 🆘 Troubleshooting

**Q: Still getting connection errors?**
- Verify environment variable is saved in Render
- Redeploy frontend (required for env var changes)
- Check backend URL is correct and accessible

**Q: How do I find my backend service name?**
- Go to Render Dashboard
- Look at your backend service
- The name is in the URL: `https://dashboard.render.com/web/srv-XXXXX`
- The public URL is shown in service details

**Q: Do I need to redeploy after adding env variable?**
- **YES!** React embeds environment variables at build time
- Simply adding the variable isn't enough
- You must trigger a new deployment

