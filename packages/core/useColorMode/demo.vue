<script setup lang="ts">
import { useColorMode } from 'comuse-core'

const mode = useColorMode()
</script>

<template>
  <div>
    <p>Current mode: {{ mode }}</p>
    <p>System preference: {{ mode.system }}</p>
    <p>Stored value: {{ mode.store }}</p>

    <div style="display: flex; gap: 8px; margin-top: 16px;">
      <button @click="mode = 'light'">
        Light
      </button>
      <button @click="mode = 'dark'">
        Dark
      </button>
      <button @click="mode = 'auto'">
        Auto
      </button>
    </div>
  </div>
</template>
