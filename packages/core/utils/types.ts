/**
 * Void function
 */
export type Fn = () => void
export type AnyFn = (...args: any[]) => any
export type Promisify<T> = Promise<Awaited<T>>
export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never
export type PromisifyFn<T extends AnyFn> = (...args: ArgumentsType<T>) => Promisify<ReturnType<T>>
