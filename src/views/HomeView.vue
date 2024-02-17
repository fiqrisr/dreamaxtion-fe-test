<script setup lang="ts">
import HomeMovieList from '@/components/HomeMovieList.vue';
import { useGetPopularMoviesQuery } from '@/queries/use-get-popular-movies-query';
import { useGetPopularTVShowsQuery } from '@/queries/use-get-popular-tv-shows-query';

const { isLoading: moviesLoading, data: moviesData } = useGetPopularMoviesQuery({
  queryParams: {
    page: 1
  }
});

const { isLoading: tvShowsLoading, data: tvShowsData } = useGetPopularTVShowsQuery({
  queryParams: {
    page: 1
  }
});
</script>

<template>
  <section class="mt-4">
    <div class="flex items-center gap-4">
      <h2 class="text-3xl font-bold">Popular Movies</h2>
      <RouterLink
        to="/movies"
        class="text-orange-600 hover:text-orange-800 hover:bg-orange-200 px-3 py-1 rounded-md"
      >
        See all
      </RouterLink>
    </div>
    <div>
      <HomeMovieList :movie-list="moviesData?.pages[0].results || []" :is-loading="moviesLoading" />
    </div>
  </section>

  <section>
    <div class="flex items-center gap-4">
      <h2 class="text-3xl font-bold">Popular TV Shows</h2>
      <RouterLink
        to="/tv-shows"
        class="text-orange-600 hover:text-orange-800 hover:bg-orange-200 px-3 py-1 rounded-md"
      >
        See all
      </RouterLink>
    </div>
    <div>
      <HomeMovieList
        :movie-list="tvShowsData?.pages[0].results || []"
        :is-loading="tvShowsLoading"
      />
    </div>
  </section>
</template>
