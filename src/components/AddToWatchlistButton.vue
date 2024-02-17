<script setup lang="ts">
defineProps<{
  type: 'movie' | 'tv-show';
  id: number;
}>();
</script>

<template>
  <button class="bg-orange-300 px-3 py-1 rounded text-black cursor-pointer hover:bg-orange-400">
    Add to watchlist
  </button>
</template>
