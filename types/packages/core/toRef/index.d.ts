import type { ComputedRef, MaybeRefOrGetter, Ref, ToRef } from 'vue';
/**
 * Normalize value/ref/getter to `ref` or `computed`.
 */
export declare function toRef<T>(r: () => T): Readonly<Ref<T>>;
export declare function toRef<T>(r: ComputedRef<T>): ComputedRef<T>;
export declare function toRef<T>(r: MaybeRefOrGetter<T>): Ref<T>;
export declare function toRef<T>(r: T): Ref<T>;
export declare function toRef<T extends object, K extends keyof T>(object: T, key: K): ToRef<T[K]>;
export declare function toRef<T extends object, K extends keyof T>(object: T, key: K, defaultValue: T[K]): ToRef<Exclude<T[K], undefined>>;
