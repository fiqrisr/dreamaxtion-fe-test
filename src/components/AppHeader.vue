<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentRoutePath = computed(() => router.currentRoute.value.path);

const navItems = ref([
  {
    key: 'home',
    path: '/',
    label: 'Home'
  },
  {
    key: 'movies',
    path: '/movies',
    label: 'Movies'
  },
  {
    key: 'tv-shows',
    path: '/tv-shows',
    label: 'TV Shows'
  },
  {
    key: 'search',
    path: '/search',
    label: 'Search'
  },
  {
    key: 'watchlist',
    path: '/watchlist',
    label: 'Watchlist'
  }
]);
</script>

<template>
  <header class="backdrop-blur-md font-mono bg-white/50 shadow-sm sticky top-0 z-50">
    <div class="container mx-auto max-w-screen-lg flex items-center gap-8">
      <div class="bg-orange-600 py-4 px-6">
        <RouterLink to="/">
          <div class="text-3xl font-bold text-white">DX Movies</div>
        </RouterLink>
      </div>
      <nav>
        <ul class="flex items-center gap-2">
          <li v-for="item in navItems" :key="item.key">
            <RouterLink
              :to="item.path"
              class="nav-link hover:bg-orange-50"
              :class="currentRoutePath === item.path ? 'active' : ''"
              >{{ item.label }}</RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  @apply px-4 py-2 rounded-md;
}

.active {
  @apply text-orange-600 bg-orange-100 rounded-md;
}
</style>
