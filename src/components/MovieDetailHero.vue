<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, ref, watch } from 'vue';

import AddToWatchListButton from '@/components/AddToWatchlistButton.vue';
import { HERO_IMAGE_SIZE, MOVIE_POSTER_SIZE, TMDB_BASE_IMAGE_URL } from '@/configs';
import type { MovieDetailsResponse, TVShowDetailsResponse } from '@/types';
import { calcTime, getImageDominantColor } from '@/utils';

const props = defineProps<{
  movieData: MovieDetailsResponse | TVShowDetailsResponse;
}>();

const backdropImageDominantColor = ref<[number, number, number]>([0, 0, 0]);
const movieContainerDominantColorClasses = ref('!text-white');

function getTitle() {
  if ('original_title' in props.movieData) return props.movieData.original_title;
  else return props.movieData.original_name;
}

function getReleaseDate() {
  if ('release_date' in props.movieData) return props.movieData.release_date;
  else return props.movieData.first_air_date;
}

function getRuntime() {
  if ('runtime' in props.movieData) return props.movieData.runtime;
  else return null;
}

const movieBackdropUrl = computed(
  () => `${TMDB_BASE_IMAGE_URL}/${HERO_IMAGE_SIZE}${props.movieData.backdrop_path}`
);
const moviePosterUrl = computed(
  () => `${TMDB_BASE_IMAGE_URL}/${MOVIE_POSTER_SIZE}${props.movieData.poster_path}`
);
const movieDirector = computed(
  () =>
    'credits' in props.movieData &&
    props.movieData.credits?.crew.find((c) => c.job === 'Director')?.original_name
);
const movieScreenplay = computed(
  () =>
    'credits' in props.movieData &&
    props.movieData?.credits?.crew.find((c) => c.job === 'Screenplay')?.original_name
);

function generateMovieGenres() {
  return props.movieData.genres.map((genre) => genre.name).join(', ');
}

watch(
  () => movieBackdropUrl,
  async () => {
    const dominantColor = await getImageDominantColor(movieBackdropUrl.value);

    if (dominantColor) {
      const [r, g, b] = dominantColor.value;
      backdropImageDominantColor.value = [r, g, b];

      if (dominantColor.isLight) {
        movieContainerDominantColorClasses.value = '!text-black';
      }
    }
  }
);
</script>

<template>
  <div
    class="w-full bg-auto bg-no-repeat bg-center overflow-hidden"
    :style="{ backgroundImage: `url(${movieBackdropUrl})` }"
  >
    <div
      class="p-12 backdrop-blur"
      :style="{
        background: `rgba(${[...backdropImageDominantColor, 0.7]})`
      }"
    >
      <div class="flex flex-col md:flex-row gap-8">
        <div class="grow-0 shrink-0 self-center">
          <img class="w-64 shadow-2xl" :src="moviePosterUrl" :alt="`${getTitle()} poster`" />
        </div>

        <div class="py-4 w-full" :class="movieContainerDominantColorClasses">
          <div class="flex gap-x-3 justify-between items-center">
            <h1 class="text-3xl font-bold mb-1">
              {{ getTitle() }}
              <span class="font-normal"> ({{ dayjs(getReleaseDate()).year() }}) </span>
            </h1>

            <AddToWatchListButton type="movie" :id="movieData.id" />
          </div>

          <p>
            <span>{{ dayjs(getReleaseDate()).format('DD/MM/YYYY') }}</span>
            <span class="px-2">•</span>

            <span>{{ generateMovieGenres() }}</span>

            <span v-if="getRuntime() !== null">
              <span class="px-2">•</span>
              <span>{{ calcTime(getRuntime()!) }}</span>
            </span>
          </p>

          <p class="font-bold text-xl mt-8 mb-2">Overview</p>

          <p>{{ movieData.overview }}</p>

          <div
            className="flex flex-col md:flex-row gap-y-6 gap-x-32 mt-8"
            v-if="'credits' in movieData"
          >
            <div v-if="movieDirector">
              <p className="font-bold">{{ movieDirector }}</p>
              <p>Director</p>
            </div>
            <div v-if="movieScreenplay">
              <p className="font-bold">{{ movieScreenplay }}</p>
              <p>Screenplay</p>
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row gap-y-6 gap-x-32 mt-8"
            v-if="'number_of_seasons' in movieData"
          >
            <div v-if="'number_of_seasons' in movieData">
              <p className="font-bold">{{ movieData.number_of_seasons }}</p>
              <p>Seasons</p>
            </div>
            <div v-if="'number_of_episodes' in movieData">
              <p className="font-bold">{{ movieData.number_of_episodes }}</p>
              <p>Episodes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
