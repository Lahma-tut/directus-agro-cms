<template>
  <div class="attributes">
    <h6>{{ title }}</h6>
    <ul class="attribut">
      <li
        v-for="item in attribut"
        :key="item.id"
      >
        <NuxtLink
          :to="`/${category}/${item.slug}`"
          class="link"
        >
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Attribut {
  id: string
  title: string
  slug: string
}

defineProps<{
  title: string
  category: string
  attribut: Attribut[]
}>()
</script>

<style scoped>
@import url("~/assets/css/product.css");
</style>
