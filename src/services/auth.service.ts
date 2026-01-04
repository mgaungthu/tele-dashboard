import axios from 'axios';
import { authApi } from '@/lib/endpoints/auth.api';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authService = {
  async login(email: string, password: string) {
    try {
      await authApi.login({ email, password });
      
      return true;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 401) {
          throw new AuthError('Invalid email or password');
        }

        if (status === 403) {
          throw new AuthError('Access denied');
        }

        throw new AuthError(
          err.response?.data?.message || 'Login failed'
        );
      }

      throw new AuthError('Network error');
    }
  },

  async logout() {
    await authApi.logout();
  },

  // With httpOnly cookies, auth state must be verified via backend (/auth/me)
  async isAuthenticated() {
    try {
      await authApi.me();
      return true;
    } catch {
      return false;
    }
  },
};