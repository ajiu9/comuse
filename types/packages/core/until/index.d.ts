import type { MaybeRefOrGetter, WatchOptions, WatchSource } from 'vue';
import type { ElementOf, ShallowUnwrapRef } from '../types';
export interface UntilToMatchOptions {
    /**
     * Milliseconds timeout for promise to resolve/reject if the when condition does not meet.
     * 0 for never timed out
     *
     * @default 0
     */
    timeout?: number;
    /**
     * Reject the promise when timeout
     *
     * @default false
     */
    throwOnTimeout?: boolean;
    /**
     * `flush` option for internal watch
     *
     * @default 'sync'
     */
    flush?: WatchOptions['flush'];
    /**
     * `deep` option for internal watch
     *
     * @default 'false'
     */
    deep?: WatchOptions['deep'];
}
export interface UntilBaseInstance<T, Not extends boolean = false> {
    toMatch: (<U extends T = T>(condition: (v: T) => v is U, options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, U>> : Promise<U>) & ((condition: (v: T) => boolean, options?: UntilToMatchOptions) => Promise<T>);
    changed: (options?: UntilToMatchOptions) => Promise<T>;
    changedTimes: (n?: number, options?: UntilToMatchOptions) => Promise<T>;
}
type Falsy = false | void | null | undefined | 0 | 0n | '';
export interface UntilValueInstance<T, Not extends boolean = false> extends UntilBaseInstance<T, Not> {
    readonly not: UntilValueInstance<T, Not extends true ? false : true>;
    toBe: <P = T>(value: MaybeRefOrGetter<P>, options?: UntilToMatchOptions) => Not extends true ? Promise<T> : Promise<P>;
    toBeTruthy: (options?: UntilToMatchOptions) => Not extends true ? Promise<T & Falsy> : Promise<Exclude<T, Falsy>>;
    toBeNull: (options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, null>> : Promise<null>;
    toBeUndefined: (options?: UntilToMatchOptions) => Not extends true ? Promise<Exclude<T, undefined>> : Promise<undefined>;
    toBeNaN: (options?: UntilToMatchOptions) => Promise<T>;
}
export interface UntilArrayInstance<T> extends UntilBaseInstance<T> {
    readonly not: UntilArrayInstance<T>;
    toContains: (value: MaybeRefOrGetter<ElementOf<ShallowUnwrapRef<T>>>, options?: UntilToMatchOptions) => Promise<T>;
}
export declare function until<T extends unknown[]>(r: WatchSource<T> | MaybeRefOrGetter<T>): UntilArrayInstance<T>;
export declare function until<T>(r: WatchSource<T> | MaybeRefOrGetter<T>): UntilValueInstance<T>;
export {};
