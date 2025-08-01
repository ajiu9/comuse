import type { ComputedRef, MaybeRefOrGetter, Ref, ToRef } from 'vue'
import { NOOP } from 'comuse-shared'
import { customRef, ref as deepRef, readonly, toRef as vueToRef } from 'vue'

/**
 * Normalize value/ref/getter to `ref` or `computed`.
 */
export function toRef<T>(r: () => T): Readonly<Ref<T>>
export function toRef<T>(r: ComputedRef<T>): ComputedRef<T>
export function toRef<T>(r: MaybeRefOrGetter<T>): Ref<T>
export function toRef<T>(r: T): Ref<T>
export function toRef<T extends object, K extends keyof T>(object: T, key: K): ToRef<T[K]>
export function toRef<T extends object, K extends keyof T>(object: T, key: K, defaultValue: T[K]): ToRef<Exclude<T[K], undefined>>
export function toRef(...args: any[]) {
  if (args.length !== 1)
    return vueToRef(...args as [any, any])
  const r = args[0]
  return typeof r === 'function'
    ? readonly(customRef(() => ({ get: r as any, set: NOOP })))
    : deepRef(r)
}
