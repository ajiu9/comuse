import { isClient } from '../env'
import { parseUrlParam } from '../parseUrlParam'

/**
 * Get a single query parameter (behind "#")
 *
 * @example
 * ```js
 * getQueryParam('key1')
 * // key1 => xxx
 *
 * getQueryParam('key1', 'https://test.com?key1=100#/home?key1=200')
 * // key1 => 200
 * ```
 * @param key - key name
 * @param url - pass in the url string
 * @returns - result
 */
export function getQueryParam(key: string): string | undefined
export function getQueryParam(key: string, url: string): string | undefined
export function getQueryParam(key: string, url?: string): string | undefined {
  if (!key) {
    // eslint-disable-next-line no-console
    console.info('key is required')
    return undefined
  }
  else if (!url) {
    if (!isClient) {
      // eslint-disable-next-line no-console
      console.info('url is required')
      return undefined
    }
    url = location.href
  }
  const [before, after] = url.split('#')
  url = after || before
  url = url.slice(url.lastIndexOf('?'))
  return parseUrlParam(url)[key] as string | undefined
}
