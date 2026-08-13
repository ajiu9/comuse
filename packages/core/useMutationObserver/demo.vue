<script setup lang="ts">
import { useMutationObserver } from 'comuse-core'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const messages = ref<string[]>([])
const count = ref(0)

useMutationObserver(el, (mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes')
      messages.value.push(`Attribute ${mutation.attributeName} changed`)
    else if (mutation.type === 'childList')
      messages.value.push('Child nodes changed')
  })
}, {
  attributes: true,
  childList: true,
})

function addAttribute() {
  if (el.value)
    el.value.setAttribute('data-count', String(count.value++))
}

function addChild() {
  if (el.value) {
    const child = document.createElement('span')
    child.textContent = `Child ${count.value++}`
    el.value.appendChild(child)
  }
}
</script>

<template>
  <div>
    <div ref="el" class="target">
      Target Element
    </div>

    <div style="margin-top: 16px; display: flex; gap: 8px;">
      <button @click="addAttribute">
        Add Attribute
      </button>
      <button @click="addChild">
        Add Child
      </button>
    </div>

    <div style="margin-top: 16px;">
      <strong>Messages:</strong>
      <ul>
        <li v-for="(msg, i) in messages" :key="i">
          {{ msg }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.target {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
