<script setup lang="ts">
import { compareNumbers } from 'comuse-shared'
import { ref } from 'vue'

const num1 = ref(0)
const num2 = ref(0)
const precision = ref(0)

const val = ref()

const handleTest = () => {
  val.value = compareNumbers(num1.value, num2.value, precision.value)
}
</script>

<template>
  <span>num1:</span><input v-model="num1" type="number">
  <span>num2:</span><input v-model="num2" type="number">
  <span>precision:</span><input v-model="precision" type="number" min="0" max="12">
  <div>
    <p v-for="(value, key) in val" :key="key">
      {{ key }}: {{ value }}
    </p>
  </div>
  <button @click="handleTest">
    Test
  </button>
</template>
