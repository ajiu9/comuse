<script setup lang="ts">
import { computed, ref } from 'vue'
import parseUrlParam from './index'

const url = ref('?a=1&b=true&c=null&d=undefined&e=NaN&f=10.5&g=Infinity&h=test')
const covert = ref(false)

const result = computed(() => parseUrlParam(url.value, covert.value))
</script>

<template>
  <div class="mb-4">
    <label class="block mb-1 font-medium">URL Query String:</label>
    <input v-model="url" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
  </div>
  <div class="mb-4 flex items-center space-x-2">
    <input id="covert" v-model="covert" type="checkbox" class="accent-blue-500">
    <label for="covert" class="select-none cursor-pointer">Auto type conversion</label>
  </div>
  <div>
    <strong class="block mb-1">Result:</strong>
    <code>{{ result }}</code>
  </div>
</template>
