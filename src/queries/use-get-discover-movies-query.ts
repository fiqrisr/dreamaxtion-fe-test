import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';

import { MovieService } from '@/services/movie-services';
import type { PopularMovieListResponse } from '@/types';

type UseGetDiscoverMoviesQueryProps = {
  options?: Omit<UseQueryOptions<PopularMovieListResponse>, 'queryKey'>;
};

export const useGetDiscoverMoviesQuery = ({ options }: UseGetDiscoverMoviesQueryProps = {}) => {
  return useQuery({
    queryKey: ['discover-movies'],
    queryFn: async () => {
      return await MovieService.getDiscoverMovies();
    },
    ...options
  });
};
