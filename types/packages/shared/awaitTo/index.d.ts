export type PromiseAll<P extends readonly unknown[] | []> = {
    -readonly [K in keyof P]: Promise<P[K]>;
};
/**
 * Async await wrapper for easy error handling
 *
 * @example
 * ```ts
 * const bar = () => new Promise<boolean>((resolve, reject) => {})
 * const foo = () => new Promise<string>((resolve, reject) => {})
 * ;(async () => {
 *   const [err, data] = await awaitTo(bar())
 *   const [err2, data2] = await awaitTo([bar(), foo()])
 * })()
 * ```
 * @since 1.0.0
 * @param promise - Promise or an array of Promises
 * @return - result
 */
export declare function awaitTo<T, E = Error>(promise: Promise<T>): Promise<[E, undefined] | [null, T]>;
export declare function awaitTo<P extends readonly unknown[] | [], E = Error>(promise: PromiseAll<P>): Promise<[E, undefined] | [null, P]>;
export declare function awaitTo<T, P extends readonly unknown[] | [], E = Error>(promise: Promise<T>, ...promises: PromiseAll<P>): Promise<[E, undefined] | [null, [T, ...P]]>;
export { awaitTo as to };
