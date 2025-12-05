<template>
  <div class="cart">
    <div class="container">
      <Heading :title="`В корзина ${cartThings} товара`" />
      <section class="cart-box">
        <div v-if="!items.length">
          <p>
            Корзина пуста. Вернитесь к покупкам
            <a href="/catalog"><i class="pi pi-cart-arrow-down"></i></a>
          </p>
        </div>
        <ul v-if="items.length">
          <li
            v-for="product in items"
            :key="product.id"
          >
            <div class="cart-row">
              <div class="cart-item-remove">
                <Toast />
                <ConfirmPopup></ConfirmPopup>
                <button
                  @click="submitConfirm($event, product.id)"
                  class="button-remove"
                >
                  <i class="pi pi-times"></i>
                </button>
              </div>
              <div class="cart-item-image">
                <Image
                  :src="img(product.image)"
                  :alt="product.title"
                  width="60"
                  preview
                />
              </div>
              <div class="cart-item-content">
                <h3>{{ product.title }}</h3>
                <p>{{ product.description }}</p>
              </div>
              <div class="cart-item-price">
                <p>
                  {{ Number(product.price).toLocaleString("ru") }} <span>л/кг</span>
                </p>
              </div>
              <div class="cart-item-quality">
                <button
                  @click.prevent="decrementQty(product.id)"
                  class="button-quality"
                >
                  <i class="pi pi-minus"></i>
                </button>

                <div class="item-quality">
                  {{ product.quality }}
                </div>

                <button
                  @click.prevent="increaseQty(product.id)"
                  class="button-quality"
                >
                  <i class="pi pi-plus"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>

        <div class="order">
          <h4>Сумма заказа</h4>
          <div class="order-box">
            <span>Итого</span>
            <span>{{ total.toLocaleString("ru") }} ₽</span>
          </div>
          <div class="order-info">
            <p>
              Обратите внимание! В данный момент минимальная сумма заказа 3 000 руб.
            </p>
            <p>
              Все заказы оформленные в выходные дни, обрабатываются с понедельника, не
              переживайте, с Вами выйдут на связь.
            </p>
            <p>
              Доступные способы доставки и наличие товара можно будет узнать после
              оформления заказа и звонка нашего менеджера.
            </p>
          </div>
          <div class="checkout">
            <NuxtLink to="/checkout">Оформить</NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart"
import ConfirmPopup from "primevue/confirmpopup"
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import Heading from "~/components/app/Heading.vue"
import { Image } from "primevue"

const { getThumbnail: img } = useDirectusFiles()

definePageMeta({ layout: "default", name: "cart" })

useSeoMeta({
  title: "Корзина",
  description: "This is my amazing site, let me tell you all about it.",
})

const { items, total, sumQuality, cartThings } = storeToRefs(useCartStore())
const { decrementQty, increaseQty, removeItem } = useCartStore()

const confirm = useConfirm()
const toast = useToast()

const submitConfirm = (event: any, id: number) => {
  confirm.require({
    target: event.currentTarget,
    message: "Удалить этот товар?",
    icon: "pi pi-info-circle",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "warn",
    },
    accept: () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Record deleted",
        life: 3000,
      })

      // Если удаление подтвержденно, отправляем id на удаление
      removeItem(id)
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      })
    },
  })
}
</script>

<style scoped>
@import url("~/assets/css/cart.css");
</style>
