<script setup lang="ts">
import { useRoute } from 'vue-router';

import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MovieDetailHero from '@/components/MovieDetailHero.vue';
import { MOVIE_POSTER_SIZE, NO_IMAGE_POSTER_PORTRAIT_URL, TMDB_BASE_IMAGE_URL } from '@/configs';
import { useGetMovieDetails } from '@/queries/use-get-movie-details-query';

const { params } = useRoute();

const { data, isLoading } = useGetMovieDetails({
  queryParams: {
    movieId: params.id as unknown as number
  },
  options: {
    enabled: !!params.id
  }
});
</script>

<template>
  <div v-if="isLoading" class="pb-16 pt-5 flex justify-center items-center">
    <LoadingSpinner />
  </div>
  <MovieDetailHero v-if="data" :movieData="data" />
  <section v-if="!isLoading" class="mb-6 mt-8">
    <h2 class="text-3xl font-bold mb-6">Cast</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
      <div v-for="cast in data?.credits.cast" :key="cast.id" class="relative">
        <img
          :src="
            cast.profile_path
              ? `${TMDB_BASE_IMAGE_URL}/${MOVIE_POSTER_SIZE}${cast.profile_path}`
              : NO_IMAGE_POSTER_PORTRAIT_URL
          "
        />
        <div
          class="absolute w-full px-2 bottom-0 text-center text-white backdrop-blur-xl backdrop-saturate-150 subpixel-antialiased z-10 min-h-16"
          :class="{ 'text-black border-t': !cast.profile_path }"
        >
          <h3 class="font-bold pt-1 text-lg">{{ cast.original_name }}</h3>
          <p class="mb-1">{{ cast.character }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
