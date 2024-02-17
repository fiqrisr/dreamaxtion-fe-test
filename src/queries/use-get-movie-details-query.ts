import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';

import { MovieService } from '@/services/movie-service';
import type { MovieDetailsResponse } from '@/types';

type UseGetMovieDetailsProps = {
  queryParams: {
    movieId: number;
  };
  options?: Omit<UseQueryOptions<MovieDetailsResponse>, 'queryKey'>;
};

export const useGetMovieDetails = ({ queryParams, options }: UseGetMovieDetailsProps) => {
  return useQuery({
    queryKey: ['movie-details', queryParams],
    queryFn: async () => {
      return await MovieService.getMovieDetails({
        movieId: queryParams?.movieId || null
      });
    },
    ...options
  });
};
