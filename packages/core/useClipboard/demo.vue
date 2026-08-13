<script setup lang="ts">
import { useClipboard, usePermission } from 'comuse-core'
import { shallowRef } from 'vue'

const input = shallowRef('')

const { text, isSupported, copy } = useClipboard()
const permissionRead = usePermission('clipboard-read', {})
const permissionWrite = usePermission('clipboard-write', {})
</script>

<template>
  <div v-if="isSupported" class="space-y-4">
    <div class="text-sm opacity-75">
      Clipboard Permission: read <b class="text-primary">{{ permissionRead }}</b> | write
      <b class="text-primary">{{ permissionWrite }}</b>
    </div>
    <p>
      Current copied: <code class="px-2 py-1 bg-gray-500/10 rounded">{{ text || 'none' }}</code>
    </p>
    <div class="flex gap-2">
      <input v-model="input" type="text" class="flex-1 px-3 py-2 border rounded">
      <button @click="copy(input)" class="px-4 py-2 bg-primary text-white rounded hover:opacity-90">
        Copy
      </button>
    </div>
  </div>
  <p v-else class="text-red-500">
    Your browser does not support Clipboard API
  </p>
</template>
