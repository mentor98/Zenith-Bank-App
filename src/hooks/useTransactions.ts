/**
 * useTransactions Hook - Manages transaction operations
 */

import { useState, useCallback } from 'react';
import { transactionAPI, TransferPayload } from '../services/api';

export interface Transaction {
  id: string;
  type: 'transfer' | 'payment' | 'deposit' | 'withdrawal' | 'airtime' | 'bills';
  amount: number;
  recipient?: string;
  description?: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export const useTransactions = () => {
  const [state, setState] = useState<TransactionsState>({
    transactions: [],
    loading: false,
    error: null,
  });

  const getTransactions = useCallback(async (limit: number = 10) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await transactionAPI.getTransactions(limit);
      if (response.success && Array.isArray(response.data)) {
        setState((prev) => ({
          ...prev,
          transactions: response.data,
          loading: false,
        }));
        return { success: true };
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: response.error || 'Failed to fetch transactions',
        }));
        return { success: false };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false };
    }
  }, []);

  const transfer = useCallback(async (payload: TransferPayload) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await transactionAPI.transfer(payload);
      if (response.success) {
        // Refresh transactions
        await getTransactions();
        return { success: true, data: response.data };
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: response.error || 'Transfer failed',
        }));
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, [getTransactions]);

  return {
    ...state,
    getTransactions,
    transfer,
  };
};
