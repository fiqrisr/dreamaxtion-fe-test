<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import CommonMovieList from '@/components/CommonMovieList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { MovieService } from '@/services/movie-service';

const route = useRoute();
const computedQuery = computed(() => route.params.query as string);

const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
  queryKey: ['search-movies', computedQuery],
  queryFn: async ({ pageParam }) => {
    return await MovieService.searchMovies({
      page: pageParam as number,
      query: computedQuery.value || ''
    });
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    const nextPageExist = lastPage.page < lastPage.total_pages;
    return nextPageExist ? lastPage.page + 1 : undefined;
  }
});
</script>

<template>
  <div v-if="isLoading" class="pb-16 pt-5 flex justify-center items-center">
    <LoadingSpinner />
  </div>

  <h1 v-if="data?.pages[0].results.length && !isLoading" class="font-bold text-2xl mb-6">
    Showing results for "{{ route.params.query }}"
  </h1>

  <h1 v-else-if="data?.pages[0].total_results === 0 && !isLoading" class="font-bold text-2xl">
    No results for "{{ route.params.query }}"
  </h1>

  <div class="flex flex-col gap-y-8">
    <CommonMovieList
      v-for="movieList in data?.pages"
      :key="movieList.page"
      :movie-list="movieList.results"
      type="movies"
    />
  </div>
  <div class="flex justify-center items-center mt-12 mb-4">
    <button
      v-if="hasNextPage && !isFetchingNextPage"
      @click="fetchNextPage()"
      class="cursor-pointer bg-neutral-200 px-5 py-2 rounded-md hover:bg-orange-100 hover:text-orange-600"
    >
      Load more
    </button>
    <LoadingSpinner v-else-if="isFetchingNextPage" />
  </div>
</template>
