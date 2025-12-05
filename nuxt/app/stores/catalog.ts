import { defineStore } from "pinia"
import type { TFilterItem } from "~/type/product"

export const useCatalogStore = defineStore('catalog', () => {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const data = ref<null | any[]>(null)

  const manufacturer = ref<TFilterItem[]>([])
  const culture = ref<TFilterItem[]>([])
  const harmful = ref<TFilterItem[]>([])

  const { getItems } = useDirectusItems()

  // Фильтр и его состояние
  const selectedFilter = ref({
    manufacturer: [],
    culture: [],
    harmful: [],
  })

  // не понял зачем мне это
  // const setFilter = (filterName: any, values: any) => {
  //   selectedFilter.value[filterName] = values
  // }

  // Сделать сброс фильтра по id!
  const resetFilters = () => {
    selectedFilter.value = { manufacturer: [], culture: [], harmful: [] }
  }

  // filters.value = { category: { category_id: { _eq: id } } }

  // Получение всех категорий для фильтра
  const getFilterItems = async (name: string) => {
    loading.value = true
    error.value = null

    try {
      const items = await getItems({
        collection: name,
        params: {
          fields: ["id", "title", "slug"],
        },
      });
      
      (({ manufacturer, culture, harmful }) as any)[name].value = items

      // это расширенный код
      // if (name === "manufacturer") {
      //   manufacturer.value = items
      // } else if (name === "culture") {
      //   culture.value = items
      // } else if (name === "harmful") {
      //   harmful.value = items
      // }

    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  const getProducts = async (
    manufacturerIds: number[] = [],
    cultureIds: number[] = [],
    harmfulIds: number[] = [],
  ) => {

    console.log(manufacturerIds)
    // Only fetch if at least one filter has values
    const hasFilter = manufacturerIds.length || cultureIds.length || harmfulIds.length

    if (!hasFilter) {
      data.value = null
      return
    }

    loading.value = true
    error.value = null

    try {
      const filters: any[] = []

      if (manufacturerIds.length) {
        filters.push({
          manufacturer: { _some: { manufacturer_id: { _in: manufacturerIds } } },
        })
      }

      if (cultureIds.length) {
        filters.push({
          culture: { _some: { culture_id: { _in: cultureIds } } },
        })
      }

      if (harmfulIds.length) {
        filters.push({
          harmful: { _some: { harmful_id: { _in: harmfulIds } } },
        })
      }

      // Делаем запрос
      data.value = await getItems({
        collection: "products",
        params: {
          filter: { _and: filters }, // Use _and for multiple
          fields: ["id", "title", "slug", "description", "image", "price", "sale"],
          limit: 25,
        },
      })

    } catch (e) {
      console.error("getProducts error:", e)
      error.value = e as Error
      data.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    harmful,
    culture,
    manufacturer,
    loading,
    error,
    selectedFilter,
    resetFilters,
    getFilterItems,
    getProducts
  }
})
