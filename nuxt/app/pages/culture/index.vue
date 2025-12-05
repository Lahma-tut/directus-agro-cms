<template>
  <div class="catalog">
    <div class="container">
      <article>
        <Heading title="Культура" />
        <div class="wrapper-catalog">
          <aside>
            <Filter />
          </aside>
          <section>
            <div>
              <ul v-if="attributeItems">
                <li v-for="item in attributeItems">
                  {{ item.title }}
                </li>
              </ul>
            </div>
            <Message v-if="loading" severity="success">Загрузка...</Message>
            <Message v-if="error" severity="error">{{ error.message }}</Message>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useRankStore } from "~/stores/rank"
import { Message } from "primevue"
import Heading from "~/components/app/Heading.vue"
import Filter from "~/components/app/Filter.vue"

const { getRankItems, getAttributeItems } = useRankStore()
const { attributeItems, loading, error } = storeToRefs(useRankStore())

await getAttributeItems('culture')

useSeoMeta({
  title: "Каталог",
  description: "This is my amazing site, let me tell you all about it.",
})
</script>

<style scoped>
@import url("~/assets/css/catalog.css");
</style>
