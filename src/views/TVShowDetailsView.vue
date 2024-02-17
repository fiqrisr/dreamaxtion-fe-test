<script setup lang="ts">
import { useRoute } from 'vue-router';

import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MovieDetailHero from '@/components/MovieDetailHero.vue';
import SeasonList from '@/components/SeasonList.vue';
import { useGetTVShowDetails } from '@/queries/use-get-tv-show-details-query';

const { params } = useRoute();

const { data, isLoading } = useGetTVShowDetails({
  queryParams: {
    showId: params.id as unknown as number
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
  <section v-if="!isLoading" class="mb-4 mt-8">
    <h2 class="text-3xl font-bold mb-2">Seasons</h2>
    <SeasonList :seasons="data?.seasons || []" />
  </section>
</template>
