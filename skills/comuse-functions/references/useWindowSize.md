---
category: Elements
---

# useWindowSize

Reactive window size

## Usage

```vue
<script setup lang="ts">
import { useWindowSize } from 'comuse-core'

const { width, height } = useWindowSize()
</script>

<template>
  <div>
    Width: {{ width }}
    Height: {{ height }}
  </div>
</template>
```

## Options

### `initialWidth` and `initialHeight`

Set initial width and height values (default: `Number.POSITIVE_INFINITY`):

```ts
const { width, height } = useWindowSize({
  initialWidth: 100,
  initialHeight: 200
})
```

### `includeScrollbar`

Whether to include scrollbar in width and height (default: `true`):

```ts
// Exclude scrollbar
const { width, height } = useWindowSize({
  includeScrollbar: false
})
```

### `type`

Choose measurement type: `'inner'` | `'outer'` | `'visual'` (default: `'inner'`):

```ts
// Use outer dimensions
const { width, height } = useWindowSize({
  type: 'outer'
})

// Use visual viewport (for mobile)
const { width, height } = useWindowSize({
  type: 'visual'
})
```

### `listenOrientation`

Listen to window orientation change (default: `true`):

```ts
const { width, height } = useWindowSize({
  listenOrientation: false
})
```
