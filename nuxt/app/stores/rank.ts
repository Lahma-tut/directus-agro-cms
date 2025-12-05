import { defineStore } from "pinia"

export const useRankStore = defineStore("rank", () => {
  const loading = ref(false)
  const error = ref()
  const rankItems = ref()
  
  const attributeItems = ref()

  const { getItems } = useDirectusItems()

  const getRankItems = async () => {
    rankItems.value = []
    loading.value = true
    error.value = null

    try {
      rankItems.value = await getItems({
        collection: "rank",
        params: {
          fields: ["id", "title", "image", "categories.id", "categories.title", "categories.slug"],
        },
      })
    } catch (e) {
      error.value = e
      console.log("🚀 ~ error:", e)
    } finally {
      loading.value = false
    }
  }

  const getAttributeItems = async (name: string) => {
    attributeItems.value = []
    loading.value = true
    error.value = null

    try {
      attributeItems.value = await getItems({
        collection: name,
        params: {
          fields: ["*"],
        },
      })
    } catch (e) {
      error.value = e
      console.log("🚀 ~ error:", e)
    } finally {
      loading.value = false
    }
  }

  return {
    getRankItems,
    getAttributeItems,
    attributeItems,
    rankItems,
    loading,
    error,
  }
})
