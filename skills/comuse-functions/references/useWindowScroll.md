---
category: Elements
---

# useWindowScroll

Reactive window scroll.

## Usage

```vue
<script setup lang="ts">
import { useWindowScroll } from 'comuse-core'

const { x, y } = useWindowScroll()
</script>

<template>
  <div>
    read current x, y scroll: {{ x }}, {{ y }}
  </div>
  <button @click="x = 100">
    scroll X to 100
  </button>
  <button @click="y = 100">
    scroll Y to 100
  </button>
</template>
```

## With Options

```ts
import { useWindowScroll } from 'comuse-core'

const { x, y, isScrolling, arrivedState, directions } = useWindowScroll({
  behavior: 'smooth', // smooth scrolling
  throttle: 100,      // throttle scroll events
  onScroll: (e) => {
    console.log('scrolling')
  },
  onStop: (e) => {
    console.log('scroll ended')
  },
})
```

## Return Values

Same as `useScroll`:
- `x` - Horizontal scroll position (writable)
- `y` - Vertical scroll position (writable)
- `isScrolling` - Whether the window is currently scrolling
- `arrivedState` - Object with `left`, `right`, `top`, `bottom` booleans
- `directions` - Object with `left`, `right`, `top`, `bottom` booleans
- `measure` - Function to manually recalculate scroll state
