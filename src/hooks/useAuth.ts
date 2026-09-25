/**
 * useAuth Hook - Manages authentication state and operations
 */

import { useState, useCallback } from 'react';
import { authAPI, LoginPayload, UserProfile } from '../services/api';

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: !!localStorage.getItem('authToken'),
    user: null,
    loading: false,
    error: null,
  });

  const login = useCallback(async (payload: LoginPayload) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authAPI.login(payload);
      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          isAuthenticated: true,
          user: response.data.user,
          loading: false,
        }));
        return { success: true };
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: response.error || 'Login failed',
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
  }, []);

  const signup = useCallback(async (payload: LoginPayload & { name: string }) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authAPI.signup(payload);
      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          isAuthenticated: true,
          user: response.data.user,
          loading: false,
        }));
        return { success: true };
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: response.error || 'Signup failed',
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
  }, []);

  const logout = useCallback(() => {
    authAPI.logout();
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  }, []);

  const fetchProfile = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await authAPI.getProfile();
      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          user: response.data,
          loading: false,
        }));
        return { success: true };
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: response.error,
        }));
        return { success: false };
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error fetching profile',
      }));
      return { success: false };
    }
  }, []);

  return {
    ...state,
    login,
    signup,
    logout,
    fetchProfile,
  };
};
