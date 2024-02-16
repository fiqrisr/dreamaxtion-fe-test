<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <div
    :style="{
      background: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0.65) 100%
      ),
      url(${image})`
    }"
    class="hero-image mx-auto"
  >
    <div class="container mx-auto max-w-screen-lg text-white relative min-h-full">
      <div class="absolute bottom-16">
        <div class="text-5xl font-bold mb-4">{{ title }}</div>
        <p class="text-xl font-medium">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-image {
  background-size: 100%, cover !important;
  background-position: center !important;
  height: 600px;
  position: relative;
  animation: animateHeroImage 1s;
}

@keyframes animateHeroImage {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
