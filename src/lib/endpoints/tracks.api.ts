import api from '../api';

/* =========================
 * Types
 * ========================= */

export type TrackStatus = 'published' | 'draft' | 'blocked';

export interface Track {
  id: number;
  title: string;
  duration?: string;
  streams: number;
  status: TrackStatus;
  createdAt: string;

  artist?: {
    id: number;
    name: string;
  };

  album?: {
    id: number;
    title: string;
  };
}

/* =========================
 * DTOs
 * ========================= */

export interface CreateTrackPayload {
  title: string;
  artistId: number;
  albumId?: number;
  duration?: string;
  status?: TrackStatus;
}

export interface UpdateTrackPayload {
  title?: string;
  albumId?: number;
  duration?: string;
  status?: TrackStatus;
}

/* =========================
 * Admin Tracks API
 * ========================= */

export const tracksApi = {
  // 📄 Get tracks list
  getTracks(params?: {
    status?: TrackStatus;
    artistId?: number;
    albumId?: number;
  }) {
    return api.get<Track[]>('/tracks', { params });
  },

  // 🔍 Get single track detail
  getTrack(id: number) {
    return api.get<Track>(`/tracks/${id}`);
  },

  // ➕ Create track
  createTrack(payload: CreateTrackPayload) {
    return api.post<Track>('/tracks', payload);
  },

  // ✏️ Update track
  updateTrack(id: number, payload: UpdateTrackPayload) {
    return api.patch<Track>(`/tracks/${id}`, payload);
  },

  // 🗑 Delete track (optional)
  deleteTrack(id: number) {
    return api.delete(`/tracks/${id}`);
  },
};