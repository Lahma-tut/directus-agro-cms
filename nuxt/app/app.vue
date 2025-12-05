<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const store = useCartStore()

onMounted(() => store.loadLocalStorage()) // Загрузка корзины из localStorage

</script>
