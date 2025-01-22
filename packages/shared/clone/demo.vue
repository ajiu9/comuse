<script setup lang="ts">
import { clone } from 'comuse-shared'
import { ref } from 'vue'

const input = { fruit: 'banana', drink: 'water' }

const out = ref({})
</script>

<template>
  <input v-model="out.fruit" type="text">
  <input v-model="out.drink" type="text">

  <button @click="() => out = clone(input)">
    reset
  </button>
</template>
