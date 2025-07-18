<script setup lang="ts">
import { uuid } from 'comuse-shared'
import { ref } from 'vue'

const out = ref([])

const add = () => {
  out.value.push(uuid())
}

const remove = (index: number) => {
  out.value.splice(index, 1)
}
</script>

<template>
  <div v-for="(item, index) in out" :key="item">
    <span>{{ item }}</span>
    <button @click="remove(index)">
      remove
    </button>
  </div>

  <button @click="add">
    add
  </button>
</template>
