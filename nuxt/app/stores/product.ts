import { defineStore } from "pinia"

export const useProductStore = defineStore('product', () => {
  
  // Подключаем Directus
  const { getItems } = useDirectusItems()
    
  // Состояния response
  const loading = ref(false)
  const error = ref()
  const data = ref()

  // Product state
  const product = reactive({
    id: '',
    title: '',
    description: '',
    image: '',
    category: [],
    ingredient: [],
    ingredient_value: [],
    culture: [],
    harmful: [],
    manufacturer: [],
    pack: '',
    pack_unit: '',
    price: '',
    content: ''
  })

  // Колличество товара добавляемое в корзину
  const count = ref(1)

  const increment = () => count.value++

  const decrement = () => {
    if (count.value > 1) {
      count.value--
    } else {
      count.value
    }
  }

  // Функиция получения товара по slug
  const getProductBySlug = async (slug: string) => {
    data.value = []
    loading.value = true
    error.value = null
    try {
      data.value = await getItems({
        collection: 'products',
        params: {
          filter: { slug: { _eq: slug } },
          fields: [
            "id",
            "slug",
            "title",
            "description",
            "image",
            "category.category_id.title",
            "category.category_id.slug",
            "ingredient.ingredient_id.title",
            "ingredient.ingredient_id.slug",
            "ingredient_value.ingredient_value_id.*",
            "culture.culture_id.title",
            "culture.culture_id.slug",
            "harmful.harmful_id.title",
            "harmful.harmful_id.slug",
            "manufacturer.manufacturer_id.title",
            "manufacturer.manufacturer_id.slug",
            "price",
            "pack",
            "pack_unit",
            "content",
          ],
        },
      })

      // Обрабатываем данные для передачи в компонент
      if (data) {
        product.id = data.value[0].id
        product.title = data.value[0].title
        product.description = data.value[0].description
        product.image = data.value[0].image
        product.price = data.value[0].price
        product.category = data.value[0].category[0].category_id
        product.ingredient = data.value[0].ingredient.map((item: any) => item.ingredient_id)
        product.ingredient_value = data.value[0].ingredient_value.map(
          (item: any) => item.ingredient_value_id)
        product.culture = data.value[0].culture.map(
          (item: any) => item.culture_id)
        product.harmful = data.value[0].harmful.map(
          (item: any) => item.harmful_id)
        product.manufacturer = data.value[0].manufacturer.map(
          (item: any) => item.manufacturer_id)
        product.pack = data.value[0].pack[0]
        product.pack_unit = data.value[0].pack_unit[0]
        product.content = data.value[0].content
      }
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    count,
    loading,
    error,
    product,
    increment,
    decrement,
    getProductBySlug,
  }
})
