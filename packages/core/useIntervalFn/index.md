---
category: Animation
---

# useIntervalFn

Wrapper for `setInterval` with controls

## Usage

```ts
import { useIntervalFn } from 'comuse-core'

const { pause, resume, isActive } = useIntervalFn(() => {
  /* your function */
}, 1000)
```
