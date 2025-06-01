<script setup lang="ts">
import { useDebounce } from 'comuse-core'
import { ref } from 'vue'

const updated = ref(0)
const clicked = ref(0)
const debounce = useDebounce(() => {
  updated.value += 1
}, 1000)

function clickedFn() {
  clicked.value += 1
  debounce()
}
</script>

<template>
  <div>
    <button @click="clickedFn">
      Smash me!
    </button>
    <note>Delay is set to 1000ms for this demo.</note>

    <p>Button clicked: {{ clicked }}</p>
    <p>Event handler called: {{ updated }}</p>
  </div>
</template>
