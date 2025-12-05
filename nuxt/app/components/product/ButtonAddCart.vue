<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <button>{{ msg }}</button>
</template>

<style scoped>
button {
  background-image: linear-gradient(to right, #FF8008 0%, #FFC837 51%, #FF8008 100%);
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 30px;
  display: block;
  cursor: pointer;
}

button:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}
</style>