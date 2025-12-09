<template>
  <div class="category">
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

console.log('products: ', products)

// Вызываем функцию получения данных
getСategories('category', String(route.params.slug))

const { selectedFilter } = storeToRefs(useCategoryStore())

// url gerbitsidy?culture=tlya&manufacturer=avgust
const params = useUrlSearchParams("history")

watch(selectedFilter, (newFilter) => {
  params.manufacturer = newFilter.manufacturer.map(m => m.slug)
  params.culture = newFilter.culture.map(c => c.slug)
  params.harmful = newFilter.harmful.map(h => h.slug)
}, { deep: true })

/* 
Для чтения url при загрузке
onMounted(() => {
  if (params.manufacturer) {
  selectedFilter.value.manufacturer = 'данные по slugs'
  }
})
*/

/* 
Для чтения параметров из URL при загрузке страницы с использованием useUrlSearchParams и синхронизации их с реактивным состоянием selectedFilter в Nuxt 3 и Vue 3, обычно делают так:

ts
import { onMounted } from 'vue'

onMounted(() => {
  if (params.manufacturer) {
    // params.manufacturer может быть строкой или массивом строк
    const manufacturerSlugs = Array.isArray(params.manufacturer)
      ? params.manufacturer
      : [params.manufacturer]

    // Записываем в selectedFilter.manufacturer массив объектов с такими slug
    // Если нужны другие поля, получите их через API или словарь
    selectedFilter.value.manufacturer = manufacturerSlugs.map(slug => ({ slug }))
  }

  if (params.culture) {
    const cultureSlugs = Array.isArray(params.culture) ? params.culture : [params.culture]
    selectedFilter.value.culture = cultureSlugs.map(slug => ({ slug }))
  }

  if (params.harmful) {
    const harmfulSlugs = Array.isArray(params.harmful) ? params.harmful : [params.harmful]
    selectedFilter.value.harmful = harmfulSlugs.map(slug => ({ slug }))
  }
})
Подробности:
params — реактивный объект из useUrlSearchParams, который получает параметры из URL.
Параметры в URL могут приходить как одиночные значения (строка) или множественные (массив), поэтому используем Array.isArray.
Записываем в selectedFilter массив объектов с ключом slug, как вы храните в state.
При необходимости можно расширять объекты дополнительными данными, подгружая их из API или локальных данных.
Такой код позволяет при загрузке страницы корректно считать фильтры из URL и синхронизировать их с реактивным состоянием в приложении. Это очень удобно для поддержки прямых ссылок с фильтрацией товаров.
*/

useSeoMeta({
  title: `Category ${slugParam}`,
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
