<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { MovieDetailsResponse, TVShowDetailsResponse } from '@/types';

const props = defineProps<{
  type: 'movie' | 'tv-show';
  movieData: MovieDetailsResponse | TVShowDetailsResponse;
}>();

const isSaved = ref(false);

function toggleWatchList() {
  if (props.type === 'movie') {
    const movies = JSON.parse(localStorage.getItem('movies') || '') as MovieDetailsResponse[];
    const savedMovieIndex = movies.findIndex((m) => m.id === props.movieData.id);

    if (savedMovieIndex !== -1) {
      isSaved.value = false;
      movies.splice(savedMovieIndex, 1);
      const newMovieList = [...movies];
      localStorage.setItem('movies', JSON.stringify(newMovieList));
    } else {
      isSaved.value = true;
      const newMovieList = [...movies, { ...props.movieData }];
      localStorage.setItem('movies', JSON.stringify(newMovieList));
    }
  } else if (props.type === 'tv-show') {
    const tvShows = JSON.parse(localStorage.getItem('tv-shows') || '') as TVShowDetailsResponse[];
    const savedMovieIndex = tvShows.findIndex((m) => m.id === props.movieData.id);

    if (savedMovieIndex !== -1) {
      isSaved.value = false;
      tvShows.splice(savedMovieIndex, 1);
      const newTVShowList = [...tvShows];
      localStorage.setItem('tv-shows', JSON.stringify(newTVShowList));
    } else {
      isSaved.value = true;
      const newTVShowList = [...tvShows, { ...props.movieData }];
      localStorage.setItem('tv-shows', JSON.stringify(newTVShowList));
    }
  }
}

onMounted(() => {
  const moviesLS = localStorage.getItem('movies');
  const tvShowsLS = localStorage.getItem('tv-shows');

  if (!moviesLS) localStorage.setItem('movies', '[]');
  if (!tvShowsLS) localStorage.setItem('tv-shows', '[]');

  if (props.type === 'movie') {
    const movies = JSON.parse(moviesLS || '') as MovieDetailsResponse[];
    const savedMovieIndex = movies.findIndex((m) => m.id === props.movieData.id);

    if (savedMovieIndex !== -1) isSaved.value = true;
    else isSaved.value = false;
  } else if (props.type === 'tv-show') {
    const tvShows = JSON.parse(tvShowsLS || '') as TVShowDetailsResponse[];
    const savedMovieIndex = tvShows.findIndex((m) => m.id === props.movieData.id);

    if (savedMovieIndex !== -1) isSaved.value = true;
    else isSaved.value = false;
  }
});
</script>

<template>
  <button
    @click="toggleWatchList"
    class="bg-orange-300 px-3 py-1 rounded text-black cursor-pointer hover:bg-orange-400"
  >
    {{ isSaved ? 'Remove from watchlist' : 'Add to watchlist' }}
  </button>
</template>
