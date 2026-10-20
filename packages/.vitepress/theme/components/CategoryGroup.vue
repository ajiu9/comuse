<script setup lang="ts">
import type { ComuseFunction } from '../../../../packages/metadata/types'
import { ref, watch } from 'vue'

const props = defineProps<{
  category: string
  functions: ComuseFunction[]
  highlight?: string | null
  defaultOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'categoryClick', category: string): void
  (e: 'fnCategoryClick', category: string): void
}>()

const isOpen = ref(props.defaultOpen !== false)

function toggle() {
  isOpen.value = !isOpen.value
}

function onHeaderClick(e: Event) {
  e.preventDefault()
  toggle()
}

function onCategoryBadgeClick(category: string) {
  emit('fnCategoryClick', category)
}

watch(() => props.defaultOpen, (val) => {
  if (val !== undefined)
    isOpen.value = val
})
</script>

<template>
  <div class="category-group">
    <button
      class="category-header"
      :aria-expanded="isOpen"
      @click="onHeaderClick"
    >
      <i
        class="chevron"
        :class="{ open: isOpen }"
        i-carbon-chevron-right
      />
      <span class="category-name">{{ category }}</span>
      <span class="category-count">{{ functions.length }}</span>
    </button>

    <Transition name="collapse">
      <div v-show="isOpen" class="category-content">
        <FunctionCard
          v-for="fn of functions"
          :key="fn.name"
          :fn="fn"
          :highlight="highlight"
          @category-click="onCategoryBadgeClick"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="postcss">
.category-group {
  margin-bottom: 8px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 6px 4px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  color: var(--vp-c-text-2);
  transition: color 0.15s;
}

.category-header:hover {
  color: var(--vp-c-text-1);
}

.chevron {
  font-size: 1rem;
  transition: transform 0.2s ease;
  opacity: 0.6;
}

.chevron.open {
  transform: rotate(90deg);
}

.category-name {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.category-count {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-left: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.category-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 22px;
  padding-bottom: 4px;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 2000px;
}
</style>
