<script setup lang="ts">
// import { computed, toRef } from 'vue'

// const search = toRef(query, 'search') as Ref<string | null>
</script>

<template>
  <div h="1px" bg="$vp-c-divider" m="t-4" />
  <div flex="~" class="children:my-auto" p="2">
    <i i-carbon-search m="r-2" opacity="50" />
    <!-- <input v-model="search" class="w-full" type="text" role="search" placeholder="Search..."> -->
  </div>
</template>
