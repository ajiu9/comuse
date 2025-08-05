<script setup lang="ts">
import { useInterval } from 'comuse-core'

const counter = useInterval(200)
</script>

<template>
  <div>
    <p>Interval fired: {{ counter }}</p>
  </div>
</template>
