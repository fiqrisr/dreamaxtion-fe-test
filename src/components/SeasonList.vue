<script setup lang="ts">
import dayjs from 'dayjs';

import { MOVIE_POSTER_SIZE, NO_IMAGE_POSTER_PORTRAIT_URL, TMDB_BASE_IMAGE_URL } from '@/configs';
import type { Season } from '@/types';

defineProps<{
  seasons: Season[];
}>();
</script>

<template>
  <div v-for="season in seasons" :key="season.id" class="border-b flex py-8 gap-x-8">
    <div class="shrink-0">
      <img
        class="w-32"
        :src="
          season.poster_path
            ? `${TMDB_BASE_IMAGE_URL}/${MOVIE_POSTER_SIZE}${season.poster_path}`
            : NO_IMAGE_POSTER_PORTRAIT_URL
        "
      />
    </div>
    <div class="flex grow-0 items-start flex-col justify-center">
      <h3 class="font-bold text-2xl">{{ season.name }}</h3>
      <div class="font-medium mb-2">
        <span v-if="season.vote_average" class="bg-orange-200 rounded px-1"
          >★ {{ season.vote_average.toFixed(1) }}</span
        >
        <span v-if="season.vote_average" class="px-2">•</span>
        <span>{{ dayjs(season.air_date).year() }}</span>
        <span class="px-2">•</span>
        <span
          >{{ season.episode_count }} {{ season.episode_count > 1 ? 'Episodes' : 'Episode' }}</span
        >
      </div>
      <p>
        Season {{ season.season_number }} premiered on
        {{ dayjs(season.air_date).format('DD MMMM YYYY') }}.
      </p>
      <p v-if="season.overview" class="mt-3">{{ season.overview }}</p>
    </div>
  </div>
</template>
