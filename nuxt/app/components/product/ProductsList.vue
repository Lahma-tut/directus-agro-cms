<template>
  <div class="products-block">
    <div class="image">
        <span v-if="isLoading">Loading</span>
        <Image v-else :src="avatarUrl" alt="product.title" width="100" preview />
    </div>
    <div class="content">
      <NuxtLink :to="`/catalog/${product.slug}`">
        <h3>{{ props.product.title }}</h3>
      </NuxtLink>
      <div class="content-column">
        <p class="description">{{ props.product.description }}</p>
        <div class="price">{{ Number(props.product.price).toLocaleString() }} ₽</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImage } from '@vueuse/core'
import type { TProducts } from '~/type/product'

const props = defineProps<{ 
  product: TProducts 
}>()

const { getThumbnail: img } = useDirectusFiles()
const avatarUrl = img(props.product.image)
const { isLoading } = useImage({ src: avatarUrl })

</script>

<style scoped>
.products-block {
  display: grid;
  grid-template-columns: 6.25rem auto;
  gap: var(--spacing-m);
  padding: var(--spacing-xs);
  transition: background-color 0.5s ease-out;
  cursor: pointer;
}

/* @media (width <= 640px) {
  .product-list {
    grid-template-columns: 1fr 1fr;
  }
} */

.products-block:hover {
  border-radius: 2px;
  background-color: var(--p-neutral-100);
}

.content-column {
  display: flex;
  align-items: center;
  gap: var(--spacing-m);
}

.description {
  flex: 1 1 auto;
}

.price {
  flex: 1 0 auto;
  color: var(--color-green);
}

@media (width <= 640px) {
  .content-column {
    flex-direction: column;
    align-items: flex-start;
  }
}

h3 {
  font-size: var(--text-lg);
  margin: 0 0 var(--spacing-xxs) 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
