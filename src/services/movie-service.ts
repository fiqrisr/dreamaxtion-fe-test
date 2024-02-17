import { httpClient } from '@/http';
import type { BaseListQueryParams, MovieDetailsResponse, PopularMovieListResponse } from '@/types';

export const MovieService = {
  getPopularMovies: async ({ page = 1 }: BaseListQueryParams) => {
    return await httpClient
      .get<PopularMovieListResponse>('movie/popular', {
        params: {
          page
        }
      })
      .then((res) => res.data);
  },

  getDiscoverMovies: async ({ page = 1 }: BaseListQueryParams) => {
    return await httpClient
      .get<PopularMovieListResponse>('discover/movie', {
        params: {
          page
        }
      })
      .then((res) => res.data);
  },

  getMovieDetails: async ({ movieId }: { movieId: number | null }) => {
    return await httpClient
      .get<MovieDetailsResponse>(`movie/${movieId}`, {
        params: {
          append_to_response: 'credits',
          language: 'en-US'
        }
      })
      .then((res) => res.data);
  },

  searchMovies: async ({ query, page = 1 }: BaseListQueryParams & { query: string }) => {
    return await httpClient
      .get<PopularMovieListResponse>('search/movie', {
        params: {
          query,
          page
        }
      })
      .then((res) => res.data);
  }
};
