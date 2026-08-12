<script setup lang="ts">
import { useDark, useToggle } from 'comuse-core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div>
    <p>Current mode: {{ isDark ? 'dark' : 'light' }}</p>
    <button @click="toggleDark()">
      Toggle Dark Mode
    </button>
  </div>
</template>
