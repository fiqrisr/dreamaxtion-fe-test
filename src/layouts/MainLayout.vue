<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
</script>

<template>
  <AppHeader />
  <main class="relative py-8">
    <div class="container mx-auto">
      <slot></slot>
    </div>
  </main>
</template>
