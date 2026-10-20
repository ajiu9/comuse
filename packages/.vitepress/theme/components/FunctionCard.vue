<script setup lang="ts">
import type { ComuseFunction } from '../../../../packages/metadata/types'
import { computed } from 'vue'

const props = defineProps<{
  fn: ComuseFunction
  highlight?: string | null
}>()

const emit = defineEmits<{
  (e: 'categoryClick', category: string): void
}>()

// Package badge color mapping
const packageColor: Record<string, string> = {
  core: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  shared: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  integrations: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
}

const pkgClass = computed(() =>
  packageColor[props.fn.package] || 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
)

const link = computed(() => {
  if (props.fn.external) {
    return {
      href: props.fn.external,
      target: '_blank',
      rel: 'noopener',
    }
  }
  return {
    href: props.fn.docs?.replace('https://ajiu9.cn', '') || `/${props.fn.package}/${props.fn.name}/`,
  }
})

// Render function name with prefix dimmed and search highlight
function renderName() {
  let name = props.fn.name
  let prefix = ''
  if (name.startsWith('use')) {
    prefix = 'use'
    name = name.slice(3)
  }
  else if (name.startsWith('try')) {
    prefix = 'try'
    name = name.slice(3)
  }
  else if (name.startsWith('on')) {
    prefix = 'on'
    name = name.slice(2)
  }

  const fullName = prefix + name
  const highlighted = highlightText(fullName)
  if (prefix) {
    const prefixLen = prefix.length
    return `<span class="fn-prefix">${highlighted.slice(0, prefixLen)}</span>${highlighted.slice(prefixLen)}`
  }
  return highlighted
}

// Simple markdown rendering + search highlight
function renderDescription(text = '') {
  let html = text
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .trim()

  if (props.highlight)
    html = highlightText(html)

  return html
}

// Highlight search matches in text (case-insensitive)
function highlightText(text: string) {
  if (!props.highlight)
    return text
  const q = props.highlight.trim()
  if (!q)
    return text
  // Escape regex special chars
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark class="search-highlight">$1</mark>')
}

function onCategoryClick(e: Event) {
  e.preventDefault()
  emit('categoryClick', props.fn.category || '')
}
</script>

<template>
  <a
    v-bind="link"
    class="fn-card"
    :class="{ deprecated: fn.deprecated }"
  >
    <!-- Header: name + badges -->
    <div flex="~" items="center" gap="2" wrap="wrap">
      <code class="fn-name" v-html="renderName()" />
      <span v-if="fn.external" class="fn-badge external" i-carbon-launch />
      <span v-if="fn.deprecated" class="fn-badge deprecated">Deprecated</span>
      <span class="fn-badge package" :class="pkgClass">
        {{ fn.package }}
      </span>
      <span
        v-if="fn.category"
        class="fn-badge category"
        @click="onCategoryClick"
      >
        {{ fn.category }}
      </span>
    </div>

    <!-- Description -->
    <p class="fn-desc" v-html="renderDescription(fn.description)" />

    <!-- Aliases (if any) -->
    <div v-if="fn.alias?.length" class="fn-meta">
      <span class="meta-label">Alias:</span>
      <code
        v-for="(a, i) of fn.alias"
        :key="i"
        class="meta-code"
        v-html="highlightText(a)"
      />
    </div>
  </a>
</template>

<style scoped lang="postcss">
.fn-card {
  display: block;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider-light);
  background: var(--vp-c-bg-soft);
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.15s;
  text-decoration: none;
  color: inherit;
}

.fn-card:hover {
  border-color: var(--vp-c-brand-soft);
  background: var(--vp-c-bg-mute);
}

.fn-card.deprecated {
  opacity: 0.6;
  filter: saturate(0.5);
}

.fn-name {
  font-size: 0.95rem;
  font-weight: 600;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.fn-prefix {
  opacity: 0.45;
  font-weight: 400;
}

.fn-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid transparent;
  line-height: 1.4;
}

.fn-badge.package {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.65rem;
  text-transform: lowercase;
}

.fn-badge.category {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  cursor: pointer;
  transition: background 0.15s;
}

.fn-badge.category:hover {
  background: var(--vp-c-brand-soft2);
}

.fn-badge.deprecated {
  background: #f59e0b20;
  color: #f59e0b;
  border-color: #f59e0b30;
}

.fn-badge.external {
  padding: 0 4px;
  font-size: 0.65rem;
  opacity: 0.5;
}

.fn-desc {
  margin: 6px 0 0;
  font-size: 0.82rem;
  line-height: 1.5;
  opacity: 0.75;
  color: var(--vp-c-text-2);
}

.fn-desc code {
  font-size: 0.78rem;
  padding: 1px 4px;
  border-radius: 3px;
  background: var(--vp-c-bg-mute);
}

.fn-desc blockquote {
  margin: 4px 0;
  padding-left: 8px;
  border-left: 2px solid var(--vp-c-divider);
  font-style: italic;
}

.fn-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font-size: 0.75rem;
}

.meta-label {
  opacity: 0.5;
}

.meta-code {
  font-size: 0.72rem;
  padding: 1px 5px;
  border-radius: 3px;
  background: var(--vp-c-bg-mute);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.search-highlight {
  background: var(--vp-c-brand-soft2);
  color: var(--vp-c-brand-1);
  border-radius: 2px;
  padding: 0 1px;
  font-weight: 500;
}

html.dark .search-highlight {
  background: var(--vp-c-brand-soft);
}
</style>
