---
category: Watch
---

# until

Promised one-time watch for changes

## Usage

#### Wait for some async data to be ready

```js
import { until, useAsyncState } from 'comuse/core'

const { state, isReady } = useAsyncState(
  fetch('https://jsonplaceholder.typicode.com/todos/1').then(t => t.json()),
  {},
)

;(async () => {
  await until(isReady).toBe(true)

  console.log(state) // state is now ready!
})()
```

#### Wait for custom conditions

> You can use `invoke` to call the async function.

```js
import { invoke, until, useCounter } from 'comuse-core'

const { count } = useCounter()

invoke(async () => {
  await until(count).toMatch(v => v > 7)

  alert('Counter is now larger than 7!')
})
```

#### Timeout

```ts
// will be resolve until ref.value === true or 1000ms passed
await until(ref).toBe(true, { timeout: 1000 })

// will throw if timeout
try {
  await until(ref).toBe(true, { timeout: 1000, throwOnTimeout: true })
  // ref.value === true
}
catch (e) {
  // timeout
}
```

#### More Examples

```ts
await until(ref).toBe(true)
await until(ref).toMatch(v => v > 10 && v < 100)
await until(ref).changed()
await until(ref).changedTimes(10)
await until(ref).toBeTruthy()
await until(ref).toBeNull()

await until(ref).not.toBeNull()
await until(ref).not.toBeTruthy()
```

## Type Declarations

```ts
export interface UntilToMatchOptions {
  /**
   * Milliseconds timeout for promise to resolve/reject if the when condition does not meet.
   * 0 for never timed out
   *
   * @default 0
   */
  timeout?: number
  /**
   * Reject the promise when timeout
   *
   * @default false
   */
  throwOnTimeout?: boolean
  /**
   * `flush` option for internal watch
   *
   * @default 'sync'
   */
  flush?: WatchOptions["flush"]
  /**
   * `deep` option for internal watch
   *
   * @default 'false'
   */
  deep?: WatchOptions["deep"]
}
export interface UntilBaseInstance<T, Not extends boolean = false> {
  toMatch: (<U extends T = T>(
    condition: (v: T) => v is U,
    options?: UntilToMatchOptions,
  ) => Not extends true ? Promise<Exclude<T, U>> : Promise<U>) &
    ((
      condition: (v: T) => boolean,
      options?: UntilToMatchOptions,
    ) => Promise<T>)
  changed: (options?: UntilToMatchOptions) => Promise<T>
  changedTimes: (n?: number, options?: UntilToMatchOptions) => Promise<T>
}
type Falsy = false | void | null | undefined | 0 | 0n | ""
export interface UntilValueInstance<T, Not extends boolean = false>
  extends UntilBaseInstance<T, Not> {
  readonly not: UntilValueInstance<T, Not extends true ? false : true>
  toBe: <P = T>(
    value: MaybeRefOrGetter<P>,
    options?: UntilToMatchOptions,
  ) => Not extends true ? Promise<T> : Promise<P>
  toBeTruthy: (
    options?: UntilToMatchOptions,
  ) => Not extends true ? Promise<T & Falsy> : Promise<Exclude<T, Falsy>>
  toBeNull: (
    options?: UntilToMatchOptions,
  ) => Not extends true ? Promise<Exclude<T, null>> : Promise<null>
  toBeUndefined: (
    options?: UntilToMatchOptions,
  ) => Not extends true ? Promise<Exclude<T, undefined>> : Promise<undefined>
  toBeNaN: (options?: UntilToMatchOptions) => Promise<T>
}
export interface UntilArrayInstance<T> extends UntilBaseInstance<T> {
  readonly not: UntilArrayInstance<T>
  toContains: (
    value: MaybeRefOrGetter<ElementOf<ShallowUnwrapRef<T>>>,
    options?: UntilToMatchOptions,
  ) => Promise<T>
}
export declare function until<T extends unknown[]>(
  r: WatchSource<T> | MaybeRefOrGetter<T>,
): UntilArrayInstance<T>
export declare function until<T>(
  r: WatchSource<T> | MaybeRefOrGetter<T>,
): UntilValueInstance<T>
```
