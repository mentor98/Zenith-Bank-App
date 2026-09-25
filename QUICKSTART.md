# Zenith Bank App - Quick Start Guide

## 🎯 30-Second Start

```bash
# 1. Dev server is already running at:
http://localhost:8443

# 2. Click "Login" button
# 3. Use any email/password (mock mode)
# 4. Explore the app!
```

---

## ⚡ Essential Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Format code
npm run format

# Preview production build
npm run preview
```

---

## 📱 What to Try

1. **Welcome Screen**
   - Click "Login" → Enter any credentials
   - Or click "Open an account" → Create account

2. **Home Dashboard**
   - See 15+ banking services
   - Click on any service card
   - Use bottom navigation to switch tabs

3. **Products & Services**
   - View product cards
   - See recent transaction history
   - Navigate back to home

4. **Lifestyle**
   - Browse lifestyle services
   - Back button to return home

5. **Logout**
   - Click logout icon in header
   - Returns to login screen

---

## 🔌 Connect Your Backend

### Step 1: Create `.env.local`
```
VITE_API_URL=http://localhost:3000/api
```

### Step 2: Build Your Backend
Need a Node.js backend with these endpoints:

```javascript
// Minimal example
POST /auth/login          → { token, user }
POST /auth/signup         → { token, user }
GET  /auth/profile        → { user profile }
GET  /transactions        → [ transactions ]
POST /transactions/transfer → { success }
GET  /account/balance     → { balance }
```

### Step 3: Start Dev Server
```bash
npm run dev
```

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main routing & state |
| `src/services/api.ts` | API client (edit for backend) |
| `src/hooks/useAuth.ts` | Login/logout logic |
| `.env.local` | Backend URL config |
| `DEVELOPMENT_GUIDE.md` | Full integration guide |

---

## 🎨 Customize

### Change App Title
Edit `index.html`:
```html
<title>Your Bank Name</title>
```

### Change Colors
Edit `src/index.css` or use Tailwind classes in components:
```
Primary Red: #d60a14
Secondary: #a00a0f
```

### Add New Service
Edit `src/constants/index.ts`:
```typescript
{ id: 'your-service', label: 'Your Service', type: 'service' }
```

---

## 🔐 Login Demo

### With Mock API (Current)
- **Email:** Any email (test@test.com)
- **Password:** Any password (1234)
- **Works:** ✅ Yes

### With Real Backend
- **Email:** Your database email
- **Password:** Your database password
- **Works:** ✅ After backend is set up

---

## 🚨 Troubleshooting

### "Page shows blank"
1. Hard refresh: Ctrl+Shift+R
2. Clear cache: Ctrl+Shift+Delete
3. Check console: F12 → Console tab

### "Cannot find module"
1. Stop server: Ctrl+C
2. Install deps: `npm install`
3. Start again: `npm run dev`

### "API not connecting"
1. Check `VITE_API_URL` in `.env.local`
2. Verify backend is running
3. Check CORS on backend

### "TypeScript errors"
1. Run: `npm run build`
2. Fix errors shown
3. Restart dev server

---

## 📚 Learn More

- **Full Guide:** `README.md`
- **Dev Setup:** `DEVELOPMENT_GUIDE.md`
- **Project Info:** `PROJECT_SUMMARY.md`

---

## 🎯 Next Steps

1. ✅ Explore the current app
2. ✅ Review the code structure
3. ✅ Create your Node.js backend
4. ✅ Connect the API endpoints
5. ✅ Test login flow
6. ✅ Add more features

---

## 💡 Tips

- TypeScript provides excellent IDE autocomplete
- Vite hot reload makes development fast
- Service layer keeps API logic clean
- Mock API lets you test without backend

---

## 🚀 Ready?

The app is running at **http://localhost:8443**

Go build your backend! 🎉

---

## 📞 Questions?

Check the relevant documentation:
- UI/Design? → See `README.md`
- Backend setup? → See `DEVELOPMENT_GUIDE.md`
- Project structure? → See `PROJECT_SUMMARY.md`
- Code details? → Check file comments

---

**Happy banking app development!** 🏦✨
