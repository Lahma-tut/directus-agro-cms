<template>
  <div class="order">
    <div class="container">
      <Heading title="Ваш заказ" />
      <div>
        <template v-for="(item, i) in items" :key="i">
          <p>{{ item }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import Heading from '~/components/app/Heading.vue'
import { useOrderStore } from '~/stores/order'

definePageMeta({ layout: 'default', name: 'Order' })

const cart = useCartStore()

const { radio, user, transport } = storeToRefs(useOrderStore())

useSeoMeta({
  title: "Order",
  description: "This is my amazing site, let me tell you all about it.",
})

// const store = useOrderStore()
// const { order } = storeToRefs(store)

const items = ref()

onMounted(() => loadLocalStorage()) // Загрузка order из localStorage

onMounted(() => { 
  localStorage.getItem("order")
  items.value = JSON.parse(localStorage.getItem("order") || "[]")  
}
) 

// Загрузка order из localStorage

const loadLocalStorage = () => {    
  if (localStorage.getItem("order")) {
    items.value = JSON.parse(localStorage.getItem("order") || "[]")    
  }
}

</script>

<style scoped>

</style>
