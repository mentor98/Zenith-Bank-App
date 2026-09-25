# Zenith Bank App - Database Setup Guide

## Overview
This guide explains how to set up the PostgreSQL database schema in Supabase for the Zenith Bank application.

## Prerequisites
- Supabase account with project created
- Project ID: `zjwkljoclksytsmhfxeg`
- Access to Supabase SQL Editor

## Setup Steps

### Step 1: Access Supabase SQL Editor
1. Go to https://app.supabase.com
2. Select your project (`zjwkljoclksytsmhfxeg`)
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"

### Step 2: Copy and Execute the Schema
1. Open `backend/database/schema.sql`
2. Copy all the SQL code
3. Paste it into the Supabase SQL Editor
4. Click "Run" to execute

### Step 3: Verify Tables Created
After running the schema, verify all tables were created:
- `auth.users` (already exists in Supabase)
- `public.users`
- `public.accounts`
- `public.transactions`
- `public.payments`
- `public.bills`
- `public.loans`
- `public.services`

You can verify by clicking on the "Table Editor" tab on the left.

## Schema Structure

### Users Table
Extends Supabase's auth.users table with additional profile information:
- `id` - UUID (Primary Key, references auth.users)
- `email` - User email
- `full_name` - Full name
- `phone` - Phone number
- `account_number` - Unique account number
- `avatar_url` - Profile picture URL
- `bvn` - Bank Verification Number (Nigeria)
- `created_at` - Record creation timestamp
- `updated_at` - Last update timestamp

### Accounts Table
Represents user bank accounts:
- `id` - UUID (Primary Key)
- `user_id` - Reference to users table
- `account_type` - 'checking', 'savings', or 'credit'
- `account_number` - Unique account number
- `balance` - Current account balance
- `currency` - Currency code (NGN, USD, etc.)
- `status` - 'active', 'inactive', or 'frozen'

### Transactions Table
Records all account transactions:
- `id` - UUID (Primary Key)
- `account_id` - Reference to accounts table
- `type` - 'debit', 'credit', or 'transfer'
- `amount` - Transaction amount
- `description` - Transaction description
- `recipient` - Recipient name/identifier
- `recipient_account` - Recipient account number
- `status` - 'pending', 'completed', or 'failed'
- `reference` - Unique transaction reference

### Payments Table
Records Paystack payment transactions:
- `id` - UUID (Primary Key)
- `user_id` - Reference to users table
- `account_id` - Optional reference to accounts table
- `amount` - Payment amount
- `currency` - Currency code
- `reference` - Unique payment reference
- `paystack_reference` - Paystack transaction reference
- `status` - 'pending', 'completed', 'failed', or 'cancelled'
- `description` - Payment description
- `metadata` - JSON data for additional info (bill type, etc.)

### Bills Table
Represents utility bills for payment:
- `id` - UUID (Primary Key)
- `user_id` - Reference to users table
- `bill_type` - 'electricity', 'water', 'internet', 'mobile', or 'other'
- `amount` - Bill amount
- `provider` - Service provider name
- `reference_number` - Bill reference number
- `due_date` - Bill due date
- `status` - 'pending', 'paid', or 'overdue'

### Loans Table
Records loan applications:
- `id` - UUID (Primary Key)
- `user_id` - Reference to users table
- `amount` - Loan amount
- `interest_rate` - Annual interest rate
- `term_months` - Loan term in months
- `monthly_payment` - Calculated monthly payment
- `status` - 'pending', 'approved', 'active', 'completed', or 'rejected'
- `purpose` - Loan purpose

### Services Table
Available banking services:
- `id` - UUID (Primary Key)
- `name` - Service name
- `description` - Service description
- `icon_url` - Service icon URL
- `category` - Service category
- `is_active` - Whether service is active

## Row Level Security (RLS)

All tables have RLS enabled with policies that ensure:
- Users can only access their own data
- Admins (via service role) can access all data
- No unauthorized access is possible

### Policies Enabled:
- **Users**: Can read and update their own profile
- **Accounts**: Can read and update their own accounts
- **Transactions**: Can read transactions from their accounts
- **Payments**: Can read and create their own payments
- **Bills**: Can read and create their own bills
- **Loans**: Can read and create their own loan applications

## Default Services

The following services are automatically created:
1. Send Money
2. Mobile Topup
3. Pay Bills
4. Buy Data
5. Request Loan
6. Card Services
7. Investments
8. Lifestyle
9. Insurance
10. Travel
11. Shopping
12. Education

## Environment Variables

Make sure your backend `.env` file has:
```
SUPABASE_URL=https://zjwkljoclksytsmhfxeg.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqd2tsam9jbGtzeXRzbWhmeGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzMjU0OTEsImV4cCI6MjEwNTkwMTQ5MX0.iW4OYV8dZabOtbzcYZsdTZyK4YjhI0Hns6l_iJxpu1E
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqd2tsam9jbGtzeXRzbWhmeGVnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDMyNTQ5MSwiZXhwIjoyMTA1OTAxNDkxfQ.L_4ZjeQ2JyxXk3Oc65x1QfGTZeTImSQ67m24gP1h-40
SUPABASE_JWKS_URL=https://zjwkljoclksytsmhfxeg.supabase.co/auth/v1/.well-known/jwks.json
```

## Testing Database Connection

Run this in your backend to test the connection:
```bash
node -e "
import('./config/supabase.js').then(({supabase}) => {
  supabase.from('services').select().then(result => {
    console.log('Services:', result.data);
  });
});
"
```

## Troubleshooting

### Issue: Permission denied errors
- Make sure you're using the SERVICE_KEY in backend code (for admin operations)
- Use ANON_KEY for frontend (for user operations)

### Issue: RLS policies blocking access
- Ensure the user is authenticated with Supabase
- Verify the JWT token is valid

### Issue: Tables don't appear
- Check the SQL editor output for errors
- Run each section separately if there are conflicts

## Next Steps

1. Update frontend with Supabase client configuration
2. Implement authentication flows
3. Create API endpoints that interact with these tables
4. Test all integrations

## Support

For Supabase documentation: https://supabase.com/docs
For PostgreSQL documentation: https://www.postgresql.org/docs/
