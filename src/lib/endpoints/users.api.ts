import api from '../api';

/* =========================
 * Types
 * ========================= */

export type UserRole = 'admin' | 'user' | 'artist';
export type UserStatus = 'active' | 'blocked';

export interface ArtistProfile {
  id: number;
  artistName: string;
  bio?: string;

  genre?: {
    id: number;
    name: string;
  };

  country?: {
    id: number;
    name: string;
  };

  city?: {
    id: number;
    name: string;
  };
}

export interface User {
  id: number;
  name?: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  artistProfile?: ArtistProfile;
}

/* =========================
 * DTOs
 * ========================= */

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status?: UserStatus;

  artist?: {
    artistName: string;
    genreId?: number;
    countryId?: number;
    cityId?: number;
    bio?: string;
  };
}

export interface UpdateUserPayload {
  name?: string;
  role?: UserRole;
  status?: UserStatus;

  artist?: {
    artistName?: string;
    genreId?: number;
    countryId?: number;
    cityId?: number;
    bio?: string;
  };
}

/* =========================
 * Admin Users API
 * ========================= */

export const usersApi = {
  // 📄 Get users list
  getUsers(params?: {
    role?: UserRole;
    status?: UserStatus;
  }) {
    return api.get<User[]>('/admin/users', { params });
  },

  // 🔍 Get single user detail
  getUser(id: number) {
    return api.get<User>(`/admin/users/${id}`);
  },

  // ➕ Create user (admin)
  createUser(payload: CreateUserPayload) {
    return api.post<User>('/admin/users', payload);
  },

  // ✏️ Update user
  updateUser(id: number, payload: UpdateUserPayload) {
    return api.patch<User>(`/admin/users/${id}`, payload);
  },
};