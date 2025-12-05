<script setup lang="ts">

definePageMeta({ layout: 'default', title: 'My Delivery page' })

useSeoMeta({
  title: 'My Delivery',
  ogTitle: 'My Delivery',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="delivery">
    <div class="container">
      <Headling title="Доставка"/>
      <article>
        <div>
          <p>
            About ipsum, dolor sit amet consectetur adipisicing elit. 
            At unde vitae sit doloremque. Maiores, perferendis possimus architecto obcaecati porro vel?
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.delivery {

}
</style>