<script setup lang="ts">
import { useMounted } from 'comuse-core'
import { computed, reactive } from 'vue'
import { categoryNames } from '../../../../packages/metadata/metadata'

const coreCategories = categoryNames.filter(i => !i.startsWith('@'))
const sortMethods = ['category', 'name', 'updated']

const isMounted = useMounted()

const query = reactive({
  search: null,
  category: null,
  component: false,
  directive: false,
  sort: null,
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

const hasFilters = computed(() => Boolean(search.value || category.value || sortMethod.value))

function toggleCategory(cate: string) {
  category.value = category.value === cate ? null : cate
}

function toggleSort(method: string) {
  sortMethod.value = method as any
}
</script>

<template>
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
  <div flex="~" class="children:my-auto" p="2">
    <i i-carbon-search m="r-2" opacity="50" />
    <input v-model="search" class="w-full" type="text" role="search" placeholder="Search...">
  </div>
  <div h="1px" bg="$vp-c-divider" m="b-4" />
  <div flex="~ col gap-3" p="t-5" class="relative">
    <div v-if="hasFilters" class="transition mb-2 opacity-60 absolute top-3 right-0 z-10">
      <i i-carbon-filter-remove />
      Clear Filters
    </div>
  </div>
</template>

<style scoped lang="postcss">
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
