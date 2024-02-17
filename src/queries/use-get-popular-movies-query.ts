import { useInfiniteQuery } from '@tanstack/vue-query';

import { MovieService } from '@/services/movie-service';

type UseGetPopularMoviesQueryProps = {
  queryParams?: {
    page?: number;
  };
};

export const useGetPopularMoviesQuery = ({ queryParams }: UseGetPopularMoviesQueryProps = {}) => {
  return useInfiniteQuery({
    queryKey: ['popular-movies', queryParams],
    queryFn: async ({ pageParam }) => {
      return await MovieService.getPopularMovies({ page: pageParam });
    },
    initialPageParam: queryParams?.page,
    getNextPageParam: (lastPage) => {
      const nextPageExist = lastPage.page < lastPage.total_pages;
      return nextPageExist ? lastPage.page + 1 : undefined;
    }
  });
};
