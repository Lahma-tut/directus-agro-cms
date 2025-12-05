import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useToast } from "primevue/usetoast"
import type { TProduct } from "~/type/product"

interface TData {
  product: TProduct
  quality: number,
}

export const useCartStore = defineStore("cart", () => {
  const items = ref([])

  const toast = useToast()

  const cartThings = computed(() => items.value.length)

  const sumQuality = computed(() => {
    return items.value.reduce((acc, current) => acc + current.quality, 0)
  })

  const total = computed(() => {
    return items.value.reduce(
      (acc, current) => acc + current.quality * Number(current.price),
      0,
    )
  })

  const show = (title: string) => {
    toast.add({
      severity: "success",
      summary: "Корзина",
      detail: `${ title } добавлен!`,
      life: 3000,
    })
  }

  const addCart = (product: TProduct, count: number) => {
    const data = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      quality: count,
    }

    const item = items.value.find((product) => product.id === data.id)

    if (!item) {
      items.value.push(data)
    } else {
      item.quality = item.quality + count
    }
    show(product.title)
    saveLocalStorage()
  }

  const increaseQty = (id: number) => {
    let item = items.value.find((product: any) => product.id === id)
    if (item) {
      item.quality++
    }
    saveLocalStorage()
  }

  const decrementQty = (id: number) => {
    let item = items.value.find((product: any) => product.id === id)
    if (item) {
      item.quality--
      if (item.quality < 1) {
        removeItem(Number(item.id))
      }
    }
    saveLocalStorage()
  }

  const removeItem = (id: number) => {
    items.value.splice(
      items.value.findIndex((a: any) => a.id === id),
      1,
    )
    localStorage.removeItem("cart")
    saveLocalStorage()
  }

  const $reset = () => {
    items.value = []
    localStorage.clear()
  }

  const saveLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(items.value))
  }

  const loadLocalStorage = () => {
    if (localStorage.getItem("cart")) {
      items.value = JSON.parse(localStorage.getItem("cart") || "[]")
    }
  }

  // Подключаем Directus
  const { createItems } = useDirectusItems()

  const createOrderUser = async (items) => {
    try {
      // const items = [{ name: '222222', status: "published", }]

      await createItems({ collection: "order", items })
    } catch (e) {
      console.log(e)
    }
  }


  // const createOrderUser = async () => {
  //   try {
  //     const items = [
  //       {
  //         name: "testitem",
  //       }
  //     ];
  //     await createItems({ collection: "order", items });
  // } catch (e) {}


  return {
    items,
    addCart,
    cartThings,
    sumQuality,
    total,
    createOrderUser,
    increaseQty,
    decrementQty,
    saveLocalStorage,
    loadLocalStorage,
    removeItem,
    $reset,
  }
})
