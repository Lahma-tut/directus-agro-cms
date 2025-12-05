<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})
</script>


<template>
  <div>
    <h1>{{ error?.statusCode }}</h1>
    <p>{{ error?.statusMessage }}</p>
    <NuxtLink to="/">
      Go home
    </NuxtLink>
  </div>
</template>