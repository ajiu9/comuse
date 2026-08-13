---
category: Animation
---

# useTimeoutFn

Wrapper for `setTimeout` with controls.

## Usage

```ts
import { useTimeoutFn } from 'comuse-core'

const { isPending, start, stop } = useTimeoutFn(() => {
  /* ... */
}, 3000)
```
