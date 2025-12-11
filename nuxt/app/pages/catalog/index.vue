<template>
  <div class="catalog">
    <div class="container">
      <article>
        <Heading 
          title="Каталог" 
          :quantity="data?.length"
          />
        <div class="wrapper-catalog">
          <aside>
            <div v-if="selectedFilter.manufacturer.length || selectedFilter.culture.length || selectedFilter.harmful.length" class="choose">
              <h5>Ваш выбор</h5>
              <ul v-if="selectedFilter.manufacturer.length">
                <li v-for="item in selectedFilter.manufacturer" :key="item.id">
                  {{ item}}
                  <span @click="resetFilter(item.id)">x</span>
                </li>
              </ul>
              <ul v-if="selectedFilter.culture.length">
                <li v-for="item in selectedFilter.culture" :key="item.id">
                  {{ item }}
                  <span>x</span>
                </li>
              </ul>
              <ul v-if="selectedFilter.harmful.length">
                <li v-for="item in selectedFilter.harmful">
                  {{ item }}
                  <span>x</span>
                </li>
              </ul>
            </div>
            <h5>Производитель</h5>
            <ul v-if="manufacturer">
              <li v-for="item of manufacturer" :key="item.id">
                <Checkbox
                  v-model="selectedFilter.manufacturer"
                  name="manufacturer"
                  :inputId="item.slug"
                  :value="item.id"
                />
                <label :for="item.slug">{{ item.title }}</label>
              </li>
            </ul>
            <h5>Культура</h5>
            <ul v-if="culture">
              <li v-for="item of culture" :key="item.id">
                <Checkbox
                  v-model="selectedFilter.culture"
                  name="culture"
                  :inputId="item.slug"
                  :value="item.id"
                />
                <label :for="item.slug">{{ item.title }}</label>
              </li>
            </ul>
            <h5>Культура</h5>
            <ul v-if="harmful">
              <li v-for="item of harmful" :key="item.id">
                <Checkbox
                  v-model="selectedFilter.harmful"
                  name="harmful"
                  :inputId="item.slug"
                  :value="item.id"
                />
                <label :for="item.slug">{{ item.title }}</label>
              </li>
            </ul>
          </aside>
          <section>
            <Transition mode="out-in">
              <Message v-if="loading" class="store-message" severity="success">Загрузка...</Message>
              <Message v-else-if="error" severity="error">{{error?.message || "Ошибка загрузки"}}</Message>
              
              <!-- Есть отфильтрованные товары -->
              <div v-else-if="!loading && data?.length" class="catalog-products">
                <ProductsList v-for="product in data" :key="product.id" :product="product" />
              </div>

              <Message v-else-if="!loading && data && !data.length" severity="info">Товары не найдены!</Message>

              <div v-else-if="!loading && (!data || data.length === 0)">
                <Catalog />
              </div>
            </Transition>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useRankStore } from "~/stores/rank"
import { Message } from "primevue"
import { Transition } from "vue"
import { useDebounceFn, watchDebounced } from '@vueuse/core'
import Heading from "~/components/app/Heading.vue"
import Catalog from "~/components/app/Catalog.vue"
import ProductsList from "~/components/product/ProductsList.vue"

const { getRankItems } = useRankStore()
const { rankItems } = storeToRefs(useRankStore())
// Запрашиваем список для каталога
getRankItems()

// storeFilter
const { getFilterItems, getProducts, resetFilters } = useCatalogStore()
const { data, culture, manufacturer, harmful, selectedFilter, loading, error } = storeToRefs(useCatalogStore())

getFilterItems('manufacturer')
getFilterItems('culture')
getFilterItems('harmful')

watchDebounced(
  selectedFilter,
  (newFilter) => {
    getProducts(newFilter.manufacturer, newFilter.culture, newFilter.harmful)
  },
  { debounce: 300, maxWait: 800, deep: true },
)

// Отслеживаем выбранные фильтры и загружаем данные
// watch(
//   selectedFilter,
//   (newFilter) => {
//     getProducts(newFilter.manufacturer, newFilter.culture, newFilter.harmful)
//   },
//   { deep: true },
// )

// Сбрасываем data при переходе со страницу на страницу
// watch(
//   () => route.path,
//   (newPath) => {
//     if (newPath === '/catalog' || newPath === '/') {
//       data.value = null
//     }
//   },
//   { immediate: true },
// )

useSeoMeta({
  title: "Каталог",
  description: "This is my amazing site, let me tell you all about it.",
})
</script>

<style scoped>
@import url("~/assets/css/catalog.css");
</style>
