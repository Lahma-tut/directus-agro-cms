<template>
  <div class="filter">
    <TransitionGroup name="filter" tag="div">
      <div v-if="selectedFilter.manufacturer.length || selectedFilter.culture.length || selectedFilter.harmful.length " class="choose">
        <h5>Ваш выбор</h5>
        <ul v-if="selectedFilter.manufacturer.length">
          <li v-for="item in selectedFilter.manufacturer">
            {{ item.title}}
            <span>x</span>
          </li>
        </ul>
        <ul v-if="selectedFilter.culture.length">
          <li v-for="item in selectedFilter.culture">
            {{ item.title }}
            <span>x</span>
          </li>
        </ul>
        <ul v-if="selectedFilter.harmful.length">
          <li v-for="item in selectedFilter.harmful">
            {{ item.title }}
            <span>x</span>
          </li>
        </ul>
      </div>
      <h5>Производитель</h5>
      <ul v-if="manufacturer">
        <li v-for="item of props.manufacturer" :key="item.slug">
          <Checkbox
            v-model="selectedFilter.manufacturer"
            name="manufacturer"
            :inputId="item.slug"
            :value="item"
          />
          <label :for="item.slug">{{ item.title }}</label>
        </li>
      </ul>
      <h5>Культура</h5>
      <ul v-if="culture">
        <li v-for="item of props.culture" :key="item.slug">
          <Checkbox 
            v-model="selectedFilter.culture" 
            name="culture" 
            :inputId="item.slug"
            :value="item" 
            />
          <label :for="item.slug">{{ item.title }}</label>
        </li>
      </ul>
      <h5>Вредитель</h5>
      <ul>
        <li v-for="item of props.harmful" :key="item.slug">
          <Checkbox
            v-model="selectedFilter.harmful"
            name="harmful"
            :inputId="item.slug"
            :value="item"
          />
          <label :for="item.slug">{{ item.title }}</label>
        </li>
      </ul>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { Checkbox } from "primevue"

type Props = {
  title: string
  slug: string
}

const props = defineProps<{
  manufacturer?: Props[],
  culture?: Props[],
  harmful?: Props[],
}>()

const { selectedFilter } = storeToRefs(useCategoryStore())

</script>

<style scoped>
h5 {
  font-size: var(--text-m);
  font-weight: 500;
  color: var(--color-orange);
  text-transform: uppercase;
  margin: var(--spacing-s) 0;
}

ul {
  margin-bottom: 20px;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
  list-style: none;
  font-size: var(--text-m);
  color: var(--p-neutral-600);
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: normal;
  margin-bottom: 5px;
}

.choose ul {
  margin: 0;
}

.choose li {
  background-color: var(--p-neutral-50);
  padding: 0 0.375rem;
  border: 1px solid var(--p-neutral-200);
  border-radius: 5px;
  margin-right: 0.375rem;
  display: inline-flex;
  color: var(--p-neutral-500);
  font-size: var(--text-sm);
  cursor: pointer;
}

.choose span {
  color: var(--p-zinc-400);
}

.choose li:hover {
  background-color: var(--p-neutral-100);
}


/* .choose-enter-active,
.choose-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.choose-enter-from,
.choose-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.choose-enter-to,
.choose-leave-from {
  opacity: 1;
  transform: translateY(0);
} */

/* .choose-enter-active,
.choose-leave-active {
  overflow: hidden;
  transition: all 0.3s ease;
  max-height: 0;
}
.choose-enter-from {
  opacity: 0;
  max-height: 0;
}
.choose-leave-to {
  opacity: 0;
  max-height: 0;
}
.choose-enter-to,
.choose-leave-from {
  opacity: 1;
  max-height: 200px;
} */

.filter-enter-active,
.filter-leave-active,
.filter-move {
  transition: all 0.3s ease;
}

.filter-enter-from,
.filter-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* КРИТИЧНО: убирает из потока при удалении */
.filter-leave-active {
  position: absolute;
  width: 100%;
}
</style>
