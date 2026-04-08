---
category: Utilities
---

## debounce

### usage

```ts
import { debounce } from 'comuse-shared'

const fn = debounce(() => {
  console.log('debounced')
}, 1000)

fn()
```

## throttle

### usage

```ts
import { throttle } from 'comuse-shared'

const fn = throttle(() => {
  console.log('throttled')
}, 1000)

fn()
```

## splitKeyValues

### usage

```ts
import { splitKeyValues } from 'comuse-shared'

const data = splitKeyValues('id1,id2', 'name1,name2')

console.log(data) // [{ id: 'id1', name: 'name1' }, { id: 'id2', name: 'name2' }]
```

## uuid

### usage

```ts
import { uuid } from 'comuse-shared'

console.log(uuid()) // '4222fcfe-5721-4632-bede-6043885be57d'
```

## openFile

### usage

```ts
import { openFile } from 'comuse-shared'

openFile('https://example.com/file.txt')
```

## toThousand

### usage

```ts
import { toThousand } from 'comuse-shared'

console.log(toThousand(1234567.89)) // '1,234,567'
```

### randomString

### usage

```ts
import { randomString } from 'comuse-shared'

console.log(randomString(10)) // 'a1b2c3d4e5'

console.log(randomString(10, 'number')) // '1234567890'
```

## Type Declarations

```ts
export * from "./is"
export * from "./pattern"
export declare const EMPTY_OBJ: {
  readonly [key: string]: any
}
export declare const EMPTY_ARR: never[]
export declare const NOOP: () => void
/**
 * Always return false.
 */
export declare const NO: () => boolean
export declare const extend: {
  <T extends {}, U>(target: T, source: U): T & U
  <T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V
  <T extends {}, U, V, W>(
    target: T,
    source1: U,
    source2: V,
    source3: W,
  ): T & U & V & W
  (target: object, ...sources: any[]): any
}
/**
 * waiting for a while
 *
 * @param ms - waiting time (milliseconds)
 * @param throwOnTimeout - throw on timeout
 * @param reason - reason
 */
export declare function waiting(
  ms: number,
  throwOnTimeout?: boolean,
  reason?: string,
): Promise<void>
export declare function identify<T>(arg: T): T
export declare function invoke<T>(fn: () => T): T
export declare function debounce(
  fn: AnyFn,
  delay: number,
): (this: any, ...args: any[]) => void
export declare function throttle(
  fn: AnyFn,
  duration: number,
): (this: any, ...args: any[]) => void
export declare function splitKeyValues(
  id: string,
  name: string,
  options?: {
    separator?: string
    key?: string
    value?: string
  },
): {
  [key: string]: string
}[]
/**
 * Test if a function executes within a specified timeout period
 * @param fn Function to test
 * @param timeout Timeout duration in milliseconds
 * @returns Promise that resolves if function completes within timeout, rejects otherwise
 */
export declare function testTimeout<T>(
  fn: () => Promise<T>,
  timeout: number,
): Promise<T>
/**
 * Generate a random string of specified length and type
 * @param length Length of the random string
 * @param type Type of characters to include (default: 'mix', options: 'number', 'mix')
 * @returns Random string
 */
type RandomStringType = "number" | "mix"
export declare function randomString(
  length?: number,
  type?: RandomStringType,
): string
/**
 * Open a file in the browser
 *
 * @param url - file url
 */
export declare function openFile(url: string): void
export declare function toThousand(val: any): any
```
