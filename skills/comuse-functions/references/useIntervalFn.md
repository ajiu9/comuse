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

## Type Declarations

```ts
export interface UseIntervalFnOptions {
  /**
   * start the timer immediately
   *
   * @default true
   */
  immediate?: boolean
  /**
   * execute the callback immediately
   *
   * @default false
   */
  immediateCallback?: boolean
}
export type UseIntervalFnReturn = Pausable
/**
 * Wrapper for `setInterval` with controls
 *
 * @param cb
 * @param interval
 * @param options
 */
export declare function useIntervalFn(
  cb: Fn,
  interval?: MaybeRefOrGetter<number>,
  options?: UseIntervalFnOptions,
): UseIntervalFnReturn
```
