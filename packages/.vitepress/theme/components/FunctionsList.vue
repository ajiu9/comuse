<script setup lang="ts">
import type { ComuseFunction } from '../../../../packages/metadata/types'
import { onKeyStroke, useMounted } from 'comuse-core'
import Fuse from 'fuse.js'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { categoryNames, functions } from '../../../../packages/metadata/metadata'
import CategoryGroup from './CategoryGroup.vue'
import FilterTags from './FilterTags.vue'
import FunctionCard from './FunctionCard.vue'

const coreCategories = categoryNames.filter(i => !i.startsWith('@'))
const addonCategories = categoryNames.filter(i => i.startsWith('@'))
const sortMethods = ['category', 'name', 'updated'] as const

const isMounted = useMounted()
const searchInput = ref<HTMLInputElement | null>(null)

const query = reactive({
  search: null as string | null,
  category: null as string | null,
  sort: null as 'category' | 'name' | 'updated' | null,
})

// --- URL state sync ---
function parseHashParams() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const qIndex = hash.indexOf('?')
  if (qIndex === -1)
    return null
  return new URLSearchParams(hash.slice(qIndex + 1))
}

function readFromUrl() {
  const params = parseHashParams()
  if (!params) return
  query.search = params.get('search') || null
  query.category = params.get('category') || null
  query.sort = (params.get('sort') as typeof query.sort) || null
}

function syncToUrl() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const basePath = hash.split('?')[0]
  const params = new URLSearchParams()
  if (query.search) params.set('search', query.search)
  if (query.category) params.set('category', query.category)
  if (query.sort && query.sort !== 'category') params.set('sort', query.sort)
  const qs = params.toString()
  const newHash = qs ? `#/${basePath}?${qs}` : `#/${basePath}`
  history.replaceState(null, '', newHash)
}

// Initialize from URL on mount
const initialized = ref(false)
watch(isMounted, async (mounted) => {
  if (mounted && !initialized.value) {
    initialized.value = true
    readFromUrl()
    window.addEventListener('hashchange', readFromUrl)
    await nextTick()
  }
}, { immediate: true })

// Sync state changes to URL
watch([() => query.search, () => query.category, () => query.sort], () => {
  if (initialized.value)
    syncToUrl()
})

// --- Keyboard shortcuts ---
onKeyStroke('/', (e) => {
  const el = document.activeElement
  const tag = el?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || el?.isContentEditable)
    return
  e.preventDefault()
  searchInput.value?.focus()
  searchInput.value?.select()
})

onKeyStroke('Escape', () => {
  if (query.search) {
    query.search = null
    searchInput.value?.blur()
  }
})

// --- Computed ---
const search = computed<string | null>({
  get: () => isMounted.value ? query.search : null,
  set: val => query.search = val,
})

const category = computed<string | null>({
  get: () => isMounted.value ? query.category : null,
  set: val => query.category = val,
})

const sortMethod = computed<'category' | 'name' | 'updated' | null>({
  get: () => isMounted.value ? query.sort : null,
  set: val => query.sort = val,
})

const allVisible = computed(() => functions.filter(i => !i.internal && i.description))

const items = computed(() => {
  if (!category.value)
    return allVisible.value
  return allVisible.value.filter(item => item.category === category.value)
})

const fuse = computed(() => new Fuse(items.value, {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'alias', weight: 0.3 },
    { name: 'description', weight: 0.2 },
    { name: 'category', weight: 0.1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  includeScore: true,
}))

const result = computed(() => {
  if (search.value)
    return fuse.value.search(search.value).map(r => r.item)

  const fns = [...items.value]
  if (sortMethod.value === 'updated')
    fns.sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0))
  else if (sortMethod.value === 'name')
    fns.sort((a, b) => a.name.localeCompare(b.name))
  else
    fns.sort((a, b) => categoryNames.indexOf(a.category || '') - categoryNames.indexOf(b.category || ''))
  return fns
})

// Group results by category (when sort=category or no sort and no search)
const groupedResult = computed<{ category: string, fns: ComuseFunction[] }[]>(() => {
  const shouldGroup = !search.value && (!sortMethod.value || sortMethod.value === 'category')
  if (!shouldGroup)
    return []

  const groups: Map<string, ComuseFunction[]> = new Map()
  for (const fn of result.value) {
    const cat = fn.category || 'Other'
    if (!groups.has(cat))
      groups.set(cat, [])
    groups.get(cat)!.push(fn)
  }
  // Preserve categoryNames order
  return categoryNames
    .filter(c => groups.has(c))
    .map(c => ({ category: c, fns: groups.get(c)! }))
    .concat(
      Array.from(groups.entries())
        .filter(([c]) => !categoryNames.includes(c))
        .map(([category, fns]) => ({ category, fns })),
    )
})

const totalCount = computed(() => allVisible.value.length)
const resultCount = computed(() => result.value.length)
const hasFilters = computed(() => Boolean(search.value || category.value || (sortMethod.value && sortMethod.value !== 'category')))

// --- Actions ---
function resetFilters() {
  query.sort = null
  query.category = null
  query.search = null
}

function toggleCategory(cate: string) {
  query.category = query.category === cate ? null : cate
}

function toggleSort(method: string) {
  query.sort = method as typeof sortMethods[number]
}

function clearSearch() {
  query.search = null
}

function clearCategory() {
  query.category = null
}

function clearSort() {
  query.sort = null
}

function handleFnCategoryClick(cat: string) {
  query.category = query.category === cat ? null : cat
  query.search = null
}
</script>

<template>
  <!-- 过滤器区域 -->
  <div class="grid grid-cols-[80px_auto] gap-y-2 mt-10">
    <div opacity="80" text="sm">
      Core
    </div>
    <div flex="~ wrap" gap="2" m="b-2">
      <button
        v-for="cate of coreCategories"
        :key="cate"
        class="select-button"
        :class="{ active: category === cate }"
        @click="toggleCategory(cate)"
      >
        {{ cate }}
      </button>
    </div>
    <div v-if="addonCategories.length" opacity="80" text="sm">
      Add-ons
    </div>
    <div v-if="addonCategories.length" flex="~ wrap" gap="2" m="b-2">
      <button
        v-for="cate of addonCategories"
        :key="cate"
        class="select-button"
        :class="{ active: category === cate }"
        @click="toggleCategory(cate)"
      >
        {{ cate.slice(1) }}
      </button>
    </div>
    <div opacity="80" text="sm">
      Sort by
    </div>
    <div flex="~ wrap" gap="2" m="b-2">
      <button v-if="search" class="select-button active">
        Search
      </button>
      <button
        v-for="method of sortMethods"
        :key="method"
        class="select-button capitalize"
        :class="{
          active: method === (sortMethod || 'category'),
          disabled: search,
        }"
        @click="toggleSort(method)"
      >
        {{ method }}
      </button>
    </div>
  </div>

  <div h="1px" bg="$vp-c-divider" m="t-4" />

  <!-- 搜索输入 -->
  <div flex="~" class="children:my-auto search-box" p="2" relative>
    <i i-carbon-search m="r-2" opacity="50" />
    <input
      ref="searchInput"
      v-model="search"
      class="w-full"
      type="text"
      role="search"
      aria-label="Search functions"
      :placeholder="isMounted ? 'Search functions... (press / to focus)' : 'Search...'"
    >
    <kbd v-if="isMounted && !search" class="shortcut-hint">/</kbd>
  </div>

  <!-- 已选过滤器 tags -->
  <div px="2" py="1">
    <FilterTags
      :search="search"
      :category="category"
      :sort-method="sortMethod"
      @clear-search="clearSearch"
      @clear-category="clearCategory"
      @clear-sort="clearSort"
      @clear-all="resetFilters"
    />
  </div>

  <!-- 结果统计 & 清除过滤器 -->
  <div flex="~" items="center" justify="between" m="y-2" px="2">
    <div text="sm" opacity="60">
      <span class="font-mono font-semibold">{{ resultCount }}</span>
      <span> / {{ totalCount }} functions</span>
      <span v-if="hasFilters" opacity="50" ml-1>— filtered</span>
    </div>
    <button
      v-if="hasFilters"
      class="select-button flex gap-1 items-center !px-2 !py-1"
      @click="resetFilters()"
    >
      <i i-carbon-filter-remove />
      Clear Filters
    </button>
  </div>

  <div h="1px" bg="$vp-c-divider" m="b-4" />

  <!-- 函数列表 -->
  <div pt-2>
    <!-- 分类分组（可折叠） -->
    <template v-if="groupedResult.length">
      <CategoryGroup
        v-for="group of groupedResult"
        :key="group.category"
        :category="group.category"
        :functions="group.fns"
        :highlight="search"
        default-open
        @fn-category-click="handleFnCategoryClick"
      />
    </template>

    <!-- 扁平列表（搜索或非 category 排序时） -->
    <template v-else>
      <div flex="~ col" gap="2">
        <FunctionCard
          v-for="fn of result"
          :key="fn.name"
          :fn="fn"
          :highlight="search"
          @category-click="handleFnCategoryClick"
        />
      </div>
    </template>

    <!-- 空状态 -->
    <div v-if="!result.length" text-center pt-6>
      <div m2 op50>
        No result matched
      </div>
      <button class="select-button flex-inline gap-1 items-center !px-2 !py-1" @click="resetFilters()">
        <i i-carbon-filter-remove />
        Clear Filters
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.search-box {
  outline: none;
}

.search-box input {
  --un-ring-offset-width: 1px !important;
  --un-ring-color: #8885 !important;
  --un-ring-offset-color: transparent !important;
  outline: none;
  background: transparent;
  border: none;
  font-size: 0.9rem;
}

.search-box input:focus {
  outline: none;
}

.shortcut-hint {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  opacity: 0.7;
  pointer-events: none;
}

.select-button {
  @apply rounded text-sm px-2 py-0.5 bg-gray-400/5 hover:bg-gray-400/10 cursor-pointer border-0;
}
.select-button.active:not(.disabled) {
  @apply text-primary bg-primary/5;
}
.select-button.disabled {
  @apply opacity-50 pointer-events-none;
}

@media (max-width: 640px) {
  .shortcut-hint {
    display: none;
  }
}
</style>
