import { httpClient } from '@/http';
import type {
  BaseListQueryParams,
  PopularTVShowsListResponse,
  TVShowDetailsResponse
} from '@/types';

export const TVShowsService = {
  getPopularTVShows: async ({ page = 1 }: BaseListQueryParams) => {
    return await httpClient
      .get<PopularTVShowsListResponse>('tv/popular', {
        params: {
          page
        }
      })
      .then((res) => res.data);
  },

  getDiscoverTVShows: async ({ page = 1 }: BaseListQueryParams) => {
    return await httpClient
      .get<PopularTVShowsListResponse>('discover/tv', {
        params: {
          page
        }
      })
      .then((res) => res.data);
  },

  getTVShowDetails: async ({ showId }: { showId: number | null }) => {
    return await httpClient
      .get<TVShowDetailsResponse>(`tv/${showId}`, {
        params: {
          language: 'en-US'
        }
      })
      .then((res) => res.data);
  }
};
