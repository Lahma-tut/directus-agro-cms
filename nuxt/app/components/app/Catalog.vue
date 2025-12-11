<template>
  <div class="catalog">
    <div v-for="item in rankItems">
      <div class="catalog-header">
        <div class="image">
          <img :src="img(item.image)" alt="rank.title" />
        </div>
        <div class="name">
          <h3>{{ item.title }}</h3>
          <NuxtLink to="#" class="link">
            Смотреть все
            <span class="icon">
              <i class="pi pi-arrow-right"></i>
            </span>
          </NuxtLink>
        </div>
      </div>
      <div class="catalog-categories">
        <ul v-if="item.categories.length">
          <li v-for="(el, i) in item.categories" :key="i">
            <NuxtLink :to="`/category/${el.slug}`" class="categories-link">
              {{ el.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getRankItems } = useRankStore()
const { rankItems } = storeToRefs(useRankStore())
// Запрашиваем список для каталога
getRankItems()

const { getThumbnail: img } = useDirectusFiles()
</script>

<style scoped>
.catalog {
  display: grid;
  gap: var(--spacing-xl);
}

@media (width >= 520px) {
  .catalog {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width >= 1100px) {
  .catalog {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.catalog-header {
  position: relative;
  margin-bottom: var(--spacing-lg);
}

.image {
  height: 100%;
  height: 176px;
  display: flex;
}

.image img {
  width: 100%;
  filter: brightness(76%);
  border-radius: 2px;
  object-fit: cover;
}

.name {
  width: 100%;
  height: 100%;
  padding: var(--spacing-3xl) var(--spacing-xl) var(--spacing-xl);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h3 {
  font-size: var(--text-m);
  font-weight: 500;
  letter-spacing: 1px;
  color: white;
  text-transform: uppercase;
  margin: 0;
}

ul,
ul li {
  list-style: none;
}

.link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--p-neutral-50);
  text-transform: uppercase;
  transition: color 0.3s ease-out;
  cursor: pointer;
}

.link:hover {
  color: var(--color-orange);
}

.icon i {
  font-size: var(--spacing-sm);
}

/* categories */
.catalog-categories ul {
  margin-left: var(--spacing-xl);
}

.catalog-categories li {
  margin-bottom: var(--spacing-xxxs);
}

.categories-link {
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  text-decoration-color: var(--p-neutral-300);
  transition: color 0.3s ease-out;
  -webkit-text-decoration-thickness: 1px;
  -webkit-text-decoration-color: #c9c9c9;
}

.categories-link:hover {
  color: var(--color-orange);
}
</style>
