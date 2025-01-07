<script setup lang="ts">
import { invoke } from 'comuse-shared'
import { until } from 'comuse-core'
import { ref } from 'vue'

const count = ref(1)
setTimeout(() => {
  count.value = 7
}, 2000)

invoke(async () => {
  await until(count).toBe(7)
  alert('Count is 7')
})
</script>

<template>
  <note>Add to 7 to show the alert.</note>
  <p>Count: {{ count }}</p>
  <!-- <button @click="inc()">
    Increment
  </button>
  <button @click="dec()">
    Decrement
  </button> -->
</template>
