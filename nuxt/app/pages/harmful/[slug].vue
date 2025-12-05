<template>
  <div class="harmful">
    <div class="container">
      <article>
        <Heading
          v-for="item in categories"
          :key="item.id"
          :title="item.title"
          :breadcrumbs="breadcrumbs"
          :quantity="products.length"
        />
        <div class="category-wrapper">
          <aside>
            <Filter 
              :manufacturer="manufacturer" 
              :culture="culture" 
              :harmful="harmful" 
            />
          </aside>
          <section>
            <Transition mode="out-in">
              <Message v-if="loading" severity="success"> Загрузка... </Message>
              <Message v-else-if="error" severity="error">{{ error.message }}</Message>
              <Message v-else-if="!loading && !products.length" severity="info">Товары не найдены!</Message>
              <div v-else-if="products" class="products-list">
                <ProductsList 
                  v-for="product in products" 
                  :key="product.id" 
                  :product 
                  />
              </div>
            </Transition>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import Heading from "~/components/app/Heading.vue"
import ProductsList from "~/components/product/ProductsList.vue"
import Filter from "~/components/app/Filter.vue"
import { storeToRefs } from "pinia"
import { useUrlSearchParams } from "@vueuse/core"

const route = useRoute()
const breadcrumbs = { title: "Каталог"}
const slugParam = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug

// Store Categories
const { getСategories } = useCategoryStore()
const {
  loading,
  error,
  categories,
  manufacturer,
  culture,
  harmful,
  filtered: products
} = storeToRefs(useCategoryStore())

// Вызываем функцию получения данных
getСategories('harmful', String(route.params.slug))

const { selectedFilter } = storeToRefs(useCategoryStore())

// url gerbitsidy?culture=tlya&manufacturer=avgust
const params = useUrlSearchParams('history')

watch(selectedFilter, (newFilter) => {
  params.manufacturer = newFilter.manufacturer.map(m => m.slug)
  params.culture = newFilter.culture.map(c => c.slug)
  params.harmful = newFilter.harmful.map(h => h.slug)
}, { deep: true })

useSeoMeta({
  title: `Harmful ${slugParam}`,
  description: "This is my amazing site, let me tell you all about it.",
})
</script>

<style scoped>
.category-wrapper {
  display: grid;
}

@media (width >= 768px) {
  .category-wrapper {
    grid-template-columns: 254px 1fr;
  }
}
</style>
