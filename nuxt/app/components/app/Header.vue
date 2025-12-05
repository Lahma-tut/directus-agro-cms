<template>
  <header>
    <div class="container">
      <div class="wrapper">
        <div class="logo">
          <NuxtLink to="/">
            <img :src="Logo" alt="logo" width="260px" />
          </NuxtLink>
        </div>
        <nav v-if="navigate" class="nav-desktop">
          <template v-for="(item, i) in navigate" :key="i">
            <NuxtLink :to="item.link" class="nav-desktop__item">
              {{ item.name }}
            </NuxtLink>
          </template>
        </nav>

        <div class="search" ref="dropdownHandler">
          <button @click.prevent="dropdownSearch = !dropdownSearch">
            <i class="pi pi-search" :class="[dropdownSearch ? 'orange' : 'green']"></i>
          </button>
        </div>

        <div class="cart">
          <NuxtLink to="/cart">
            <i
              class="pi pi-shopping-cart"
              :class="[$route.path === '/cart' ? 'orange' : 'green']"
            ></i>
            <Transition>
              <span
                v-if="sumQuality"
                class="cart__count"
                :class="[$route.path === '/cart' ? 'orange' : 'green']"
              >
                {{ sumQuality }}
              </span>
            </Transition>
          </NuxtLink>
        </div>
        <div class="contact">
          <span class="mail">agro@pr-agro.ru</span>
          <span class="tel">8 (495) 198-07-97</span>
        </div>
        <div class="nav-mobile">
          <NuxtLink to="/catalog">
            <i class="pi pi-align-justify"></i>
          </NuxtLink>
        </div>
      </div>
      <Transition>
        <div v-if="dropdownSearch">
          <Search @selected-slug="handleSelected" />
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { useCartStore } from "~/stores/cart"
import { onClickOutside } from "@vueuse/core"
import { useRouter } from "vue-router"
import Logo from "~/assets/image/logo/logo-pr-agro.png"
import Search from "~/components/app/Search.vue"

const router = useRouter()

const navigate = ref([
  { name: "О компании", link: "/" },
  { name: "Каталог", link: "/catalog" },
  { name: "Доставка", link: "/" },
  { name: "Блог", link: "/" },
  { name: "Контакты", link: "/" },
])

const { sumQuality } = storeToRefs(useCartStore())

const dropdownSearch = ref(false)
const dropdownHandler = ref(null)

// onClickOutside(dropdownHandler, () => (dropdownSearch.value = false))

const handleSelected = (slug: string) => {
  router.push(`/catalog/${slug}`)
  dropdownSearch.value = false
}
</script>

<style scoped>
@import url("~/assets/css/header.css");
</style>
