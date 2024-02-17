<script setup lang="ts">
import { onMounted, ref } from 'vue';

import CommonMovieList from '@/components/CommonMovieList.vue';

const movies = ref([]);
const tvShows = ref([]);

onMounted(() => {
  const moviesLS = JSON.parse(localStorage.getItem('movies') || '');
  const tvShowsLS = JSON.parse(localStorage.getItem('tv-shows') || '');

  movies.value = moviesLS;
  tvShows.value = tvShowsLS;
});
</script>

<template>
  <h1 class="text-3xl font-bold mb-4">Your Watchlist</h1>
  <div v-if="movies.length === 0 && tvShows.length === 0">Empty watchlist</div>

  <section v-if="movies.length" class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Movies</h2>
    <CommonMovieList :movie-list="movies" type="movies" />
  </section>
  <section v-if="tvShows.length" class="mt-8">
    <h2 class="text-2xl font-bold mb-4">TV Shows</h2>
    <CommonMovieList :movie-list="tvShows" type="tv-shows" />
  </section>
</template>
