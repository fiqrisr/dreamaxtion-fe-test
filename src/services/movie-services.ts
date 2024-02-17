import { httpClient } from '@/http';
import type { BaseListQueryParams, PopularMovieListResponse } from '@/types';

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
  }
};
