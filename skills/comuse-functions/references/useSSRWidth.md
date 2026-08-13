---
category: SSR
---

# useSSRWidth

Get the SSR width that has been set.

## Usage

```ts
import { provideSSRWidth, useSSRWidth } from 'comuse-core'

// Provide SSR width globally
provideSSRWidth(768)

// Use SSR width in components
const ssrWidth = useSSRWidth()
console.log(ssrWidth) // 768
```

### With App

You can also provide SSR width for the entire app:

```ts
import { createApp } from 'vue'
import { provideSSRWidth } from 'comuse-core'

const app = createApp(App)
provideSSRWidth(1024, app)
```

### Use with useMediaQuery

This is commonly used with `useMediaQuery` for SSR support:

```ts
import { useMediaQuery } from 'comuse-core'

const isLarge = useMediaQuery('(min-width: 1024px)', {
  ssrWidth: 768
})
```

Or provide globally:

```ts
import { provideSSRWidth, useMediaQuery } from 'comuse-core'

// Setup once
provideSSRWidth(768)

// All useMediaQuery calls will use this width
const isLarge = useMediaQuery('(min-width: 1024px)')
```
