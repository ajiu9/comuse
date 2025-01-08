import type { AnyFn, ArgumentsType, Promisify, PromisifyFn } from './types'

export * from './fixNumber'
export * from './is'
export * from './pattern'
export * from './types'

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

/**
 * @param {Function} fn
 * @param {number} delay
 */
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

export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return

export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
  fn: FunctionArgs<Args, This>
  args: Args
  thisArg: This
}

export type EventFilter<Args extends any[] = any[], This = any, Invoke extends AnyFn = AnyFn> = (
  invoke: Invoke,
  options: FunctionWrapperOptions<Args, This>
) => ReturnType<Invoke> | Promisify<ReturnType<Invoke>>

/**
 * @internal
 */
export function createFilterWrapper<T extends AnyFn>(filter: EventFilter, fn: T) {
  function wrapper(this: any, ...args: ArgumentsType<T>) {
    return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      // make sure it's a promise
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args }))
        .then(resolve)
        .catch(reject)
    })
  }

  return wrapper
}

export interface ThrottleFilterOptions {
  /**
   * The maximum time allowed to be delayed before it's invoked.
   */
  delay: number
  /**
   * Whether to invoke on the trailing edge of the timeout.
   */
  trailing?: boolean
  /**
   * Whether to invoke on the leading edge of the timeout.
   */
  leading?: boolean
  /**
   * Whether to reject the last call if it's been cancel.
   */
  rejectOnCancel?: boolean
}

/**
 * Create an EventFilter that throttle the events
 *
 * @param ms
 * @param [trailing]
 * @param [leading]
 * @param [rejectOnCancel]
 */

export function throttleFilter(ms: number, trailing?: boolean, leading?: boolean, rejectOnCancel?: boolean): EventFilter
export function throttleFilter(options: ThrottleFilterOptions): EventFilter
export function throttleFilter(...args: any[]) {
  let lastExec = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let isLeading = true
  let lastRejector: AnyFn = NOOP
  let lastValue: any
  let ms: number
  let trailing: boolean
  let leading: boolean
  let rejectOnCancel: boolean

  if (typeof args[0] === 'object')
    ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0])
  else
    [ms, trailing = true, leading = true, rejectOnCancel = false] = args

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
      lastRejector()
      lastRejector = NOOP
    }
  }

  const filter: EventFilter = (_invoke) => {
    const duration = ms
    const elapsed = Date.now() - lastExec
    const invoke = () => {
      return lastValue = _invoke()
    }

    clear()

    if (duration <= 0) {
      lastExec = Date.now()
      return invoke()
    }

    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now()
      invoke()
    }
    else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve
        timer = setTimeout(() => {
          lastExec = Date.now()
          isLeading = true
          resolve(invoke())
          clear()
        }, Math.max(0, duration - elapsed))
      })
    }

    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration)

    isLeading = false
    return lastValue
  }

  return filter
}

export function useThrottle< T extends FunctionArgs>(
  fn: T,
  ms: number = 200,
  trailing = false,
  leading = true,
  rejectOnCancel = false,
): PromisifyFn<T> {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn,
  )
}
