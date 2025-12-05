<script setup lang="ts">

definePageMeta({ layout: 'default', title: 'My Contacts page' })

useSeoMeta({
  title: 'My Contacts',
  ogTitle: 'My Contacts',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="contacts">
    <div class="container">
      <Headling title="Контакты"/>
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
.contacts {
  
}
</style>