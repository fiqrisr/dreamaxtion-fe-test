<script setup lang="ts">
import CommonMovieList from '@/components/CommonMovieList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useGetDiscoverMoviesQuery } from '@/queries/use-get-discover-movies-query';

const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
  useGetDiscoverMoviesQuery();
</script>
<template>
  <section>
    <h2 class="text-3xl font-bold mb-8">Discover Movies</h2>
    <div v-if="isLoading" class="pb-16 pt-5 flex justify-center items-center">
      <LoadingSpinner />
    </div>
    <div class="flex flex-col gap-y-8">
      <CommonMovieList
        v-for="movieList in data?.pages"
        :key="movieList.page"
        :movie-list="movieList.results"
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
  </section>
</template>
