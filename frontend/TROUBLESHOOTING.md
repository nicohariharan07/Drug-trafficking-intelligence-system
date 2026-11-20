# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 🚨 Issue: Cannot Login
**Symptoms:** Error message "Access Denied: Invalid email domain"

**Solution:**
- Ensure email ends with `@drugcommision.com` (note: ONE 's' in "commision")
- ✅ Correct: `officer@drugcommision.com`
- ❌ Wrong: `officer@drugcommission.com` (two 's')
- ❌ Wrong: `officer@gmail.com`

---

### 🚨 Issue: Redirected to Login After Successful Login
**Symptoms:** Login succeeds but immediately redirects back to login page

**Solution:**
```javascript
// Check browser console for errors
// Verify localStorage is enabled in browser

// Manual fix:
localStorage.setItem('authenticated', 'true');
// Then navigate to /dashboard
```

**Prevention:**
- Don't use incognito/private browsing mode
- Enable cookies and localStorage in browser settings

---

### 🚨 Issue: Charts Not Displaying
**Symptoms:** Empty space where charts should appear

**Solution:**
1. Check browser console for errors
2. Verify recharts is installed:
   ```bash
   pnpm list recharts
   ```
3. If missing, reinstall:
   ```bash
   pnpm install
   ```

---

### 🚨 Issue: Backend API Calls Failing
**Symptoms:** "Loading..." state never completes, or data shows as mock data

**Expected Behavior:**
- If backend is NOT running → System uses mock data (this is intentional!)
- If backend IS running → System fetches real data

**To Use Real Backend:**
1. Start your backend server on port 5000
2. Ensure endpoints match:
   - `http://localhost:5000/api/summary`
   - `http://localhost:5000/api/alerts`
   - `http://localhost:5000/api/reports`
   - `http://localhost:5000/api/network`
   - `http://localhost:5000/api/trends`
3. Check CORS is enabled on backend

**Backend CORS Configuration Example (Python Flask):**
```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
```

---

### 🚨 Issue: Routing Not Working (404 on Refresh)
**Symptoms:** Page works when navigating via sidebar, but shows 404 when refreshing

**Solution:**
This is a production deployment issue. For local development, Vite handles this automatically.

For production:
- Use a server that supports SPA routing
- Configure fallback to index.html for all routes

**Vercel/Netlify:** Add `_redirects` or `vercel.json` config

---

### 🚨 Issue: Styles Not Loading / Dark Theme Not Applied
**Symptoms:** Page appears unstyled or with default browser styles

**Solution:**
1. Check if Tailwind CSS is properly imported
2. Verify `/src/styles/tailwind.css` exists
3. Clear browser cache
4. Rebuild:
   ```bash
   rm -rf node_modules/.vite
   pnpm run dev
   ```

---

### 🚨 Issue: Icons Not Displaying
**Symptoms:** Empty squares or boxes where icons should be

**Solution:**
1. Verify lucide-react is installed:
   ```bash
   pnpm list lucide-react
   ```
2. Check import syntax:
   ```typescript
   import { Shield, Bell } from 'lucide-react';
   ```

---

### 🚨 Issue: TypeScript Errors
**Symptoms:** Red underlines in IDE, build fails

**Common Errors & Fixes:**

**Error:** `Cannot find module 'react-router-dom'`
```bash
pnpm install react-router-dom
```

**Error:** `Property 'X' does not exist on type 'Y'`
- Check interface definitions in `/src/app/utils/api.ts`
- Ensure data structure matches TypeScript interfaces

---

### 🚨 Issue: Build Fails
**Symptoms:** `pnpm run build` fails with errors

**Solutions:**

1. **Clear cache:**
   ```bash
   rm -rf node_modules/.vite
   rm -rf dist
   pnpm install
   pnpm run build
   ```

2. **Check TypeScript errors:**
   ```bash
   # TypeScript will show all errors
   pnpm run build
   ```

3. **Verify all imports:**
   - No relative paths outside /src
   - Use `@/` alias for imports

---

### 🚨 Issue: Sidebar Navigation Not Working
**Symptoms:** Clicking sidebar links does nothing

**Solution:**
1. Check browser console for errors
2. Verify React Router is installed
3. Ensure `<Router>` wraps the app in App.tsx

---

### 🚨 Issue: Data Not Updating
**Symptoms:** Old data persists, new data doesn't load

**Solution:**
1. Open browser DevTools → Network tab
2. Check if API calls are being made
3. Verify response data structure
4. Clear localStorage:
   ```javascript
   localStorage.clear();
   ```
5. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

### 🚨 Issue: Performance Issues / Slow Loading
**Symptoms:** Application feels sluggish, charts lag

**Solutions:**

1. **Check browser performance:**
   - Open DevTools → Performance tab
   - Record while navigating

2. **Optimize data size:**
   - Limit number of items in lists
   - Paginate large datasets

3. **Disable animations temporarily:**
   ```css
   /* In tailwind.css */
   * {
     animation: none !important;
   }
   ```

---

## Development Environment Issues

### 🚨 Issue: `pnpm` Command Not Found
**Solution:**
```bash
npm install -g pnpm
```

### 🚨 Issue: Port 5173 Already in Use
**Solution:**
```bash
# Kill process on port 5173
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### 🚨 Issue: Node Version Incompatible
**Solution:**
- Requires Node.js 18+
- Check version: `node --version`
- Update: Use nvm or download from nodejs.org

---

## Browser-Specific Issues

### Chrome
- Clear cache: `Ctrl+Shift+Delete`
- Disable extensions if issues persist
- Check console for CORS errors

### Firefox
- Enable localStorage in `about:config`
- Check Privacy settings
- Disable Enhanced Tracking Protection for localhost

### Safari
- Enable Developer menu
- Check Web Inspector console
- Allow localStorage in Preferences

---

## API Integration Debugging

### Check if Backend is Reachable
```bash
curl http://localhost:5000/api/summary
```

### Check CORS Headers
```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:5000/api/summary \
     --verbose
```

### Mock vs Real Data Indicator
Look for console logs:
```
Error fetching summary: [error message]
```
If you see this, the system is using mock data (which is fine for demo!)

---

## Production Deployment Issues

### 🚨 Issue: Environment Variables Not Working
**Solution:**
Create `.env` file:
```
VITE_API_BASE_URL=https://your-backend.com/api
```

Update api.ts:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
```

### 🚨 Issue: Build Size Too Large
**Solution:**
- Vite automatically optimizes
- Check bundle analyzer
- Remove unused dependencies

---

## Debug Mode

### Enable Detailed Logging
Add to any page component:
```typescript
useEffect(() => {
  console.log('Component mounted');
  console.log('Current data:', data);
}, [data]);
```

### React DevTools
1. Install React DevTools browser extension
2. Inspect component props and state
3. Check component hierarchy

---

## Emergency Fixes

### Complete Reset
```bash
# 1. Delete everything
rm -rf node_modules
rm -rf .vite
rm -rf dist
rm pnpm-lock.yaml

# 2. Fresh install
pnpm install

# 3. Restart
pnpm run dev
```

### Clear Browser Storage
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

---

## Getting Help

### Check These First
1. ✅ Browser console (F12) for errors
2. ✅ Network tab for failed requests
3. ✅ React DevTools for component issues
4. ✅ This troubleshooting guide

### Error Log Template
When reporting issues, include:
```
**Environment:**
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari] + version
- Node version: [run `node --version`]

**Issue:**
[Describe what's happening]

**Steps to Reproduce:**
1. ...
2. ...

**Expected vs Actual:**
Expected: ...
Actual: ...

**Console Errors:**
[Paste any error messages]

**Screenshots:**
[If applicable]
```

---

## Prevention Checklist

Before demo/presentation:
- [ ] Run `pnpm run dev` successfully
- [ ] Login works with test email
- [ ] All pages load without errors
- [ ] Charts render correctly
- [ ] Navigation is smooth
- [ ] No console errors
- [ ] Backend is running (or mock data is acceptable)
- [ ] Browser is up to date
- [ ] Internet connection is stable
- [ ] Backup plan ready

---

## Quick Command Reference

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Install dependencies
pnpm install

# Add a package
pnpm add package-name

# Check installed packages
pnpm list

# Update all packages
pnpm update

# Clear cache
rm -rf node_modules/.vite
```

---

## Contact & Support

This is a student project. For issues:
1. Check this troubleshooting guide
2. Review component code comments
3. Check API utility functions
4. Review technical architecture document

**Remember:** Mock data is intentionally provided as fallback. If backend is not running, the system will still work with demonstration data!

---

**Last Updated:** February 2026  
**Version:** 2.0.0
