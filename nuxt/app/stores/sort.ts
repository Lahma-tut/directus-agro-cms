import { defineStore } from "pinia"
import { title } from "process"

export const useSortStore = defineStore("sort", () => {
  const loading = ref(false)
  const error = ref()
  const data = ref()
  const products = ref()
  const filters = ref()
  const id = ref()

  const resultSearch = ref()

  const selectedFilter = ref({
    manufacturer: [],
    culture: [],
    harmful: [],
  })

  const selectedId = ref([])

  const isSelectedFilter = computed(() => {
    return selectedId.value.length ? true : false
  })

  const { getItems } = useDirectusItems()

  // filters.value = { category: { category_id: { _eq: id } } }

  const getData = async (name: string, id: []) => {
    data.value = []
    loading.value = true
    error.value = null

    try {
      data.value = await getItems({
        collection: name,
        params: {
          filter: { id: { _in: [id] } },
          fields: ["*"],
        },
      })

      getProducts(name, data.value)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = true
    }
  }

  const getProducts = async (name: string, data: []) => {
    products.value = []
    loading.value = true
    error.value = null

    // Принимаем массив id для поиска товаров
    if (data) {
      id.value = data.map((item: any) => item.id)
    }

    // Принимаем название атрибута и возвращаем фильтр для поиска
    switch (name) {
      case "category":
        filters.value = { category: { category_id: { _eq: id } } }
        break
      case "ingredient":
        filters.value = { ingredient: { ingredient_id: { _eq: id } } }
        break
      case "culture":
        filters.value = { culture: { culture_id: { _in: id } } }
        break
      case "harmful":
        filters.value = { harmful: { harmful_id: { _in: id } } }
        break
      case "manufacturer":
        filters.value = { manufacturer: { manufacturer_id: { _in: id } } }
        break
    }
    try {
      products.value = await getItems({
        collection: "products",
        params: {
          filter: filters.value,
          fields: ["id", "title", "slug", "description", "image", "price", "sale"],
        },
      })
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  // const sortProducts = ref()
  // const testFilter = ref()
  // testFilter.value = { culture: { culture_id: { _in: id } } }

  // // SortProoducts
  // const getSortProoducts = async (name: string, id: string) => {
  //   sortProducts.value = []
  //   loading.value = true
  //   error.value = null

  //   testFilter.value = { culture: { culture_id: { _eq: id } } }

  //   try {
  //     sortProducts.value = await getItems({
  //       collection: "products",
  //       params: {
  //         filter: testFilter.value,
  //         fields: ["*"],
  //       },
  //     })
  //   } catch (e) {
  //     error.value = e
  //   } finally {
  //     loading.value = true
  //   }
  // }

  // const getDataSearch = async (query: string) => {
  //   resultSearch.value = []
  //   loading.value = true
  //   error.value = null

  //   try {
  //     resultSearch.value = await getItems({
  //       collection: "products",
  //       params: {
  //         search: query,
  //         fields: [
  //           "id",
  //           "title",
  //           "slug",
  //           "description",
  //           "image",
  //           "price",
  //           "sale"
  //         ],
  //       },
  //     })
  //   } catch (e) {
  //     error.value = e
  //   } finally {
  //     loading.value = false
  //   }
  // }

  return {
    data,
    resultSearch,
    products,
    loading,
    error,
    selectedId,
    getData,
    isSelectedFilter,
    getProducts,
  }
})
