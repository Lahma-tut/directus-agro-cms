<template>
  <div class="order">
    <div class="container">
      <Headling title="Ваш заказ" />
      <div>
        Ваш зака
        <pre>{{ items }}</pre>
        <p v-for="item in items">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { storeToRefs } from 'pinia'
// import { useOrderStore } from '~/stores/order'

definePageMeta({ layout: 'default', name: 'Order' })

const cart = useCartStore()

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
) // Загрузка order из localStorage

const loadLocalStorage = () => {    
  if (localStorage.getItem("order")) {
    items.value = JSON.parse(localStorage.getItem("order") || "[]")    
  }
}

</script>

<style scoped>

</style>
