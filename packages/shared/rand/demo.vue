<script setup lang="ts">
import { getRandom, uuid } from 'comuse-shared'
import { ref } from 'vue'

const uuidData = ref('')
const randomData = ref(0)

const getUuid = () => {
  uuidData.value = uuid()
}

const getRandomData = () => {
  randomData.value = getRandom(1000)
}
</script>

<template>
  <div>
    <div class="mb-4">
      <h4>uuid：</h4>
      <input v-model="uuidData" type="text" readonly class="border-gray-300 mb-2 w-full">
      <button class="inline-block" @click="getUuid">
        Generate
      </button>
    </div>
    <div>
      <h4>random：</h4>
      <input v-model="randomData" type="text" readonly class="border-gray-300 mb-2 w-full">
      <button class="inline-block" @click="getRandomData">
        Generate
      </button>
    </div>
  </div>
</template>
