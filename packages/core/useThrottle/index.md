---
category: Utilities
related: useDebounce
---

# useThrottle

Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.

## Usage

```js
import { useThrottle } from 'comuse-core'

const throttledFn = useThrottle(() => {
  // do something, it will be called at most 1 time per second
}, 1000)

window.addEventListener('resize', throttled)
```

## Recommended Reading

- [**Debounce vs Throttle**: Definitive Visual Guide](https://redd.one/blog/debounce-vs-throttle)
