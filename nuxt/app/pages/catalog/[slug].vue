<template>
  <div class="product">
    <div class="container">
      <article>
        <Heading 
          :title="product.title" 
          :breadcrumbs="product.category" 
          />
        <div class="wrapper">
          <div class="product-container">
            <div class="product-card">
              <div class="product-card__image">
                <Image :src="img(product.image)" alt="title" width="600" preview />
              </div>
              <div class="product-card__atribute">
                <div class="description">
                  <h6>Назначение</h6>
                  <div>
                    <p>{{ product.description }}</p>
                    <p class="description__minmax">
                      Минимальная парти: <span>{{ min }}</span>
                    </p>
                  </div>
                  
                </div>
                <Ingredient
                  v-if="product.ingredient.length"
                  title="Состав"
                  category="ingredient"
                  :elements="product.ingredient"
                  :unit="product.ingredient_value"
                />
                <Attribut
                  v-if="product.culture.length"
                  title="Культура"
                  category="culture"
                  :attribut="product.culture"
                />
                <Attribut
                  v-if="product.harmful.length"
                  title="Вредный объект"
                  category="harmful"
                  :attribut="product.harmful"
                />
                <Attribut
                  title="Производитель"
                  category="manufacturer"
                  :attribut="product.manufacturer"
                />

                <div class="quantity">
                  <h6>Упаковка</h6>
                  <p>
                    {{ product.pack }}
                    {{ product.pack_unit }}
                  </p>
                </div>

                <div class="price">
                  <h6>Цена за л/кг</h6>
                  <ul>
                    <li class="price-item">
                      <strong class="price-item-count">
                        {{ Number(product.price).toLocaleString("ru") }}
                        ₽
                      </strong>
                      <span class="price-info">рекомендованная цена с НДС 20%</span>
                    </li>
                  </ul>
                </div>

                <div class="packaging">
                  <h6>Цена за упаковку</h6>
                  <ul>
                    <li class="price-item">
                      <strong class="price-item-count">
                        {{ (Number(product.price) * Number(product.pack)).toLocaleString("ru") }}
                        ₽
                      </strong>
                      <span class="price-info"> скидка рассчитывается индивидуально</span>
                    </li>
                  </ul>
                </div>

                <div class="cart-wrapper">
                  <div class="cart-count">
                    <button @click.prevent="decrement" class="button-count">
                      <i class="pi pi-minus"></i>
                    </button>
                    <input v-model="count" type="text" />
                    <button @click.prevent="increment" class="button-count">
                      <i class="pi pi-plus"></i>
                    </button>
                  </div>
                  <div class="cart-button">
                    <ButtonAddCart @click.prevent="submitAddCart(product, count)" msg="Добавить" />
                  </div>
                </div>
              </div>
            </div>
            <div v-html="product.content" class="product-description"></div>
          </div>
          <aside>
            <h5>Похожие</h5>
          </aside>
        </div>
        <Toast position="bottom-right" />
        <Message v-if="loading" severity="success">Загрузка...</Message>
        <Message v-if="error" severity="error">{{ error.message }}</Message>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import Image from "primevue/image"
import Toast from "primevue/toast"
import Heading from "~/components/app/Heading.vue"
import Attribut from "~/components/product/Attribut.vue"
import ButtonAddCart from "~/components/product/ButtonAddCart.vue"
import Ingredient from "~/components/product/Ingredient.vue"
import { storeToRefs } from "pinia"
import { useProductStore } from "~/stores/product"
import type { TProduct } from "~/type/product"

const { getThumbnail: img } = useDirectusFiles()

const route = useRoute()

const { 
  count, 
  loading, 
  error, 
  product 
} = storeToRefs(useProductStore())

const { getProductBySlug, decrement, increment } = useProductStore()
const { addCart } = useCartStore()

await getProductBySlug(String(route.params.slug))

const submitAddCart = (product: TProduct, count: number) => {
  if (product && count) {
    addCart(product, count)
  } else return
}

const min = '20 шт - 1 коробка'

useSeoMeta({
  title: `${product.value.title} - ${product.value.price} ₽`,
  description: product.value.description,
})
</script>

<style scoped>
@import url("~/assets/css/product.css");
</style>
