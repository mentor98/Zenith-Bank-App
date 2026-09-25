# Zenith Bank - Mobile Banking App

A modern, beautiful mobile banking application built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Beautiful UI**: Modern design with smooth animations and gradients
- **Responsive Design**: Optimized for mobile viewing (390px width)
- **TypeScript**: Fully typed codebase for better developer experience
- **Authentication**: Secure login and signup flows
- **Transaction Management**: View and manage transfers, payments, and more
- **Services**: Multiple banking services including airtime, bills, forex, and lifestyle
- **API Ready**: Backend integration ready with service layer

## 🏗️ Project Structure

```
src/
├── App.tsx                 # Main app component with routing
├── main.tsx               # React entry point
├── index.css              # Global styles & Tailwind
├── screens/               # Screen components
│   ├── WelcomeScreen.tsx  # Login/Signup screen
│   ├── HomeScreen.tsx     # Dashboard
│   ├── ProductsServicesScreen.tsx
│   └── LifestyleScreen.tsx
├── services/              # API service layer
│   └── api.ts            # Backend API client
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts        # Authentication hook
│   └── useTransactions.ts # Transaction hook
└── constants/             # Application constants
    └── index.ts
```

## 🔧 Development

### Prerequisites
- Node.js v22+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:8443)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format
```

## 🔌 Backend Integration

The app is configured to connect to a backend API. Configure the API endpoint in your environment:

```env
VITE_API_URL=http://localhost:3000/api
```

### API Endpoints

The app expects the following backend endpoints:

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/profile` - Get user profile
- `POST /auth/logout` - User logout

#### Transactions
- `GET /transactions` - Get transaction history
- `POST /transactions/transfer` - Execute transfer
- `GET /transactions/recipients` - Get saved recipients

#### Account
- `GET /account/balance` - Get account balance
- `GET /account/details` - Get account details
- `PUT /account/profile` - Update profile

#### Services
- `POST /services/pay-bills` - Pay bills
- `POST /services/airtime` - Buy airtime
- `GET /services/forex/rates` - Get exchange rates

## 📱 Usage

### Login
1. Open http://localhost:8443
2. Click "Login" and enter credentials
3. Or click "Open an account" for signup

### Dashboard
- View services grid
- Navigate to Products & Services or Lifestyle
- Logout using the button in header

### Features Ready for Implementation
- ✅ Authentication system
- ✅ Transaction management
- ✅ User profile
- ⏳ Bill payments
- ⏳ Airtime purchase
- ⏳ Forex services
- ⏳ Lifestyle bookings

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **Build**: Vite 8
- **State Management**: React Hooks (ready for Redux/Zustand)
- **HTTP Client**: Fetch API with custom service layer
- **Styling**: Tailwind CSS v4 with custom gradients

## 🎨 Design System

### Colors
- **Primary Red**: #d60a14
- **Secondary Red**: #a00a0f
- **Background**: #f5f6f8
- **Text**: #111215
- **Muted**: #616166

### Typography
- **Font Family**: Inter
- **Font Weights**: 400, 500, 600, 700, 800, 900

## 📚 API Service Layer

The app includes a service layer (`src/services/api.ts`) that handles:
- Base API URL configuration
- Authentication token management
- Error handling
- Request/response formatting
- Type safety with TypeScript

Example usage:
```typescript
import { authAPI } from '@/services/api';

const response = await authAPI.login({
  email: 'user@example.com',
  password: 'password123'
});
```

## 🔐 Security

- Bearer token authentication
- Secure token storage in localStorage
- HTTPS ready (configure in production)
- Input validation ready
- CORS configured for backend

## 📝 Environment Configuration

Create `.env.local` from `.env.example`:
```bash
cp .env.example .env.local
```

Then update with your backend URL and settings.

## 🚀 Deployment

### Production Build
```bash
npm run build
```

This creates an optimized bundle in the `dist/` directory.

### Environment Variables for Production
```env
VITE_API_URL=https://api.zenithbank.com
VITE_LOG_LEVEL=error
VITE_DEBUG_MODE=false
```

## 📖 Usage Examples

### Login
```typescript
const { login } = useAuth();
await login({
  email: 'user@example.com',
  password: 'password'
});
```

### Transfer Money
```typescript
const { transfer } = useTransactions();
await transfer({
  toAccount: '1234567890',
  amount: 10000,
  description: 'Payment for services'
});
```

### Get Transactions
```typescript
const { getTransactions } = useTransactions();
await getTransactions(10); // Get last 10 transactions
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Format code: `npm run format`
4. Submit PR

## 📄 License

MIT License - Feel free to use this project

## 🆘 Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ for beautiful banking experiences
