<script setup lang="ts">
import { useMounted } from 'comuse-core'

const isMounted = useMounted()
</script>

<template>
  <div>{{ isMounted ? 'mounted' : 'unmounted' }}</div>
</template>
