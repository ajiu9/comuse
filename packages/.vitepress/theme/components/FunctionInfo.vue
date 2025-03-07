<script setup lang="ts">
import { functions } from 'comuse-metadata'
import { formatTime } from 'comuse-shared'
import { computed } from 'vue'

const props = defineProps<{ fn: string }>()
const info = computed(() => functions.find(i => i.name === props.fn)!)
const lastUpdated = formatTime(new Date(info.value?.lastUpdated || 0))
const link = computed(() => `/comuse/functions\#category=${encodeURIComponent(info.value!.category!)}`)

function getFunctionLink(fn: string) {
  const info = functions.find(i => i.name === fn)
  return info?.docs?.replace(/https?:\/\/ajiu9\.cn\//g, '/')
}
</script>

<template>
  <div class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-8 items-start">
    <div opacity="50">
      Category
    </div>
    <div><a :href="link">{{ info.category }}</a></div>
    <template v-if="info.package !== 'core' && info.package !== 'shared'">
      <div opacity="50">
        Package
      </div>
      <div><code>comuse/{{ info.package }}</code></div>
    </template>
    <template v-if="info.lastUpdated">
      <div opacity="50">
        Last Changed
      </div>
      <div>{{ lastUpdated }}</div>
    </template>
    <template v-if="info.alias?.length">
      <div opacity="50">
        Alias
      </div>
      <div flex="~ gap-1 wrap">
        <code v-for="(a, idx) of info.alias" :key="idx" class="!py-0">{{ a }}</code>
      </div>
    </template>
    <template v-if="info.related?.length">
      <div opacity="50">
        Related
      </div>
      <div flex="~ gap-1 wrap">
        <a
          v-for="(name, idx) of info.related"
          :key="idx"
          class="!py-0"
          :href="getFunctionLink(name)"
        >
          <code>{{ name }}</code>
        </a>
      </div>
    </template>
  </div>
</template>
