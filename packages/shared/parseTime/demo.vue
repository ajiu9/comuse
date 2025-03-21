<script setup lang="ts">
import { formatTime, nowStr, parseTime, timestamp } from 'comuse-shared'
import { computed, ref } from 'vue'

const slider = ref(0)
const value = computed(() => timestamp() + slider.value ** 3)

const format = ref('yyyyMMddhhmmss')
const nowString = ref('')
</script>

<template>
  <div class="text-primary text-center">
    parseTime: {{ parseTime(value, 'yyyy-MM-dd hh:mm:ss') }}
    <br>
    formatTime:  {{ formatTime(value) }}
  </div>
  <input v-model="slider" class="slider" type="range" min="-3800" max="0">
  <div class="text-center opacity-50">
    {{ slider ** 3 }}ms
  </div>

  <div class="justify-center mt-4">
    <div class="flex items-center">
      <span mr-5 w-10>format:</span>
      <input v-model="format" type="text" class="inline-block">
    </div>
    <div class="flex items-center mb-5 mt-5">
      <span mr-5 w-10>format:</span>
      <input v-model="nowString" type="text" class="text-primary" readonly>
    </div>

    <button
      @click="() => nowString = nowStr(format)"
    >
      formatTime
    </button>
  </div>
</template>

<style>
.slider {
  -webkit-appearance: none;
  width: 100%;
  background: rgba(125, 125, 125, 0.1);
  border-radius: 1rem;
  height: 1rem;
  opacity: 0.8;
  margin: 0.5rem 0;
  outline: none !important;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.3rem;
  height: 1.3rem;
  background: var(--vp-c-brand);
  cursor: pointer;
  border-radius: 50%;
}
</style>
