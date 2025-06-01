---
category: Utilities
related: useDebounce
---

# useThrottle

Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.

## Usage

```js
import { useDebounce } from 'comuse-core'

const debounceFn = useDebounce(() => {
  // do something, it will be called at most 1 time per second
}, 1000)

window.addEventListener('resize', useDebounce)
```

## Recommended Reading

- [**Debounce vs Throttle**: Definitive Visual Guide](https://redd.one/blog/debounce-vs-throttle)
