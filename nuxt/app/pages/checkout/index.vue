<template>
  <div class="checkout">
    <div class="container">
      <Headling title="Оформление заказа" />
      <div class="wrapper">
        <section class="form">
          <h5>ФИО</h5>

          <div class="form-user">
            <label for="username">Фамилия Имя Отчество*</label>
            <InputText v-model="user.name" type="text" id="username" size="large" />

            <label for="username">Почта*</label>
            <InputText v-model="user.email" type="text" id="username" size="large" />

            <label for="username">Телефон*</label>
            <InputMask
              v-model="user.phone"
              mask="+7 (999) 999-99-99"
              placeholder="+7"
              id="phone"
              size="large"
            />

            <div class="fiscal">
              <label>Юридическое лицо</label>
              <p>Для выставления счета на оплату загрузите реквизиты!</p>
              <div class="fiscal-file">
                <div class="file-upload">
                  <div @click="open()" class="btn-upload">
                    <span><i class="pi pi-upload"></i></span>
                    Выберите файл
                  </div>
                  <template v-if="files">
                    <li v-for="file of files" :key="file.name" class="files">
                      Вы загрузили: <span class="item-file">{{ file.name }}</span>
                    </li>
                  </template>
                  <span v-if="files" @click="reset()" class="btn-reset"> Сбросить </span>
                </div>
              </div>
            </div>
          </div>

          <div class="radio">
            <RadioButton v-model="radio" inputId="pickup" value="pickup" />
            <label for="pickup">Самовывоз</label>
          </div>
          <div class="pickup-description">
            <p>{{ description }}</p>
            <button @click="copy(description)" class="btn-copy">
              <span v-if="!copied">Скопировать <i class="pi pi-copy"></i></span>
              <span v-else>Cкопировано <i class="pi pi-thumbs-up"></i></span>
            </button>
          </div>

          <div class="radio">
            <RadioButton v-model="radio" inputId="delivery" value="delivery" />
            <label for="delivery">Доставка транспортной компанией</label>
          </div>

          <div v-if="radio === 'delivery'" class="delivery">
            <div class="delivery-description">
              <p>
                Ознакомиться с наличием терминалов в городе, сроками, стоимостью доставки можно нас
                странице -
                <a href="/delivery" target="_blank">Доставка <i class="pi pi-external-link"></i></a>
              </p>
            </div>

            <div class="delivery-wrapper">
              <label>Выберите транспортную компанию</label>
              <Select
                placeholder="Выбрать"
                v-model="transport.company"
                :options="company"
                optionLabel="name"
                class="select-company"
              />

              <label for="terminal">До терминала в городе</label>
              <InputText
                placeholder="Город"
                v-model="transport.terminal"
                id="terminal"
                type="text"
              />

              <label for="adress">До адреса терминала в городе</label>
              <InputText
                placeholder="Номер дома и название улицы"
                v-model="transport.adress"
                id="adress"
                type="text"
              />

              <label for="passport">Паспорт</label>
              <p>{{ passportText }}</p>
              <InputMask
                v-model="transport.passport"
                id="passport"
                type="text"
                placeholder="Номер Серия"
                mask="9999-999999"
                fluid
              />

              <label for="terminal">ФИО</label>
              <InputText
                v-model="transport.user"
                id="passportFio"
                type="text"
                placeholder="Фамилия Имя Отчество"
              />
            </div>
          </div>
        </section>

        <section class="order">
          <div class="order-row">
            <div class="order-wrapper">
              <h4>Ваш заказ</h4>
              <ul v-if="cart.items.length" class="order-items">
                <li v-for="item in cart.items" class="order-item">
                  <span class="order-item-title">{{ item.title }}</span>
                  <span class="order-item-quality">{{ item.quality }}</span>
                  <span class="order-item-price"
                    >{{ Number(item.price).toLocaleString("ru") }} ₽</span
                  >
                </li>
              </ul>
              <div class="order-total">
                <span>Итого</span>
                <span>{{ cart.total.toLocaleString("ru") }} ₽</span>
              </div>
            </div>

            <div class="checkout">
              <h4>Ваши данные</h4>
              <div class="checkout-block">
                <div class="checkout-user">
                  <div>
                    ФИО: <span class="user-info">{{ user.name }}</span>
                  </div>
                  <div>
                    Почта: <span class="user-info">{{ user.email }}</span>
                  </div>
                  <div>
                    Телефон: <span class="user-info">{{ user.phone }}</span>
                  </div>
                  <div>
                    <span class="user-ratio">{{ ratioСhoice }}</span>
                  </div>
                </div>
                <div v-if="radio === 'delivery'" class="checkout-transport">
                  <div>
                    Tранспортная компания:
                    <span class="user-info">{{ transport.company.name }}</span>
                  </div>
                  <div>
                    До терминала в городе: <span class="user-info">{{ transport.terminal }}</span>
                  </div>
                  <div>
                    До адреса терминала в городе:
                    <span class="user-info">{{ transport.terminal }}</span>
                  </div>
                  <div>
                    Паспорт: <span class="user-info">{{ transport.terminal }}</span>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore alias officia omnis
              iure commodi magni perspiciatis numquam voluptatum odit fuga!
            </p>

            <button @click="submitForm" class="button-checkout">Отправить</button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "~/stores/cart"
import RadioButton from "primevue/radiobutton"
import { useFileDialog } from "@vueuse/core"
import { useToast } from "primevue/usetoast"
import { z } from "zod"
import { zodResolver } from "@primevue/forms/resolvers/zod"

definePageMeta({ layout: "default", name: "Checkout" })

useSeoMeta({
  title: "Checkout",
  description: "This is my amazing site, let me tell you all about it.",
})

// Данные для ФИО
const radio = ref("pickup")

const user = ref({
  name: "",
  email: "",
  phone: "",
  radio: "pickup",
})

// Доставки
const transport = ref({
  company: "",
  terminal: "",
  adress: "",
  passport: "",
  user: "",
})

const toast = useToast()
const cart = useCartStore()

const ratioСhoice = computed(() => {
  return radio.value === "pickup" ? "Самовывоз" : "Доставка транспортной компанией"
})

const items = ref([])

const submitForm = (e) => {
    alert('submitForm')
    localStorage.test = 2;
    localStorage.setItem("order", JSON.stringify(user.value))
}

// const saveLocalStorage = () => {
//   localStorage.setItem("cart", JSON.stringify(items.value))
// }


const description = ref(
  "Московская обл., г. Лыткарино, территория промзоны Тураево стр. 36. Понедельник-Пятница с 08:00 до 18:00",
)
const { copy, copied } = useClipboard({ description })

// const resolver = zodResolver(
//   z.object({
//     username: z.string().min(1, { message: 'Username is required.' }).max(40),
//     email: z.string().email({ message: 'Email is required.' }),
//     phone: z.string().min(1, { message: 'Phone is required.' }),
//     checked: z.boolean({ message: 'Checked is required.' })
//   })
// )

// Отправка формы @primevue/forms
// const onFormSubmit = ({ valid, values }) => {
//   if (valid) {
//     toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
//     store.addOrder(values)
//   }
// }

const { files, open, reset, onCancel, onChange } = useFileDialog({
  accept: "image/*,.pdf,.doc,.docx,.rtf,.xls,.xlsx",
  max: "200m",
})

onChange((files) => {
  /** do something with files */
})

onCancel(() => {
  /** do something on cancel */
})

const resolverDelivery = zodResolver(
  z.object({
    username: z.string().min(1, { message: "Username is required." }).max(40),
    email: z.string().email({ message: "Email is required." }),
    phone: z.string().min(1, { message: "Phone is required." }),
    company: z.string().min(1, { message: "Company is required." }),
    terminal: z.string().min(1, { message: "TerminalInСity is required." }).max(40),
    adress: z.string().min(1, { message: "Adress is required." }).max(40),
    passportNuber: z.string().min(1, { message: "Phone is required." }),
    passportFio: z.string().min(1, { message: "Username is required." }).max(40),
    checked: z.boolean({ message: "Checked is required." }),
  }),
)

const onFormSubmitDelivery = (e) => {
  if (e.valid) {
    toast.add({ severity: "success", summary: "Form is submitted.", life: 3000 })
  }
}

const saveLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(items.value))
}

const passportText =
  "Ваши паспортные данные будут использоваться для оформления в транспортной компании, а также данные необходимы для получения заказа"

const company = ref([
  { name: "Деловые Линии", code: "DL" },
  { name: "СДЭК", code: "SD" },
  { name: "Boxberry", code: "BB" },
  { name: "Байкал Сервис", code: "BS" },
  { name: "ПЭТ", code: "PT" },
  { name: "ЖелДорЭкспедиция", code: "ZD" },
  { name: "GTD", code: "GD" },
  { name: "Норд Вил", code: "NV" },
  { name: "Энергия", code: "EG" },
  { name: "Сократ", code: "SK" },
])
</script>

<style scoped>
@import url("~/assets/css/checkout.css");
</style>
