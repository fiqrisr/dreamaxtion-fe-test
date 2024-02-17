import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';

import { TVShowsService } from '@/services/tv-shows-service';
import type { TVShowDetailsResponse } from '@/types';

type UseGetTVShowDetailsProps = {
  queryParams: {
    showId: number;
  };
  options?: Omit<UseQueryOptions<TVShowDetailsResponse>, 'queryKey'>;
};

export const useGetTVShowDetails = ({ queryParams, options }: UseGetTVShowDetailsProps) => {
  return useQuery({
    queryKey: ['movie-details', queryParams],
    queryFn: async () => {
      return await TVShowsService.getTVShowDetails({
        showId: queryParams?.showId || null
      });
    },
    ...options
  });
};
