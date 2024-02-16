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
  }
]);
</script>

<template>
  <header class="backdrop-blur-md font-mono bg-white/30 shadow-sm sticky top-0 z-50">
    <div class="container mx-auto py-4 flex items-center gap-8">
      <div>
        <RouterLink to="/">
          <div class="text-3xl font-bold text-orange-600">DX Movies</div>
        </RouterLink>
      </div>
      <nav>
        <ul class="flex items-center gap-2">
          <li
            v-for="item in navItems"
            :key="item.key"
            class="nav-link"
            :class="currentRoutePath === item.path ? 'active' : ''"
          >
            <RouterLink :to="item.path">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  @apply px-4 py-1;
}

.active {
  @apply text-orange-600 bg-orange-100 rounded-md;
}
</style>
