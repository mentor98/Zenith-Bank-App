import { supabase } from '../lib/supabase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface AuthCredentials {
  email: string;
  password: string;
  full_name?: string;
  phone?: string;
}

interface PaymentInitializePayload {
  amount: number;
  email: string;
  description?: string;
  billType?: string;
}

// Auth API
export const authApi = {
  async signup(credentials: AuthCredentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (!response.ok) throw new Error('Signup failed');
      return await response.json();
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  async getProfile() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) throw new Error('Failed to get profile');
      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  async updateProfile(data: Record<string, unknown>) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return await response.json();
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};

// Transactions API
export const transactionsApi = {
  async getTransactions() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const response = await fetch(`${API_BASE_URL}/transactions`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) throw new Error('Failed to get transactions');
      return await response.json();
    } catch (error) {
      console.error('Get transactions error:', error);
      throw error;
    }
  },

  async createTransaction(data: Record<string, unknown>) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create transaction');
      return await response.json();
    } catch (error) {
      console.error('Create transaction error:', error);
      throw error;
    }
  },

  async getBalance(accountId: string) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const response = await fetch(`${API_BASE_URL}/transactions/balance/${accountId}`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) throw new Error('Failed to get balance');
      return await response.json();
    } catch (error) {
      console.error('Get balance error:', error);
      throw error;
    }
  }
};

// Payments API
export const paymentsApi = {
  async initializePayment(payload: PaymentInitializePayload) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const response = await fetch(`${API_BASE_URL}/payments/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to initialize payment');
      return await response.json();
    } catch (error) {
      console.error('Initialize payment error:', error);
      throw error;
    }
  },

  async verifyPayment(reference: string) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const response = await fetch(`${API_BASE_URL}/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ reference })
      });
      if (!response.ok) throw new Error('Failed to verify payment');
      return await response.json();
    } catch (error) {
      console.error('Verify payment error:', error);
      throw error;
    }
  },

  async getPaymentHistory() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const response = await fetch(`${API_BASE_URL}/payments/history`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (!response.ok) throw new Error('Failed to get payment history');
      return await response.json();
    } catch (error) {
      console.error('Get payment history error:', error);
      throw error;
    }
  }
};

// Database queries (direct Supabase access for read-only data)
export const dbApi = {
  async getServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get services error:', error);
      throw error;
    }
  },

  async getAccounts() {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*');
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get accounts error:', error);
      throw error;
    }
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};
