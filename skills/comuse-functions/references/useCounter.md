---
category: Utilities
---

# useCounter

Basic counter with utility functions.

## Basic Usage

```js
import { useCounter } from 'comuse-core'

const { count, inc, dec, set, reset } = useCounter()
```

## Usage with options

```js
import { useCounter } from 'comuse-core'

const { count, inc, dec, set, reset } = useCounter(1, { min: 0, max: 16 })
```

## Type Declarations

```ts
interface UseCounterOptions {
  min?: number
  max?: number
}
export declare function useCounter(
  initialValue?: MaybeRef<number>,
  options?: UseCounterOptions,
): {
  count:
    | Ref<number, number>
    | ShallowRef<number, number>
    | WritableComputedRef<number, number>
  inc: (delta?: number) => number
  dec: (delta?: number) => number
  get: () => number
  set: (value: number) => number
  reset: (val?: number) => number
}
```
