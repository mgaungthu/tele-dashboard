import api from '../api';

/* =========================
 * Types
 * ========================= */

export interface Genre {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
  code: string;
}

export interface City {
  id: number;
  name: string;
  countryId: number;
}

/* =========================
 * Lookups API
 * ========================= */

export const lookupsApi = {
  // 🎵 Genres
  getGenres() {
    return api.get<Genre[]>('/lookups/genres');
  },

  // 🌍 Countries
  getCountries() {
    return api.get<Country[]>('/lookups/countries');
  },

  // 🏙 Cities (optional country filter)
  getCities(countryId?: number) {
    return api.get<City[]>('/lookups/cities', {
      params: countryId ? { country_id: countryId } : undefined,
    });
  },
};