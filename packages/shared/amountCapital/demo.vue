<script setup lang="ts">
import { amountCapital } from '@ajiu9/shared'

const num: number = 100.53
</script>

<template>
  <note>{{ num }}</note>
  <p>amountCapital: {{ amountCapital(num) }}</p>
</template>
