<template>
  <div class="card">
    <div class="wrapper">
      <div class="image">
        <img :src="img(rank.image)" alt="rank.title" />
      </div>
      <div class="name">
        <h3>{{ rank.title }}</h3>
        <NuxtLink to="#" class="link">
          Смотреть все
          <span class="icon">
            <i class="pi pi-arrow-right"></i>
          </span>
        </NuxtLink>
      </div>
    </div>
    <div class="categories">
      <ul v-if="rank.categories.length">
        <li v-for="(item, i) in rank.categories" :key="i">
          <NuxtLink :to="`/category/${item.slug}`" class="categories-link">
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Rank {
  id: string
  title: string
  image: string
  categories: Categories[]
}

interface Categories {
  id: string
  slug: string
  title: string
}

defineProps<{
  rank: Rank
}>()

const { getThumbnail: img } = useDirectusFiles()
</script>

<style scoped>
@import url("~/assets/css/catalog.css");
</style>
