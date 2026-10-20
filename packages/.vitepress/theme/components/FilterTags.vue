<script setup lang="ts">
defineProps<{
  search: string | null
  category: string | null
  sortMethod: string | null
}>()

const emit = defineEmits<{
  (e: 'clearSearch'): void
  (e: 'clearCategory'): void
  (e: 'clearSort'): void
  (e: 'clearAll'): void
}>()

const sortLabels: Record<string, string> = {
  name: 'Name',
  updated: 'Recently Updated',
  category: 'Category',
}
</script>

<template>
  <div class="filter-tags" flex="~ wrap" gap="2" items="center">
    <template v-if="search">
      <span class="filter-tag">
        <span class="tag-label">Search:</span>
        <span class="tag-value">{{ search }}</span>
        <button class="tag-remove" aria-label="Clear search" @click="emit('clearSearch')">
          <i i-carbon-close />
        </button>
      </span>
    </template>

    <template v-if="category">
      <span class="filter-tag category-tag">
        <span class="tag-label">Category:</span>
        <span class="tag-value">{{ category.startsWith('@') ? category.slice(1) : category }}</span>
        <button class="tag-remove" aria-label="Clear category filter" @click="emit('clearCategory')">
          <i i-carbon-close />
        </button>
      </span>
    </template>

    <template v-if="sortMethod && sortMethod !== 'category'">
      <span class="filter-tag sort-tag">
        <span class="tag-label">Sort:</span>
        <span class="tag-value">{{ sortLabels[sortMethod] || sortMethod }}</span>
        <button class="tag-remove" aria-label="Reset sort" @click="emit('clearSort')">
          <i i-carbon-close />
        </button>
      </span>
    </template>

    <button
      v-if="search || category || (sortMethod && sortMethod !== 'category')"
      class="clear-all-btn"
      @click="emit('clearAll')"
    >
      <i i-carbon-filter-remove />
      Clear all
    </button>
  </div>
</template>

<style scoped lang="postcss">
.filter-tags {
  min-height: 24px;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  padding: 2px 4px 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider-light);
}

.tag-label {
  opacity: 0.5;
  font-size: 0.7rem;
}

.tag-value {
  font-weight: 500;
}

.category-tag {
  background: var(--vp-c-brand-soft);
  border-color: transparent;
  color: var(--vp-c-brand-1);
}

.category-tag .tag-label {
  opacity: 0.7;
}

.sort-tag {
  background: var(--vp-c-bg-mute);
}

.tag-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 3px;
  opacity: 0.6;
  transition:
    opacity 0.15s,
    background 0.15s;
  font-size: 0.7rem;
  padding: 0;
  margin-left: 2px;
}

.tag-remove:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.05);
}

html.dark .tag-remove:hover {
  background: rgba(255, 255, 255, 0.1);
}

.clear-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  padding: 2px 6px;
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.15s;
  font-size: 0.7rem;
}

.clear-all-btn:hover {
  color: var(--vp-c-text-1);
}
</style>
