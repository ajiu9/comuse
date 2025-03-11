<script setup lang="ts">
import { amountCapital } from 'comuse-shared'
import { ref } from 'vue'

const num = ref(100.53)

const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  input.value = input.value.replace(/[^0-9.]/g, '')
  if (input.value.length > 10)
    input.value = input.value.slice(0, 10)
}
</script>

<template>
  <input v-model="num" type="number" @input="handleInput">
  <p>amountCapital: {{ amountCapital(num) }}</p>
</template>
