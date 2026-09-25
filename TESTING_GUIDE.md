# Zenith Bank App - Testing & Integration Guide

## Testing Checklist

### Phase 1: Environment & Setup ✓

- [ ] Node.js 18+ installed
- [ ] pnpm installed
- [ ] Frontend dependencies installed (`pnpm install`)
- [ ] Backend dependencies installed (`cd backend && pnpm install`)
- [ ] `.env.local` file exists with Supabase/Paystack keys
- [ ] `backend/.env` file exists with all credentials
- [ ] Supabase schema executed (SQL ran in Supabase editor)

### Phase 2: Server Startup Tests

#### Frontend Server
```bash
pnpm dev
```
✓ Should see: "VITE v8.x.x ready in xxx ms"
✓ Should see: "Local: http://localhost:8443/"
✓ Access http://localhost:8443 in browser
✓ Should see Zenith Bank login screen

#### Backend Server
```bash
cd backend
pnpm start
```
✓ Should see: "🚀 Zenith Bank API running on port 5000"

### Phase 3: API Health Checks

#### Test Backend Health Endpoint
```bash
curl http://localhost:5000/api/health
```
Expected Response:
```json
{
  "status": "ok",
  "timestamp": "2026-09-25T10:30:00.000Z"
}
```

#### Test Supabase Connection
```bash
cd backend
node -e "
import('./config/supabase.js').then(({supabase}) => {
  supabase.from('services').select().then(result => {
    if (result.data) console.log('✓ Database connected');
    console.log('Services count:', result.data?.length);
  }).catch(e => console.error('✗ Database error:', e.message));
});
"
```
Expected: Shows number of services (12+)

### Phase 4: Authentication Tests

#### Test 4.1: Frontend Loads
1. Navigate to http://localhost:8443
2. Verify you see:
   - Welcome screen with login section
   - "Open Account" button
   - Login form with email/password fields

#### Test 4.2: Check Session Persistence
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Should see Supabase session data

#### Test 4.3: Signup Flow (Manual)
1. Click "Open Account"
2. Enter:
   - Email: `test@example.com`
   - Password: `Test@1234`
   - Name: `Test User`
   - Phone: `+234801234567`
3. Click "Sign Up"
4. Should redirect to home screen
5. Verify user greeting shows your name

#### Test 4.4: Check User Created in Database
```bash
# In Supabase dashboard:
# 1. Go to Table Editor
# 2. Select "users" table
# 3. Should see your new user record
# 4. Verify: id, email, full_name, phone
```

#### Test 4.5: Login Flow (Manual)
1. Click logout (if logged in)
2. Go back to welcome screen
3. Enter credentials from Test 4.3
4. Click "Sign In"
5. Should redirect to home screen

### Phase 5: Services Navigation Tests

#### Test 5.1: Homepage Display
1. After login, verify homepage shows:
   - Welcome banner with greeting
   - Account balance (if available)
   - 12 service buttons

#### Test 5.2: Service Buttons
Test each service button navigates correctly:
- [ ] Send Money → Service page displays
- [ ] Mobile Topup → Service page displays
- [ ] Pay Bills → Service page displays
- [ ] Buy Data → Service page displays
- [ ] Request Loan → Service page displays
- [ ] Card Services → Service page displays
- [ ] Investments → Service page displays
- [ ] Lifestyle → Service page displays
- [ ] Insurance → Service page displays
- [ ] Travel → Service page displays
- [ ] Shopping → Service page displays
- [ ] Education → Service page displays

#### Test 5.3: Service Details Page
1. Click any service
2. Should show:
   - Service icon
   - Service title
   - Full description
   - List of features (at least 5)
   - Back button

#### Test 5.4: Back Navigation
1. On any service page, click "Back"
2. Should return to home screen

### Phase 6: Payment Integration Tests

#### Test 6.1: Initialize Payment
1. Click "Pay Bills" service
2. Should display:
   - Amount input field
   - Email field (pre-filled)
   - Bill type selector
   - Pay button

#### Test 6.2: Payment Backend Call
Frontend calls backend `POST /api/payments/initialize`

Expected Backend Endpoint Test:
```bash
curl -X POST http://localhost:5000/api/payments/initialize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "amount": 1000,
    "email": "test@example.com",
    "description": "Electricity Bill",
    "billType": "electricity"
  }'
```

Expected Response:
```json
{
  "message": "Payment initialized",
  "authorization_url": "https://checkout.paystack.com/...",
  "access_code": "xxxxx",
  "reference": "zenith_xxx",
  "paymentId": "uuid"
}
```

#### Test 6.3: Paystack Integration
1. Click "Pay Bills"
2. Enter amount: 1000
3. Click "Pay"
4. Should redirect to Paystack payment page
5. On Paystack page, verify:
   - Amount in NGN displayed
   - Your email shown
   - Payment methods available

#### Test 6.4: Payment Verification
After payment on Paystack:
```bash
curl -X POST http://localhost:5000/api/payments/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"reference": "zenith_xxx"}'
```

Expected: Payment status should show as "completed"

### Phase 7: Database Tests

#### Test 7.1: Users Table
```sql
-- In Supabase SQL Editor
SELECT * FROM public.users LIMIT 5;
```
Expected: Shows created user records

#### Test 7.2: Accounts Table
```sql
SELECT * FROM public.accounts WHERE user_id = 'YOUR_USER_ID';
```
Expected: Should have at least 1 checking account

#### Test 7.3: Transactions Table
```sql
SELECT * FROM public.transactions LIMIT 5;
```
Expected: Empty initially, populates after transactions

#### Test 7.4: Payments Table
```sql
SELECT * FROM public.payments LIMIT 5;
```
Expected: Shows initialized/completed payments

#### Test 7.5: Services Table
```sql
SELECT COUNT(*) FROM public.services WHERE is_active = true;
```
Expected: Returns 12 (default services)

### Phase 8: Error Handling Tests

#### Test 8.1: Invalid Credentials
1. Go to login
2. Enter wrong password
3. Should show error message

#### Test 8.2: Network Error
1. Stop backend server
2. Try to access backend endpoint
3. Should show connection error

#### Test 8.3: Invalid Token
Backend test without auth header:
```bash
curl http://localhost:5000/api/auth/profile
```
Expected: 401 Unauthorized

### Phase 9: CORS & Security Tests

#### Test 9.1: CORS Headers
```bash
curl -H "Origin: http://localhost:8443" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS http://localhost:5000/api/auth/login \
  -v
```
Expected: Should see CORS headers in response

#### Test 9.2: Helmet Security Headers
```bash
curl -I http://localhost:5000/api/health
```
Expected: Should see security headers like:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`

### Phase 10: Performance Tests

#### Test 10.1: Frontend Load Time
- Page should load in < 3 seconds
- Check Network tab in DevTools

#### Test 10.2: API Response Time
```bash
time curl http://localhost:5000/api/health
```
Expected: < 100ms response time

#### Test 10.3: Database Query Performance
```sql
EXPLAIN ANALYZE SELECT * FROM public.transactions 
  WHERE account_id = 'xxx' 
  ORDER BY created_at DESC LIMIT 10;
```
Expected: Should use indexes efficiently

## Integration Testing Scenarios

### Scenario 1: Complete User Journey
1. Start at welcome screen
2. Create new account
3. View home screen
4. Browse services
5. Click on a service
6. View service details
7. Logout
8. Login with new credentials
9. Verify account data persists

### Scenario 2: Payment Flow
1. Login
2. Navigate to "Pay Bills"
3. Enter amount (e.g., ₦5,000)
4. Complete payment with Paystack
5. Verify payment record in database
6. Check payment history shows transaction

### Scenario 3: Multi-User Concurrency
1. Open app in incognito window (User A)
2. Open app in normal window (User B)
3. Create different accounts
4. Verify User A can't see User B's data (RLS policies)

## Test Data Seed

```sql
-- Insert test user (run after auth user created)
INSERT INTO public.users (id, email, full_name, phone)
VALUES (
  'auth-user-id-here',
  'test@example.com',
  'Test User',
  '+234801234567'
);

-- Insert test account
INSERT INTO public.accounts (user_id, account_type, balance, account_number)
VALUES (
  'auth-user-id-here',
  'checking',
  50000.00,
  '0123456789'
);

-- Insert test transaction
INSERT INTO public.transactions (account_id, type, amount, description)
VALUES (
  'account-id-here',
  'credit',
  10000.00,
  'Salary deposit'
);
```

## Continuous Integration Checklist

Before pushing to production:

- [ ] All tests passing
- [ ] No console errors in browser
- [ ] No backend errors in terminal
- [ ] Database schema verified
- [ ] Environment variables set correctly
- [ ] HTTPS enabled (for production)
- [ ] Rate limiting configured
- [ ] Error logging set up
- [ ] Backup strategy in place

## Bug Report Template

When finding issues, document:

```markdown
## Bug: [Title]

### Steps to Reproduce
1. 
2. 
3. 

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Error Messages
[Any error messages from console/terminal]

### Environment
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari]
- Frontend Port: [8443]
- Backend Port: [5000]

### Logs
[Paste relevant console/server logs]
```

## Success Criteria

✅ All tests passing
✅ Frontend loads without errors
✅ Backend API responding
✅ Database connected and populated
✅ Supabase auth working
✅ Paystack integration ready
✅ No security warnings
✅ Performance acceptable (< 3s load time)

---

**Testing Date**: September 25, 2026
**Last Updated**: Session start
**Status**: Ready for Phase 1 Testing
