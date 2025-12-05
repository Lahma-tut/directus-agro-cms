<template>
  <div class="home">
    <div class="container">
      <p>Главная не главная, переходите в <a href="http://localhost:3000/catalog">Каталог</a></p>
    </div>
  </div>
</template>

<script setup>

useSeoMeta({
  title: 'Home',
  description: 'This is my amazing site, let me tell you all about it.',
})
</script>

<style scoped>
a {
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  text-decoration-color: var(--p-neutral-300);
  transition: color 0.3s ease-out;
  -webkit-text-decoration-thickness: 1px;
  -webkit-text-decoration-color: #c9c9c9;
}

a:hover {
  color: var(--color-orange);
}
</style>