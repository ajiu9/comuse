import type { AnyFn } from '../types'

export * from './is'
export * from './pattern'

// general
export const EMPTY_OBJ: { readonly [key: string]: any } = {}
export const EMPTY_ARR = []
export const NOOP = () => {}

/**
 * Always return false.
 */
export const NO = () => false

export const extend = Object.assign

/**
 * waiting for a while
 *
 * @param ms - waiting time (milliseconds)
 * @param throwOnTimeout - throw on timeout
 * @param reason - reason
 */
export function waiting(
  ms: number,
  throwOnTimeout = false,
  reason = 'Timeout',
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout)
      setTimeout(() => reject(reason), ms)
    else
      setTimeout(resolve, ms)
  })
}

export function identify<T>(arg: T): T {
  return arg
}

export function invoke<T>(fn: () => T): T {
  return fn()
}

/**
 * Convert an object to a promise like api
 *
 * @example
 * ```js
 * import { promiseFactory, waiting } from 'comuse-shared'
 *
 * function promise() {
 *   const stats = {
 *    value: 100
 *   }
 *
 *   const resolver = () =>
 *     new Promise(resolve =>
 *       waiting(2000).then(() => {
 *         stats.value = 200
 *         resolve(stats)
 *       })
 *     )
 *
 *   return promiseFactory(stats, resolver)
 * }
 *
 * const res = promise() // res => 100
 * const res = await promise() // res => 200
 * ```
 * @param original - original object
 * @param resolver - resolver function
 * @returns - result
 */
export function promiseFactory<T extends object>(
  original: T,
  resolver: () => Promise<any>,
): T & PromiseLike<T> {
  return {
    ...original,
    then<TResult1 = T, TResult2 = never>(
      onFulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
      onRejected?: (reason: any) => TResult2 | PromiseLike<TResult2>,
    ): PromiseLike<TResult1 | TResult2> {
      return resolver().then(onFulfilled, onRejected)
    },
  }
}

export function debounce(fn: AnyFn, delay: number) {
  let timer: ReturnType<typeof setTimeout> | undefined

  return function (this: any, ...args: any[]) {
    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function throttle(fn: AnyFn, duration: number) {
  let shouldAwait = false

  return function (this: any, ...args: any[]) {
    if (!shouldAwait) {
      fn.apply(this, args)
      shouldAwait = true

      setTimeout(() => {
        shouldAwait = false
      }, duration)
    }
  }
}

export function splitKeyValues(
  id: string,
  name: string,
  options?: { separator?: string, key?: string, value?: string },
): { [key: string]: string }[] {
  let data: { [key: string]: string }[] = []
  const separator = options?.separator || ','
  const key = options?.key || 'id'
  const value = options?.value || 'name'

  if (id && name) {
    const names = name.split(separator)
    data = id.split(separator).map((item, index) => {
      return {
        [key]: item,
        [value]: names[index],
      }
    })
  }
  return data
}

/**
 * Test if a function executes within a specified timeout period
 * @param fn Function to test
 * @param timeout Timeout duration in milliseconds
 * @returns Promise that resolves if function completes within timeout, rejects otherwise
 */
export function testTimeout<T>(fn: () => Promise<T>, timeout: number): Promise<T> {
  return Promise.race([
    fn(),
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Function execution timed out'))
      }, timeout)
    }),
  ])
}

/**
 * Generate a random string of specified length and type
 * @param length Length of the random string
 * @param type Type of characters to include (default: 'mix', options: 'number', 'mix')
 * @returns Random string
 */
type RandomStringType = 'number' | 'mix'
export function randomString(length = 8, type: RandomStringType = 'mix'): string {
  let result = ''
  if (type === 'number') {
    for (let t = 0; t < length; t++)
      result += Math.floor(Math.random() * 10).toString()
  }
  else {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++)
      result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Browser-side generation of uuid, using v4 method
 *
 * @example
 * ```ts
 * uuid() // '4222fcfe-5721-4632-bede-6043885be57d'
 * ```
 * @returns - uuid
 */
export const uuid = (): string =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  )
