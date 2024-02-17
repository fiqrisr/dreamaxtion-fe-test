import { useInfiniteQuery, type UseQueryOptions } from '@tanstack/vue-query';

import { MovieService } from '@/services/movie-service';
import type { PopularMovieListResponse } from '@/types';

type UseGetDiscoverMoviesQueryProps = {
  queryParams?: {
    page?: number;
  };
  options?: Omit<UseQueryOptions<PopularMovieListResponse>, 'queryKey'>;
};

export const useGetDiscoverMoviesQuery = ({
  queryParams,
  options
}: UseGetDiscoverMoviesQueryProps = {}) => {
  return useInfiniteQuery({
    queryKey: ['discover-movies', queryParams],
    queryFn: async ({ pageParam }) => {
      return await MovieService.getDiscoverMovies({
        page: pageParam
      });
    },
    initialPageParam: queryParams?.page,
    getNextPageParam: (lastPage) => {
      const nextPageExist = lastPage.page < lastPage.total_pages;
      return nextPageExist ? lastPage.page + 1 : undefined;
    },
    ...options
  });
};
