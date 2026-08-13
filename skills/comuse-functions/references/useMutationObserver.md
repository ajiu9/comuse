---
category: Elements
---

# useMutationObserver

Watch for changes being made to the DOM tree. [MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## Usage

```vue
<script setup lang="ts">
import { useMutationObserver } from 'comuse-core'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const messages = ref<string[]>([])

useMutationObserver(el, (mutations) => {
  if (mutations[0])
    messages.value.push(mutations[0].attributeName!)
}, {
  attributes: true,
})
</script>

<template>
  <div ref="el">
    Hello World
  </div>
</template>
```

## Options

The options object extends `MutationObserverInit`, available options include:

- `attributes` - Set to true to watch for attribute changes
- `childList` - Set to true to watch for child node additions/removals
- `subtree` - Set to true to watch all descendants
- `characterData` - Set to true to watch for text content changes
- `attributeFilter` - Array of specific attribute names to watch

## Return Values

- `isSupported` - Whether MutationObserver is supported
- `stop` - Stop observing
- `takeRecords` - Get pending mutation records

## Example: Watch Text Changes

```ts
import { useMutationObserver } from 'comuse-core'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)

useMutationObserver(el, (mutations) => {
  mutations.forEach((mutation) => {
    console.log('Text changed:', mutation.target.textContent)
  })
}, {
  characterData: true,
  subtree: true,
})
```

## Example: Watch Multiple Elements

```ts
import { useMutationObserver } from 'comuse-core'
import { ref } from 'vue'

const el1 = ref<HTMLElement | null>(null)
const el2 = ref<HTMLElement | null>(null)

useMutationObserver([el1, el2], (mutations) => {
  console.log('Mutation detected:', mutations)
}, {
  childList: true,
})
```
