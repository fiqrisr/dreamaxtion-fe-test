<script setup lang="ts">
defineProps<{
  id: number;
  name: string;
  posterPath: string;
  releaseDate: Date;
  vote: string;
}>();
</script>

<template>
  <div
    class="relative w-full h-64 mb-3 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/50 transition-all"
  >
    <img :src="posterPath" :alt="name" class="w-full h-full object-cover" />
  </div>
  <div>
    <div class="flex gap-3 items-center text-sm mb-1">
      <p>{{ releaseDate }}</p>
      <span>★ {{ vote }}</span>
    </div>
    <h3 class="font-semibold text-lg mb-1">{{ name }}</h3>
  </div>
</template>
