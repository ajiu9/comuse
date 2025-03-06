<script lang="ts" setup>
import { to } from 'comuse-shared'
import { ref } from 'vue'

const count = ref(0)

const handleClick = async () => {
  const [, data] = await to(new Promise((resolve) => {
    setTimeout(() => {
      resolve(100)
    }, 1000)
  }))
  count.value = data
}
</script>

<template>
  <div>
    <input v-model="count" type="number">
    <button @click="handleClick">
      AwaitTo 100
    </button>
  </div>
</template>
