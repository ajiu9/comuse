<script setup lang="ts">
import type { ComuseFunction } from '../../../../packages/metadata/types'
import { computed } from 'vue'

const props = defineProps<{ fn: ComuseFunction }>()

function styledName(name: string) {
  if (name.startsWith('use'))
    return `<span opacity="70">use</span>${name.slice(3)}`
  if (name.startsWith('try'))
    return `<span opacity="70">try</span>${name.slice(3)}`
  if (name.startsWith('on'))
    return `<span opacity="70">on</span>${name.slice(2)}`
  return name
}

function renderMarkdown(text = '') {
  return text
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt=\'$1\' src=\'$2\' />')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href=\'$2\'>$1</a>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n$/gm, '<br />')
    .trim()
}

const link = computed(() => {
  if (props.fn.external) {
    return {
      href: props.fn.external,
      target: '_blank',
    }
  }
  return {
    href: props.fn.docs?.replace('https://ajiu9.cn', '') || `/${props.fn.package}/${props.fn.name}/`,
  }
})
</script>

<template>
  <div
    text="sm"
    flex="~ gap-1"
    items-center
    :class="fn.deprecated ? 'op80 saturate-0' : ''"
  >
    <a
      v-bind="link"
      my-auto
      :class="fn.deprecated ? 'line-through !decoration-solid' : ''"
    >
      <code v-html="styledName(fn.name)" />
    </a>
    <i v-if="fn.external" i-carbon-launch class="opacity-50 text-0.7rem" />
    <span op50>-</span>
    <span class="whitespace-wrap" v-html="renderMarkdown(fn.description)" />
  </div>
</template>
