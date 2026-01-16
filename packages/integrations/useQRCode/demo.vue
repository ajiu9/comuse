<script setup lang="ts">
import { useQRCode } from 'comuse-integrations'
import { shallowRef } from 'vue'

const text = shallowRef('https://ajiu9.cn/comuse')
const qrcode = useQRCode(text, {
  errorCorrectionLevel: 'H',
  margin: 3,
})
</script>

<template>
  <note>
    Text content for QRCode
  </note>
  <input v-model="text" type="text">
  <img v-if="text && qrcode" class="mt-6 mb-2 rounded border" :src="qrcode" alt="QR Code">
</template>
