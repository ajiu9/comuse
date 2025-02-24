<script setup lang="ts">
import { parseGitUrl } from 'comuse-shared'

const gitUrl = 'git@github.com:ajiu9/comuse.git'
</script>

<template>
  <note>source: {{ gitUrl }}</note>
  <p>parseGitUrl: {{ parseGitUrl(gitUrl) }}</p>
</template>
