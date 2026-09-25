/**
 * API Service - Central point for all backend communication
 * Configured to work with the JavaScript backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TransferPayload {
  toAccount: string;
  amount: number;
  description?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  balance: number;
  phone: string;
  createdAt: string;
}

/**
 * Fetch helper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `HTTP Error: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Authentication endpoints
 */
export const authAPI = {
  login: async (payload: LoginPayload) => {
    const response = await fetchApi<{ token: string; user: UserProfile }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

    if (response.success && response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response;
  },

  signup: async (payload: LoginPayload & { name: string }) => {
    return fetchApi<{ token: string; user: UserProfile }>(
      '/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
  },

  logout: () => {
    localStorage.removeItem('authToken');
    return { success: true };
  },

  getProfile: () => fetchApi<UserProfile>('/auth/profile'),
};

/**
 * Transaction endpoints
 */
export const transactionAPI = {
  getTransactions: (limit: number = 10) =>
    fetchApi(`/transactions?limit=${limit}`),

  transfer: (payload: TransferPayload) =>
    fetchApi('/transactions/transfer', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getRecipients: () => fetchApi('/transactions/recipients'),
};

/**
 * Account endpoints
 */
export const accountAPI = {
  getBalance: () => fetchApi<{ balance: number }>('/account/balance'),

  getAccountDetails: () => fetchApi<any>('/account/details'),

  updateProfile: (data: Partial<UserProfile>) =>
    fetchApi('/account/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

/**
 * Services endpoints
 */
export const servicesAPI = {
  payBills: (payload: { billerId: string; amount: number }) =>
    fetchApi('/services/pay-bills', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  buyAirtime: (payload: { phone: string; amount: number; provider: string }) =>
    fetchApi('/services/airtime', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getExchangeRates: () => fetchApi('/services/forex/rates'),
};

export default {
  authAPI,
  transactionAPI,
  accountAPI,
  servicesAPI,
};
