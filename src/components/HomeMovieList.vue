<script setup lang="ts">
import { TMDB_BASE_IMAGE_URL } from '@/configs';
import type { MovieListItem } from '@/types';
import { calcTime } from '@/utils';

defineProps<{
  movieList: MovieListItem[];
}>();
</script>

<template>
  <section class="overflow-x-scroll hide-scroll-bar flex items-center -ml-8">
    <div class="flex flex-nowrap gap-6 ml-8">
      <RouterLink
        v-for="movie in movieList"
        :to="`/movies/${movie.id}`"
        :key="movie.id"
        class="group w-64 pt-7 cursor-pointer hover:scale-125 hover:shadow-xl bg-white transition-all"
      >
        <img
          class="w-full mb-2"
          :alt="movie.original_title"
          :src="`${TMDB_BASE_IMAGE_URL}/w300${movie.backdrop_path}`"
        />
        <div class="group-hover:px-2 transition-all">
          <div class="flex gap-3 items-center text-sm mb-1">
            <p>{{ new Date(movie.release_date).getFullYear() }}</p>
            <span>★ {{ movie.vote_average.toFixed(1) }}</span>
            <span v-if="movie.vote_average > 8 && movie.vote_count > 1000" class="text-orange-600"
              >Recommended</span
            >
          </div>
          <h3 class="font-semibold text-lg mb-1">{{ movie.original_title }}</h3>
          <p class="line-clamp-3 font-light text-sm">{{ movie.overview }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
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
