import { useInfiniteQuery } from '@tanstack/vue-query';

import { TVShowsService } from '@/services/tv-shows-service';

type UseGetPopularTVShowsQueryProps = {
  queryParams?: {
    page?: number;
  };
};

export const useGetPopularTVShowsQuery = ({ queryParams }: UseGetPopularTVShowsQueryProps = {}) => {
  return useInfiniteQuery({
    queryKey: ['popular-tv-shows', queryParams],
    queryFn: async ({ pageParam }) => {
      return await TVShowsService.getPopularTVShows({ page: pageParam });
    },
    initialPageParam: queryParams?.page,
    getNextPageParam: (lastPage) => {
      const nextPageExist = lastPage.page < lastPage.total_pages;
      return nextPageExist ? lastPage.page + 1 : undefined;
    }
  });
};
