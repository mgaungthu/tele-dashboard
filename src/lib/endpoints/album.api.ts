import api from '../api';

/* =========================
 * Types
 * ========================= */

export type AlbumStatus = 'published' | 'draft' | 'blocked';
export type AlbumType = 'album' | 'ep' | 'single';

export interface Album {
  id: number;
  title: string;
  type: AlbumType;
  status: AlbumStatus;
  releaseDate?: string;
  coverImage?: string;
  createdAt: string;

  artist?: {
    id: number;
    name: string;
  };

  tracksCount?: number;
}

/* =========================
 * DTOs
 * ========================= */

export interface CreateAlbumPayload {
  title: string;
  artistId: number;
  type?: AlbumType;
  releaseDate?: string;
  status?: AlbumStatus;
  coverImage?: string;
}

export interface UpdateAlbumPayload {
  title?: string;
  type?: AlbumType;
  releaseDate?: string;
  status?: AlbumStatus;
  coverImage?: string;
}

/* =========================
 * Admin Albums API
 * ========================= */

export const albumsApi = {
  /**
   * 📄 Get albums list
   */
  getAlbums(params?: {
    artistId?: number;
    status?: AlbumStatus;
    type?: AlbumType;
  }) {
    return api.get<Album[]>('/albums', { params });
  },

  /**
   * 🔍 Get single album detail
   */
  getAlbum(id: number) {
    return api.get<Album>(`/albums/${id}`);
  },

  /**
   * ➕ Create album
   */
  createAlbum(payload: CreateAlbumPayload) {
    return api.post<Album>('/albums', payload);
  },

  /**
   * ✏️ Update album
   */
  updateAlbum(id: number, payload: UpdateAlbumPayload) {
    return api.patch<Album>(`/albums/${id}`, payload);
  },

  /**
   * 🗑 Delete album
   */
  deleteAlbum(id: number) {
    return api.delete(`/albums/${id}`);
  },
};