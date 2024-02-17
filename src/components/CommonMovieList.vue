<script setup lang="ts">
import { MOVIE_POSTER_SIZE, NO_IMAGE_POSTER_PORTRAIT_URL, TMDB_BASE_IMAGE_URL } from '@/configs';
import type { MovieListItem, TVShowsListItem } from '@/types';

import MovieCard from './MovieCard.vue';

defineProps<{
  movieList: MovieListItem[] | TVShowsListItem[];
}>();

function getTitle(item: MovieListItem | TVShowsListItem) {
  if ('original_title' in item) return item.original_title;
  else return item.original_name;
}

function getReleaseDate(item: MovieListItem | TVShowsListItem) {
  if ('release_date' in item) return item.release_date;
  else return item.first_air_date;
}
</script>

<template>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
    <RouterLink v-for="movie in movieList" :to="`/movies/${movie.id}`" :key="movie.id">
      <MovieCard
        :id="movie.id"
        :name="getTitle(movie)"
        :releaseDate="getReleaseDate(movie)"
        :vote="movie.vote_average.toFixed(1)"
        :posterPath="
          movie.poster_path
            ? `${TMDB_BASE_IMAGE_URL}/${MOVIE_POSTER_SIZE}${movie.poster_path}`
            : NO_IMAGE_POSTER_PORTRAIT_URL
        "
      />
    </RouterLink>
  </div>
</template>
