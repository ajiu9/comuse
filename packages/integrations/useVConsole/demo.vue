<script setup lang="ts">
import { useVConsole } from 'comuse-integrations'
import { getUrlParam } from 'comuse-shared'

useVConsole()
</script>

``
<template>
  <note>
    debug: {{ getUrlParam('debug') }}
  </note>
</template>
