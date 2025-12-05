<template>
  <div class="filter">
    <h5>Производитель</h5>
    <ul v-if="manufacturer">
      <li v-for="item of manufacturer" :key="item.id">
        <Checkbox
          v-model="selectedFilter.manufacturer"
          name="manufacturer"
          :inputId="item.slug"
          :value="item.title"
        />
        <label :for="item.slug">{{ item.title }}</label>
      </li>
    </ul>
    <h5>Культура</h5>
    <ul v-if="culture">
      <li v-for="item of culture" :key="item.id">
        <Checkbox 
          v-model="selectedId" 
          name="culture" 
          :inputId="item.slug" 
          :value="item.id" 
          />
        <label :for="item.slug">{{ item.title }}</label>
      </li>
    </ul>
    <h5>Вредитель</h5>
    <ul>
      <li v-for="item of harmful" :key="item.id">
        <Checkbox
          v-model="selectedFilter.harmful"
          name="harmful"
          :inputId="item.slug"
          :value="item.title"
        />
        <label :for="item.slug">{{ item.title }}</label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Checkbox } from "primevue"

const selectedFilter = ref({
  manufacturer: [],
  culture: [],
  harmful: [],
})

const { harmful, culture, manufacturer } = storeToRefs(useFilterStore())

const { getFilterItems } = useFilterStore()
await getFilterItems("manufacturer")
await getFilterItems("culture")
await getFilterItems("harmful")

const { getData } = useSortStore()
const { selectedId } = storeToRefs(useSortStore())

watch(
  selectedId,
  () => {
    if (selectedId.value.length) {
      getData("culture", selectedId.value)
    }
})
</script>

<style scoped>
h5 {
  font-size: var(--text-m);
  font-weight: 500;
  color: var(--color-orange);
  text-transform: uppercase;
  margin-bottom: var(--spacing-s);
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
</style>
