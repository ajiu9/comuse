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

## Type Declarations

```ts
/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param   fn             A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param   ms             A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 *                                    (default value: 200)
 *
 * @param [trailing] if true, call fn again after the time is up (default value: false)
 *
 * @param [leading] if true, call fn on the leading edge of the ms timeout (default value: true)
 *
 * @param [rejectOnCancel] if true, reject the last call if it's been cancel (default value: false)
 *
 * @return  A new, throttled, function.
 */
export declare function useThrottle<T extends FunctionArgs>(
  fn: T,
  ms?: MaybeRefOrGetter<number>,
  trailing?: boolean,
  leading?: boolean,
  rejectOnCancel?: boolean,
): PromisifyFn<T>
```
