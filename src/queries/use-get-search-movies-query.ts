import { useInfiniteQuery, type UseQueryOptions } from '@tanstack/vue-query';

import { MovieService } from '@/services/movie-service';
import type { PopularMovieListResponse } from '@/types';

type UseGetSearchMoviesQueryProps = {
  queryParams?: {
    page?: number;
    query: string;
  };
  options?: Omit<UseQueryOptions<PopularMovieListResponse>, 'queryKey'>;
};

export const useGetSearchMoviesQuery = ({
  queryParams,
  options
}: UseGetSearchMoviesQueryProps = {}) => {
  return useInfiniteQuery({
    queryKey: ['search-movies', queryParams],
    queryFn: async ({ pageParam }) => {
      return await MovieService.searchMovies({
        page: pageParam,
        query: queryParams?.query ?? ''
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPageExist = lastPage.page < lastPage.total_pages;
      return nextPageExist ? lastPage.page + 1 : undefined;
    },
    ...options
  });
};
