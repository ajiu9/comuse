<script setup lang="ts">
import { useWindowScroll } from 'comuse-core'
import { onMounted, ref } from 'vue'

const { x, y, isScrolling, arrivedState, directions } = useWindowScroll({
  behavior: 'smooth',
})

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <div v-if="isMounted" style="padding: 16px;">
    <h3>Window Scroll Demo</h3>

    <p>Current scroll position: x = {{ Math.round(x) }}, y = {{ Math.round(y) }}</p>

    <p>isScrolling: {{ isScrolling }}</p>

    <div style="margin-top: 16px;">
      <strong>Arrived State:</strong>
      <ul>
        <li>Top: {{ arrivedState.top }}</li>
        <li>Bottom: {{ arrivedState.bottom }}</li>
        <li>Left: {{ arrivedState.left }}</li>
        <li>Right: {{ arrivedState.right }}</li>
      </ul>
    </div>

    <div style="margin-top: 16px;">
      <strong>Directions:</strong>
      <ul>
        <li>Up: {{ directions.top }}</li>
        <li>Down: {{ directions.bottom }}</li>
        <li>Left: {{ directions.left }}</li>
        <li>Right: {{ directions.right }}</li>
      </ul>
    </div>

    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <button @click="x = 100">
        Scroll X to 100
      </button>
      <button @click="y = 100">
        Scroll Y to 100
      </button>
      <button @click="x = 0; y = 0">
        Scroll to Top
      </button>
    </div>

    <!-- Spacer to make page scrollable -->
    <div style="height: 200vh; width: 200vw;" />
  </div>
</template>
