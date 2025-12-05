<template>
  <div class="search-box">
    <div :class="['search-input', isResults && 'is-result-search']">
      <input
        v-model="input"
        type="text"
        ref="inputTyping"
        placeholder="search"
        @input="handleInput"
      />
      <span v-if="input.length > 0" @click="clearInput" class="icon-clear">
        <i class="pi pi pi-times"></i>
      </span>
    </div>
    <Transition mode="out-in">
      <div class="result-box" v-if="isResults">
        <div class="result-items">
          <div v-for="(item, index) in resultSearch" :key="item.id">
            <div
              :class="selectedIndex === index ? 'aktive' : ''"
              @click="setSelected(item.title)"
              @click.prevent="$emit('selectedSlug', item.slug)"
            >
              <div class="result-cart">
                <div class="result-cart-image">
                  <Image :src="img(item.image)" :alt="item.title" width="40" height="40" />
                </div>
                <div class="result-cart-title">
                  <p>{{ item.title }}</p>
                </div>
                <div class="result-cart-price">
                  <p>{{ item.price }} &nbsp;<span>&#x20bd;</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="icon-spinner">
          <i class="pi pi-ellipsis-h"></i>
        </div>
        <div class="result-item">
          <p>Подробнее при наведении</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, Transition, watch } from "vue"
import { onClickOutside, onKeyDown, onKeyStroke, refDebounced } from "@vueuse/core"
import Image from "primevue/image"
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { onStartTyping } from "@vueuse/core"
import { watchDebounced } from "@vueuse/core"
import {  } from '@vueuse/core'
import { shallowRef } from 'vue'

const { getThumbnail: img } = useDirectusFiles()

const input = shallowRef('')
const debounced = refDebounced(input, 600)

const isOpen = ref(false)
const clickOutside = ref(null)
const inputTyping = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(-1)
const isResults = ref(false)

// Store
const { getSearchItems, clearSearch } = useSearchStore()
const { resultSearch, loading, error } = storeToRefs(useSearchStore())

// Логика показа результата поиска, вариант 2 refDebounced
watch(
  debounced,
  () => {
    if (input.value.length > 1) {
      getSearchItems(input.value)
      isResults.value = true
    } else if (!input.value) {
      clearSearch()
      isResults.value = false
    }
})

// Логика показа результата поиска
// watchDebounced(
//   input,
//   () => {
//     if (input.value.length > 1) {
//       getSearchItems(input.value)
//       isResults.value = true
//     } else if (!input.value) {
//       clearSearch()
//       isResults.value = false
//     }
//   },
//   { debounce: 600, maxWait: 1200 },
// )

const setSelected = (item: string) => {
  input.value = item
}

const handleInput = (event: Event) => {
  isOpen.value = true
  input.value = (event.target as HTMLInputElement).value
}

// Очистка формы поиска
const clearInput = () => {
  input.value = ""
  clearSearch()
  isResults.value = false
}

// Фокусировка на input при открытии
onStartTyping(() => {
  if (inputTyping.value !== document.activeElement) inputTyping.value!.focus()
})

// Очищает форму при закрытии
// onClickOutside(clickOutside, clearInput)

onKeyStroke(
  "ArrowDown",
  (e: any) => {
    e.preventDefault()
    selectedIndex.value += 1
  },
  { target: document },
)

onKeyStroke(
  "ArrowUp",
  (e: any) => {
    e.preventDefault()
    selectedIndex.value -= 1
  },
  { target: document },
)

function offKeyStroke() {
  selectedIndex.value = -1
}
</script>

<style scoped>
@import url("~/assets/css/search.css");
</style>
