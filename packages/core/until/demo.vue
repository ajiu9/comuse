<script setup lang="ts">
import { until, useCounter } from 'comuse-core'
import { invoke } from 'comuse-shared'

const { count, inc, dec } = useCounter()

invoke(async () => {
  await until(count).toBe(7)
  alert('Count is 7')
})
</script>

<template>
  <note>Add to 7 to show the alert.</note>
  <p>Count: {{ count }}</p>
  <button @click="inc()">
    Increment
  </button>
  <button @click="dec()">
    Decrement
  </button>
</template>
