<script setup lang="ts">
import { useDebounce } from '@vueuse/core'
import { shallowRef } from 'vue'

const updated = shallowRef(0)
const clicked = shallowRef(0)
const debouncedFn = useDebounce(() => {
  updated.value += 1
}, 1000, { maxWait: 5000 })

function clickedFn() {
  clicked.value += 1
  debouncedFn()
}
</script>

<template>
  <button @click="clickedFn">
    Smash me!
  </button>
  <note>Delay is set to 1000ms and maxWait is set to 5000ms for this demo.</note>

  <p>Button clicked: {{ clicked }}</p>
  <p>Event handler called: {{ updated }}</p>
</template>
