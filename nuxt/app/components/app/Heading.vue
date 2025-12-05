<template>
  <div class="heading">
    <div class="wrapper">
      <NuxtLink
        v-if="props.breadcrumbs"
        :to="props.breadcrumbs.slug ? `/category/${props.breadcrumbs.slug}` : '/catalog'"
      >
        <div class="breadcrumb">
          <span class="breadcrumb-icon">
            <i class="pi pi-angle-double-left"></i>
          </span>
          <h4>{{ props.breadcrumbs.title }}</h4>
        </div>
      </NuxtLink>
      <div class="title">
        <h1>{{ props.title }}</h1>
        <span v-if="quantity" class="quantity">{{ quantity }} товаров</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IBreadcrumbs {
  title: string,
  slug?: string
}

const props = defineProps<{
  title: string
  breadcrumbs: IBreadcrumbs
  quantity?: number
}>()

// const props = withDefaults(defineProps<Props>(), {
//   msg: 'hello',
//   labels: () => ['one', 'two']
// })
</script>

<style scoped>
@import url("~/assets/css/heading.css");
</style>
