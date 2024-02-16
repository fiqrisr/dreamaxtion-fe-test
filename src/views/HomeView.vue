<script setup lang="ts">
import { httpClient } from '@/http';

httpClient.get('movie/popular').then((res) => console.log(res.data));
</script>

<template>
  <h1 class="text-3xl font-bold">Home View</h1>
</template>
