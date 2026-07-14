<script setup lang="ts">
import { useMounted } from 'comuse-core'
import Fuse from 'fuse.js'
import { computed, reactive } from 'vue'
import { categoryNames, functions } from '../../../../packages/metadata/metadata'

const coreCategories = categoryNames.filter(i => !i.startsWith('@'))
const addonCategories = categoryNames.filter(i => i.startsWith('@'))
const sortMethods = ['category', 'name', 'updated'] as const

const isMounted = useMounted()

const query = reactive({
  search: null as string | null,
  category: null as string | null,
  sort: null as 'category' | 'name' | 'updated' | null,
})

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

const showCategory = computed(() => !search.value && (!sortMethod.value || sortMethod.value === 'category'))

const items = computed(() => {
  const fn = functions.filter(i => !i.internal && i.description)
  if (!category.value)
    return fn
  return fn.filter(item => item.category === category.value)
})

const fuse = computed(() => new Fuse(items.value, {
  keys: ['name', 'description'],
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

const hasFilters = computed(() => Boolean(search.value || category.value || sortMethod.value))

function resetFilters() {
  sortMethod.value = null
  category.value = null
  search.value = null
}

function toggleCategory(cate: string) {
  category.value = category.value === cate ? null : cate
}

function toggleSort(method: string) {
  sortMethod.value = method as typeof sortMethods[number]
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
  <div flex="~" class="children:my-auto" p="2">
    <i i-carbon-search m="r-2" opacity="50" />
    <input v-model="search" class="w-full" type="text" role="search" placeholder="Search...">
  </div>

  <div h="1px" bg="$vp-c-divider" m="b-4" />

  <!-- 清除过滤器按钮 -->
  <div flex="~ col gap-3" p="t-5" class="relative">
    <div v-if="hasFilters" class="transition mb-2 opacity-60 absolute -top-3 right-0 z-10">
      <button class="select-button flex gap-1 items-center !px-2 !py-1" @click="resetFilters()">
        <i i-carbon-filter-remove />
        Clear Filters
      </button>
    </div>

    <!-- 函数列表 -->
    <template v-for="(fn, idx) of result" :key="fn.name">
      <h3
        v-if="showCategory && fn.category !== result[idx - 1]?.category"
        opacity="60"
        class="!text-16px !tracking-wide !m-0"
        p="y-2"
      >
        {{ fn.category }}
      </h3>
      <FunctionBadge :fn="fn" />
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
input {
  --un-ring-offset-width: 1px !important;
  --un-ring-color: #8885 !important;
  --un-ring-offset-color: transparent !important;
}

.select-button {
  @apply rounded text-sm px-2 py-0.5 bg-gray-400/5 hover:bg-gray-400/10;
}
.select-button.active:not(.disabled) {
  @apply text-primary bg-primary/5;
}
.select-button.disabled {
  @apply opacity-50 pointer-events-none;
}
</style>
