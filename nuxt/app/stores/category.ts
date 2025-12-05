import { defineStore } from "pinia"
import { useArrayUnique } from "@vueuse/core"
import type { TFilterState } from "~/type/product"

export const useCategoryStore = defineStore("category", () => {
  const categories = ref()
  const loading = ref(false)
  const error = ref()

  // Product category state
  const data = ref()
  const filters = ref()

  // 1 версия
  const selectedManufacturer = ref<string[]>([])
  const selectedCulture = ref<string[]>([])
  const selectedHarmful = ref<string[]>([])

  // 2 версия
  const selectedFilter = reactive<TFilterState>({
    manufacturer: [],
    culture: [],
    harmful: [],
  })

  const { getItems } = useDirectusItems()

  const getСategories = async (name: string, slug: string) => {
    categories.value = []
    loading.value = true
    error.value = null

    try {
      categories.value = await getItems({
        collection: name,
        params: {
          filter: { slug: { _eq: slug } },
          fields: ["id", "title", "slug", "description"],
        },
      })
      getProductsItems(name, categories.value[0].id)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = true
    }
  }

  // Функция получения товаров на основе переданной категории
  const getProductsItems = async (name: string, id: string) => {
    data.value = []
    loading.value = true
    error.value = null

    // Принимаем название категории или атрибута и возвращаем фильтр для поиска
    switch (name) {
      case "category":
        filters.value = { category: { category_id: { _eq: id } } }
        break
      case "ingredient":
        filters.value = { ingredient: { ingredient_id: { _eq: id } } }
        break
      case "culture":
        filters.value = { culture: { culture_id: { _eq: id } } }
        break
      case "harmful":
        filters.value = { harmful: { harmful_id: { _eq: id } } }
        break
      case "manufacturer":
        filters.value = { manufacturer: { manufacturer_id: { _eq: id } } }
        break
    }
    // Получаем данные на основе фильтра из директуса
    try {
      data.value = await getItems({
        collection: "products",
        params: {
          filter: filters.value,
          fields: [
            "id",
            "slug",
            "title",
            "description",
            "image",
            "culture.culture_id.title",
            "culture.culture_id.slug",
            "harmful.harmful_id.title",
            "harmful.harmful_id.slug",
            "manufacturer.manufacturer_id.title",
            "manufacturer.manufacturer_id.slug",
            "price",
            "pack",
            "pack_unit",
          ],
          limit: 50,
        },
      })
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  // Фильтруем товары на основе выбраных фильтров
  const filtered = computed(() => {
    if (!selectedFilter.manufacturer.length && 
        !selectedFilter.culture.length && 
        !selectedFilter.harmful.length) {
      return data.value
    }

    if (selectedFilter) {
      const manufacturerSlugs = selectedFilter.manufacturer.map((m) => m.slug)
      const cultureSlugs = selectedFilter.culture.map((m) => m.slug)
      const harmfulSlugs = selectedFilter.harmful.map((m) => m.slug)

      return data.value.filter((product: any) => {
        const hasManufacturer = 
          !manufacturerSlugs.length ||
          product.manufacturer.some((m) =>
            manufacturerSlugs.includes(m.manufacturer_id.slug),
          )
        
        const hasCulture = 
          !cultureSlugs.length ||
          product.culture.some((c) => 
            cultureSlugs.includes(c.culture_id.slug)
          )

        const hasHarmful = 
          !harmfulSlugs.length ||
          product.harmful.some((h) => 
            harmfulSlugs.includes(h.harmful_id.slug)
          )

        return hasManufacturer && hasCulture && hasHarmful
      })
    }
  })

  // Фильтруем товары
  const filteredProducts = computed(() => {
    if (
      (!selectedManufacturer.value || selectedManufacturer.value.length === 0) &&
      (!selectedCulture.value || selectedCulture.value.length === 0) &&
      (!selectedHarmful.value || selectedHarmful.value.length === 0)
    ) {
      return data.value
    }

    return data.value.filter((product: any) => {
      const hasManufacturer =
        !selectedManufacturer.value.length ||
        product.manufacturer.some((m: any) =>
          selectedManufacturer.value.includes(m.manufacturer_id.title),
        )

      const hasCulture =
        !selectedCulture.value.length ||
        product.culture.some((c: any) => selectedCulture.value.includes(c.culture_id.title))

      const hasHarmful =
        !selectedHarmful.value.length ||
        product.harmful.some((h: any) => selectedHarmful.value.includes(h.harmful_id.title))

      return hasManufacturer && hasCulture && hasHarmful
    })
  })

  // Готовим массив для отображения списка фильтра
  const manufacturer = computed(() => {
    if (filteredProducts.value) {
      // Делаем наш массив плоским, убираем вложенность
      const arr = filteredProducts.value.map((item: any) => item.manufacturer).flat()
      // Уникализируем объекты лежащие в массиве data
      const result = useArrayUnique(
        arr,
        (a, b) => a.manufacturer_id.slug === b.manufacturer_id.slug,
      )
      // Возвращаем наш результат
      return result.value.map((item: any) => item.manufacturer_id)
    } else null
  })

  const culture = computed(() => {
    if (filteredProducts.value) {
      const arr = filteredProducts.value.map((item: any) => item.culture).flat()
      const result = useArrayUnique(arr, (a, b) => a.culture_id.slug === b.culture_id.slug)
      return result.value.map((item: any) => item.culture_id)
    } else null
  })

  const harmful = computed(() => {
    if (filteredProducts.value) {
      const arr = filteredProducts.value.map((item: any) => item.harmful).flat()
      const result = useArrayUnique(arr, (a, b) => a.harmful_id.slug === b.harmful_id.slug)
      return result.value.map((item: any) => item.harmful_id)
    } else null
  })

  // Фильтруем товары c применением new Set
  // const filteredProductsSet = computed(() => {
  //   const manufacturerSet = new Set(selectedFilter.manufacturer)
  //   const cultureSet = new Set(selectedFilter.culture)
  //   const harmfulSet = new Set(selectedFilter.harmful)

  //   if (
  //     manufacturerSet.size === 0 &&
  //     cultureSet.size === 0 &&
  //     harmfulSet.size === 0
  //   ) {
  //     return data.value
  //   }

  //   return data.value.filter((product: any) => {
  //     const hasManufacturer =
  //       manufacturerSet.size === 0 ||
  //       product.manufacturer.some((m: any) => manufacturerSet.has(m.manufacturer_id.slug))

  //     return hasManufacturer
  //   })
  // })

  // [ { "title": "Avgust", "slug": "avgust" } ]

  return {
    categories,
    loading,
    error,
    manufacturer,
    culture,
    harmful,
    selectedManufacturer,
    selectedCulture,
    selectedHarmful,
    filteredProducts,
    selectedFilter,
    filtered,
    getСategories
  }
})
