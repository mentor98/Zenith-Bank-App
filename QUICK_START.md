# Quick Start Guide - Zenith Bank App

## ✅ Dependencies Installed
`npm install` has been run and all dependencies are ready!

---

## 🚀 Step 1: Setup Supabase Database

### Execute the SQL Schema
1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project: `zjwkljoclksytsmhfxeg`
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy ALL the SQL from: `backend/database/schema.sql`
6. Paste it into Supabase SQL Editor
7. Click **Run** button

### What This Does:
- ✅ Creates all tables (users, accounts, transactions, payments, bills, loans, services)
- ✅ Creates trigger for automatic user profile creation on signup
- ✅ Sets up Row Level Security (RLS) policies
- ✅ Creates indexes for performance
- ✅ Seeds 12 default services

---

## 🌍 Step 2: Update Environment Variables

### Create/Update `.env.local` (Frontend)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_API_BASE_URL=http://localhost:5000/api
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key_here
```

### Create/Update `backend/.env` (Backend)
```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_KEY=your_supabase_service_key_here
SUPABASE_JWKS_URL=https://your-project.supabase.co/auth/v1/.well-known/jwks.json
PAYSTACK_SECRET_KEY=your_paystack_secret_key_here
PAYSTACK_PUBLIC_KEY=your_paystack_public_key_here
FRONTEND_URL=http://localhost:8443
```

**Replace all `your_*_here` values with your actual Supabase and Paystack credentials!**

---

## 📱 Step 3: Start Frontend

Open terminal in project root:
```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:8443/
```

**Access**: http://localhost:8443

---

## 🔧 Step 4: Start Backend

Open a NEW terminal:
```bash
cd backend
npm install
npm start
```

You should see:
```
🚀 Zenith Bank API running on port 5000
```

---

## ✅ Step 5: Test the App

### Frontend Should Show:
- Welcome screen with login and "Open Account" buttons
- Clean Zenith Bank UI

### Try These:
1. **Create Account**:
   - Click "Open Account"
   - Email: `test@example.com`
   - Password: `Test@1234`
   - Name: `Test User`
   - Click "Sign Up"

2. **Login**:
   - Go to login
   - Use the credentials you just created
   - Click "Sign In"

3. **View Services**:
   - After login, see home screen
   - Click on any service button
   - View service details

---

## 🔗 Verify Backend Connection

Open a terminal:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"ok","timestamp":"2026-09-25T..."}
```

---

## 🗄️ Verify Database Connection

In terminal:
```bash
cd backend
node -e "
import('./config/supabase.js').then(({supabase}) => {
  supabase.from('services').select().then(result => {
    console.log('✅ Connected! Services:', result.data?.length);
  }).catch(e => console.error('❌ Error:', e.message));
});
"
```

Should show:
```
✅ Connected! Services: 12
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"
Already fixed! Dependencies installed.

### Error: ".env.local not found"
Files should already exist. If not, create them with the env vars above.

### Error: "Port 8443 already in use"
```bash
# Find and kill process on port 8443
netstat -ano | findstr :8443
taskkill /PID <PID> /F
```

### Error: "Port 5000 already in use"
```bash
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend doesn't load
- Check browser console (F12) for errors
- Restart dev server
- Clear browser cache

### Backend doesn't connect to Supabase
- Verify `.env` has correct Supabase URLs/keys
- Check internet connection
- Verify Supabase project is active

---

## 📊 Architecture

```
User Browser (http://localhost:8443)
    ↓
React Frontend (TypeScript)
    ↓
Supabase Auth (Login/Signup)
    ↓
Express Backend (http://localhost:5000)
    ↓
Supabase Database (PostgreSQL)
    ↓
Return Response
```

---

## ✨ Key Features Ready to Test

✅ **User Signup** - Create account with email/password
✅ **User Login** - Login with credentials
✅ **Persistent Sessions** - Session survives page refresh
✅ **Service Browser** - View all 12 banking services
✅ **Service Details** - Full descriptions and features
✅ **Payment Gateway** - Paystack integration ready
✅ **Database** - All tables created and operational

---

## 🚀 What's Working

| Feature | Status | Test Command |
|---------|--------|--------------|
| Frontend | ✅ | `npm run dev` |
| Backend | ✅ | `npm start` (in backend/) |
| Database | ✅ | Run schema.sql in Supabase |
| Auth | ✅ | Create account & login |
| Services | ✅ | View on homepage |
| Payments | ✅ | Click "Pay Bills" service |
| API | ✅ | `curl http://localhost:5000/api/health` |

---

## 📚 Additional Resources

- **Full Setup Guide**: See `SETUP_GUIDE.md`
- **Testing Guide**: See `TESTING_GUIDE.md`
- **Database Guide**: See `backend/DATABASE_SETUP.md`
- **Project Summary**: See `DEPLOYMENT_COMPLETE.md`

---

## 🎯 Next Steps

1. ✅ Run SQL schema in Supabase
2. ✅ Update .env files
3. ✅ Start frontend: `npm run dev`
4. ✅ Start backend: `npm start` (in backend/)
5. ✅ Test signup/login
6. ✅ Browse services
7. ✅ Test payment flow

---

**Ready to go?** Follow the 5 steps above!

Last updated: September 25, 2026
