import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: import('@/views/MoviesView.vue')
    },
    {
      path: '/movies/:id',
      name: 'movies-details',
      component: import('@/views/MovieDetailsView.vue')
    },
    {
      path: '/tv-shows',
      name: 'tv-shows',
      component: import('@/views/TVShowsView.vue')
    },
    {
      path: '/tv-shows/:id',
      name: 'tv-show-details',
      component: import('@/views/TVShowDetailsView.vue')
    }
  ]
});

export default router;
