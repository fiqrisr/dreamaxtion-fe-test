<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
import HeroImage from '@/components/HeroImage.vue';
import { HERO_IMAGE_SIZE, TMDB_BASE_IMAGE_URL } from '@/configs';
import { useGetDiscoverMoviesQuery } from '@/queries/use-get-discover-movies-query';

const router = useRouter();
const currentRoutePath = computed(() => router.currentRoute.value.path);
const movieForHero = ref(Math.floor(Math.random() * 10));

const { data } = useGetDiscoverMoviesQuery();
</script>

<template>
  <AppHeader />
  <HeroImage
    v-if="currentRoutePath === '/'"
    :image="`${TMDB_BASE_IMAGE_URL}/${HERO_IMAGE_SIZE}${data?.pages[0].results[movieForHero].backdrop_path}`"
    :title="data?.pages[0].results[movieForHero].original_title ?? ''"
    :description="data?.pages[0].results[movieForHero].overview ?? ''"
  />
  <main class="relative py-8">
    <div class="container mx-auto max-w-screen-lg">
      <slot></slot>
    </div>
  </main>

  <footer class="text-center py-10 border-t">Powered by The Movie Database (TMDB)</footer>
</template>
