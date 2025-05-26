import type { MaybeRef, MaybeRefOrGetter, Ref } from 'vue'

export type Fn = () => void
export type AnyFn = (...args: any[]) => any
export type ShallowUnwrapRef<T> = T extends Ref<infer P> ? P : T

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never

export type {
  MaybeRef,
  MaybeRefOrGetter,
}

export interface Pausable {
  /**
   * A ref indicate whether a pausable instance is active
   */
  isActive: Readonly<Ref<boolean>>

  /**
   * Temporary pause the effect from executing
   */
  pause: Fn

  /**
   * Resume the effects
   */
  resume: Fn
}

export interface UseConvertObjectKeysReturn {
  /**
   * Convert object keys from camelCase to snake_case
   */
  camelToSnake: (str: string) => string

  /**
   * Convert object keys from snake_case to camelCase
   */
  snakeToCamel: (str: string) => string

  /**
   * Convert object keys between camelCase and snake_case
   */
  convertObjectKeys: (obj: Record<string, any>, toSnake?: boolean) => Record<string, any>
}
