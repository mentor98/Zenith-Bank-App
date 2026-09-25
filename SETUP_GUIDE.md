# Zenith Bank App - Complete Setup Guide

## Project Overview

Zenith Bank App is a full-stack banking application with:
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js (JavaScript)
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth with JWT
- **Payments**: Paystack integration

## Prerequisites

- Node.js 18+ and pnpm installed
- Supabase account with project created
- Paystack account with live keys
- Git installed

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/mentor98/Zenith-Bank-App.git
cd Zenith-Bank-App
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
pnpm install

# The dev server should already be running on port 8443
# If not, start it:
pnpm dev
```

**Frontend runs on**: http://localhost:8443

### 3. Backend Setup

```bash
cd backend

# Install backend dependencies
pnpm install

# Start the backend server
pnpm start
# OR for development with auto-reload:
pnpm dev
```

**Backend runs on**: http://localhost:5000

### 4. Database Setup

#### Step 1: Access Supabase SQL Editor
1. Go to https://app.supabase.com
2. Select project: `zjwkljoclksytsmhfxeg`
3. Click "SQL Editor" in left sidebar
4. Click "New Query"

#### Step 2: Execute Schema
1. Open `backend/database/schema.sql`
2. Copy all the SQL code
3. Paste into Supabase SQL Editor
4. Click "Run"

#### Step 3: Verify Tables
Go to "Table Editor" and verify these tables exist:
- `auth.users` (Supabase auth)
- `public.users`
- `public.accounts`
- `public.transactions`
- `public.payments`
- `public.bills`
- `public.loans`
- `public.services`

## Environment Variables

### Frontend (.env.local)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_API_BASE_URL=http://localhost:5000/api
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key_here
```

### Backend (backend/.env)
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

⚠️ **IMPORTANT**: Replace the placeholder values with your actual credentials from Supabase and Paystack. Never commit real credentials to version control.

## Project Structure

```
Zenith-Bank-App/
├── src/                          # Frontend (TypeScript + React)
│   ├── lib/
│   │   └── supabase.ts          # Supabase client config
│   ├── services/
│   │   └── api.ts               # API integration layer
│   ├── screens/                 # React screens/pages
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles + Tailwind
├── backend/                      # Backend (Node.js + Express)
│   ├── config/
│   │   └── supabase.js          # Supabase server config
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── payments.js          # Payment endpoints (Paystack)
│   │   └── transactions.js      # Transaction endpoints
│   ├── database/
│   │   ├── schema.sql           # PostgreSQL schema
│   │   └── init.js              # Database init script
│   ├── server.js                # Express server
│   ├── package.json             # Backend dependencies
│   └── .env                     # Backend environment variables
├── .env.local                    # Frontend environment variables
├── package.json                  # Frontend dependencies
└── index.html                    # Vite HTML shell
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/balance/:accountId` - Get account balance

### Payments (Paystack)
- `POST /api/payments/initialize` - Initialize payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Get payment history
- `POST /api/payments/webhook` - Paystack webhook

### Health
- `GET /api/health` - Health check

## Testing the Integration

### 1. Test Frontend
- Navigate to http://localhost:8443
- You should see the Zenith Bank login screen
- Services are displayed as buttons

### 2. Test Backend Health
```bash
curl http://localhost:5000/api/health
# Expected response: {"status":"ok","timestamp":"2026-09-25T..."}
```

### 3. Test Supabase Connection
```bash
# In backend directory
node -e "
import('./config/supabase.js').then(({supabase}) => {
  supabase.from('services').select().then(result => {
    console.log('Connected! Services:', result.data?.length);
  });
});
"
```

### 4. Test Authentication Flow
1. Frontend: Click "Open Account"
2. Sign up with email/password
3. Backend verifies credentials with Supabase
4. User profile created in database
5. JWT token issued
6. Frontend redirects to dashboard

### 5. Test Payment Flow
1. Click on "Pay Bills" or any payment service
2. Enter amount and bill details
3. Frontend calls `/api/payments/initialize`
4. Backend initializes Paystack transaction
5. User redirected to Paystack payment page
6. After payment, frontend calls `/api/payments/verify`
7. Backend confirms with Paystack
8. Payment record updated in database

## Troubleshooting

### Frontend Issues

**"Cannot find module '@supabase/supabase-js'"**
```bash
cd Zenith-Bank-App
pnpm install
```

**Environment variables not loading**
- Ensure `.env.local` exists in project root
- Restart dev server after creating/modifying `.env.local`
- Check variable names start with `VITE_`

**Port 8443 already in use**
```bash
# Kill process on port 8443
# Windows:
netstat -ano | findstr :8443
taskkill /PID <PID> /F
```

### Backend Issues

**"Cannot find module 'express'"**
```bash
cd backend
pnpm install
```

**Backend not connecting to Supabase**
- Verify `backend/.env` has correct Supabase keys
- Check internet connection
- Verify Supabase project is active

**Port 5000 already in use**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Database Issues

**"relation 'public.users' does not exist"**
- Schema SQL hasn't been executed
- Go to Supabase SQL Editor and run `backend/database/schema.sql`

**"permission denied" errors**
- Using wrong API key (should use SERVICE_KEY for backend)
- RLS policies may be blocking access
- Check Supabase project RLS settings

## Deployment

### Frontend Deployment (Vercel)
```bash
# Build
pnpm build

# Deploy
vercel
```

### Backend Deployment (Railway/Render)
```bash
cd backend

# Build
pnpm install

# Deploy with environment variables
# Set these in platform settings:
# - SUPABASE_URL
# - SUPABASE_SERVICE_KEY
# - PAYSTACK_SECRET_KEY
# - etc.
```

## Development Workflow

1. **Start frontend dev server**
   ```bash
   pnpm dev
   ```

2. **Start backend server (in another terminal)**
   ```bash
   cd backend
   pnpm dev
   ```

3. **Edit files** - Both servers have hot reload

4. **Test locally** - Frontend at http://localhost:8443, Backend at http://localhost:5000

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feature: description"
   git push origin main
   ```

## Security Notes

⚠️ **IMPORTANT**: The Supabase keys and Paystack keys in `.env.local` are currently visible. For production:

1. **Use environment secrets** - Never commit `.env` files with real keys
2. **Backend keys only** - SERVICE_KEY should only be in `backend/.env`
3. **Frontend keys only** - ANON_KEY with restricted RLS policies
4. **Rotate keys regularly** - In Supabase project settings
5. **Use different keys for dev/prod** - Create separate Supabase projects

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Paystack Docs**: https://paystack.com/developers
- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **PostgreSQL Docs**: https://www.postgresql.org/docs

## Next Steps

1. ✅ Complete database schema setup (schema.sql)
2. ✅ Deploy backend to production
3. ✅ Deploy frontend to production
4. ✅ Set up CI/CD pipeline
5. ✅ Add more services and features
6. ✅ Implement advanced analytics
7. ✅ Add mobile app support

---

**Last Updated**: September 25, 2026
**Repository**: https://github.com/mentor98/Zenith-Bank-App
