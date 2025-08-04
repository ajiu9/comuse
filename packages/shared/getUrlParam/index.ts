import { inBrowser } from '../env'
import { parseUrlParam } from '../parseUrlParam'

/**
 * Get a single URL parameter (from the "location.search", before "#")
 *
 * @example
 * ```js
 * getUrlParam('key1')
 * // key1 => xxx
 *
 * getUrlParam('key1', 'https://test.com?key1=100#/home?key1=200')
 * // key1 => 100
 * ```
 * @param key - key name
 * @param url - pass in the url string
 * @returns - result
 */
export function getUrlParam(key: string): string | undefined
export function getUrlParam(key: string, url: string): string | undefined
export function getUrlParam(key: string, url?: string): string | undefined {
  if (!key) {
    // eslint-disable-next-line no-console
    console.info('key is required')
    return undefined
  }
  else if (!url) {
    if (!inBrowser) {
      // eslint-disable-next-line no-console
      console.info('url is required')
      return undefined
    }
    url = location?.search || ''
  }
  else
    url = url.slice(url.indexOf('?')).split('#')[0]

  return parseUrlParam(url)[key] as string | undefined
}
