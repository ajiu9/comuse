---
category: Watch
alias: pausableWatch
---

# watchPausable

Pausable watch

::: tip

[Pausable Watcher](https://vuejs.org/api/reactivity-core.html#watch) has been added to Vue [since 3.5](https://github.com/vuejs/core/pull/9651), use `const { stop, pause, resume } = watch(watchSource, callback)` instead on supported versions.

:::

## Usage

Use as normal the `watch`, but return extra `pause()` and `resume()` functions to control.

```ts
import { watchPausable } from 'comuse-core'
import { nextTick, shallowRef } from 'vue'

const source = shallowRef('foo')

const { stop, pause, resume } = watchPausable(
  source,
  v => console.log(`Changed to ${v}!`),
)

source.value = 'bar'
await nextTick() // Changed to bar!

pause()

source.value = 'foobar'
await nextTick() // (nothing happend)

resume()

source.value = 'hello'
await nextTick() // Changed to hello!
```

## Type Declarations

```ts
export interface WatchPausableReturn extends Pausable {
  stop: WatchStopHandle
}
export type WatchPausableOptions<Immediate> =
  WatchWithFilterOptions<Immediate> & PausableFilterOptions
export declare function watchPausable<
  T extends Readonly<WatchSource<unknown>[]>,
  Immediate extends Readonly<boolean> = false,
>(
  sources: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchPausableOptions<Immediate>,
): WatchPausableReturn
export declare function watchPausable<
  T,
  Immediate extends Readonly<boolean> = false,
>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchPausableOptions<Immediate>,
): WatchPausableReturn
export declare function watchPausable<
  T extends object,
  Immediate extends Readonly<boolean> = false,
>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchPausableOptions<Immediate>,
): WatchPausableReturn
export { watchPausable as pausableWatch }
```
