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
export declare function getQueryParam(key: string): string | undefined;
export declare function getQueryParam(key: string, url: string): string | undefined;
