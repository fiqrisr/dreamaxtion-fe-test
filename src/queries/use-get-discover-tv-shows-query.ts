import { useInfiniteQuery, type UseQueryOptions } from '@tanstack/vue-query';

import { TVShowsService } from '@/services/tv-shows-service';
import type { PopularTVShowsListResponse } from '@/types';

type UseGetDiscoverTVShowsQueryProps = {
  queryParams?: {
    page?: number;
  };
  options?: Omit<UseQueryOptions<PopularTVShowsListResponse>, 'queryKey'>;
};

export const useGetDiscoverTVShowsQuery = ({
  queryParams,
  options
}: UseGetDiscoverTVShowsQueryProps = {}) => {
  return useInfiniteQuery({
    queryKey: ['discover-tv', queryParams],
    queryFn: async ({ pageParam }) => {
      return await TVShowsService.getDiscoverTVShows({
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
