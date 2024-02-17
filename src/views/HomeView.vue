<script setup lang="ts">
import HomeMovieList from '@/components/HomeMovieList.vue';
import { useGetPopularMoviesQuery } from '@/queries/use-get-popular-movies-query';
const { isLoading, data } = useGetPopularMoviesQuery({
  queryParams: {
    page: 1
  }
});
</script>

<template>
  <h2 class="text-3xl font-bold">Popular Movies</h2>
  <div>
    <p v-if="isLoading">loading ...</p>

    <HomeMovieList :movie-list="data?.pages[0].results || []" />
  </div>
</template>
