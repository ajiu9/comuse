export * from './general'
export * from './is'
export * from './pattern'
export * from './types'

export function promiseTimeout(
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
 * waiting for a while
 *
 * @param milliseconds - waiting time (milliseconds)
 * @param throwOnTimeout - throw on timeout
 */
export const waiting = (milliseconds: number, throwOnTimeout = false): Promise<void> =>
  new Promise((resolve, reject) => setTimeout(throwOnTimeout ? reject : resolve, milliseconds))
