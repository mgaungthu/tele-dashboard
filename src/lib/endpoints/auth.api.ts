import api from '../api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export const authApi = {
  login(payload: LoginPayload) {
    return api.post<LoginResponse>('/auth/login', payload);
  },

  me() {
    return api.get('/auth/me');
  },

  logout() {
    return api.post('/auth/logout');
  },
};