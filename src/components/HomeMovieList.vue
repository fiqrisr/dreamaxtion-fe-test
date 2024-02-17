<script setup lang="ts">
import { NO_IMAGE_POSTER_URL, TMDB_BASE_IMAGE_URL } from '@/configs';
import type { MovieListItem, TVShowsListItem } from '@/types';

defineProps<{
  movieList: MovieListItem[] | TVShowsListItem[];
  isLoading: boolean;
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
  <div class="overflow-x-scroll hide-scroll-bar flex items-center -ml-8 pb-12">
    <div class="flex flex-nowrap gap-6 ml-8">
      <RouterLink
        v-for="movie in movieList"
        :to="`/movies/${movie.id}`"
        :key="movie.id"
        class="group w-64 pt-7 cursor-pointer hover:scale-125 hover:shadow-md bg-white transition-all"
      >
        <img
          class="w-full mb-2"
          :alt="getTitle(movie)"
          :src="
            movie.backdrop_path
              ? `${TMDB_BASE_IMAGE_URL}/w300${movie.backdrop_path}`
              : NO_IMAGE_POSTER_URL
          "
        />
        <div class="group-hover:px-2 transition-all">
          <div class="flex gap-3 items-center text-sm mb-1">
            <p>{{ new Date(getReleaseDate(movie)).getFullYear() }}</p>
            <span>★ {{ movie.vote_average.toFixed(1) }}</span>
            <span v-if="movie.vote_average > 8 && movie.vote_count > 1000" class="text-orange-600"
              >Recommended</span
            >
          </div>
          <h3 class="font-semibold text-lg mb-1">{{ getTitle(movie) }}</h3>
          <p class="line-clamp-3 font-light text-sm">{{ movie.overview }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style>
.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
