/**
 * Mock API Service - For testing without backend
 * Remove this file once backend is connected
 */

import { UserProfile, TransferPayload, ApiResponse } from './api';

const DEMO_USER: UserProfile = {
  id: '1001',
  name: 'Emmanuel Timothy',
  email: 'emmanuel@zenithbank.com',
  accountNumber: '1234567890',
  balance: 250000,
  phone: '+234 (0) 901 234 5678',
  createdAt: new Date().toISOString(),
};

const DEMO_TRANSACTIONS = [
  {
    id: 'txn001',
    type: 'transfer' as const,
    amount: 50000,
    recipient: 'John Doe',
    description: 'Transfer to John Doe',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'completed' as const,
  },
  {
    id: 'txn002',
    type: 'airtime' as const,
    amount: 2000,
    recipient: '09012345678',
    description: 'Airtime Purchase',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'completed' as const,
  },
  {
    id: 'txn003',
    type: 'deposit' as const,
    amount: 250000,
    description: 'Salary Credit',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: 'completed' as const,
  },
];

export const mockAuthAPI = {
  login: async (payload: { email: string; password: string }): Promise<ApiResponse<{ token: string; user: UserProfile }>> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (payload.email && payload.password) {
      const token = `token_${Date.now()}`;
      localStorage.setItem('authToken', token);
      return {
        success: true,
        data: {
          token,
          user: DEMO_USER,
        },
      };
    }

    return {
      success: false,
      error: 'Invalid credentials',
    };
  },

  signup: async (payload: { email: string; password: string; name: string }): Promise<ApiResponse<{ token: string; user: UserProfile }>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const token = `token_${Date.now()}`;
    localStorage.setItem('authToken', token);

    return {
      success: true,
      data: {
        token,
        user: {
          ...DEMO_USER,
          name: payload.name,
          email: payload.email,
        },
      },
    };
  },

  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (localStorage.getItem('authToken')) {
      return {
        success: true,
        data: DEMO_USER,
      };
    }

    return {
      success: false,
      error: 'Not authenticated',
    };
  },

  logout: () => {
    localStorage.removeItem('authToken');
    return { success: true };
  },
};

export const mockTransactionAPI = {
  getTransactions: async (limit: number = 10): Promise<ApiResponse<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: DEMO_TRANSACTIONS.slice(0, limit),
    };
  },

  transfer: async (payload: TransferPayload): Promise<ApiResponse<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      data: {
        transactionId: `txn_${Date.now()}`,
        amount: payload.amount,
        toAccount: payload.toAccount,
        timestamp: new Date().toISOString(),
      },
    };
  },

  getRecipients: async (): Promise<ApiResponse<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: [
        { id: '1', name: 'John Doe', account: '1234567890' },
        { id: '2', name: 'Jane Smith', account: '0987654321' },
      ],
    };
  },
};

export const mockAccountAPI = {
  getBalance: async (): Promise<ApiResponse<{ balance: number }>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: { balance: DEMO_USER.balance },
    };
  },

  getAccountDetails: async (): Promise<ApiResponse<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: DEMO_USER,
    };
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      data: { ...DEMO_USER, ...data },
    };
  },
};

export const mockServicesAPI = {
  payBills: async (payload: { billerId: string; amount: number }): Promise<ApiResponse<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      data: {
        transactionId: `bill_${Date.now()}`,
        billerId: payload.billerId,
        amount: payload.amount,
        timestamp: new Date().toISOString(),
      },
    };
  },

  buyAirtime: async (payload: { phone: string; amount: number; provider: string }): Promise<ApiResponse<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      data: {
        transactionId: `airtime_${Date.now()}`,
        phone: payload.phone,
        amount: payload.amount,
        provider: payload.provider,
        timestamp: new Date().toISOString(),
      },
    };
  },

  getExchangeRates: async (): Promise<ApiResponse<any>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: {
        NGN_USD: 1500,
        NGN_EUR: 1650,
        NGN_GBP: 1900,
      },
    };
  },
};
