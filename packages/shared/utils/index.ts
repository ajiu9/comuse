import type { AnyFn } from '../types'
import { isClient } from '../env'

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
 * Open a file in the browser
 *
 * @param url - file url
 */
export function openFile(url: string) {
  if (!isClient) {
    console.warn('openFile can only be used in browser environment')
    return
  }

  let fileRead: any = document.body.querySelector('#file-read')
  let protocol = 'https:'
  try {
    protocol = parent?.location?.protocol || protocol
  }
  catch {}

  url = url.replace('http:', protocol)
  url = url.replace('https:', protocol)

  if (fileRead)
    fileRead.href = url

  else {
    fileRead = document.createElement('a')
    fileRead.id = 'file-read'
    fileRead.href = url
    fileRead.setAttribute('target', '_blank')
    document.body.appendChild(fileRead)
  }

  fileRead.click()
}

export function toThousand(val: any) {
  if (!val)
    return val === 0 || val === '0' ? 0 : ''

  val = val.toString()
  if (val.split('.').length === 1)
    return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  else
    return `${val.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$&,')}.${val.split('.')[1]}`
}
