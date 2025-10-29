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
export declare function promiseFactory<T extends object>(original: T, resolver: () => Promise<any>): T & PromiseLike<T>;
export interface SingletonPromiseReturn<T> {
    (): Promise<T>;
    /**
     * Reset current staled promise.
     * Await it to have proper shutdown.
     */
    reset: () => Promise<void>;
}
/**
 * Create singleton promise function
 *
 * @category Promise
 */
export declare function createSingletonPromise<T>(fn: () => Promise<T>): SingletonPromiseReturn<T>;
