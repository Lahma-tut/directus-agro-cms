<template>
  <div class="ingredient">
    <h6>{{ props.title }}</h6>
    <div class="ingredient-wrapper">
      <ul class="ingredient-unit">
        <li v-for="item in props.unit" :key="item.id">
          <p>{{ item.value }} {{ item.unit }}</p>
        </li>
      </ul>
      <ul class="ingredient-title">
        <li v-for="item in props.elements" :key="item.id">
          <NuxtLink :to="`/${category}/${item.slug}`" class="link">
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  category?: string
  elements?: any
  unit?: any
}>()
</script>

<style scoped>
@import url("~/assets/css/product.css");
</style>
