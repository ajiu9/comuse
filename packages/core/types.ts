import type { ComponentPublicInstance, MaybeRef, MaybeRefOrGetter, Ref, WatchOptions } from 'vue'

export type Fn = () => void
export type ShallowUnwrapRef<T> = T extends Ref<infer P> ? P : T

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never

export type {
  MaybeRef,
  MaybeRefOrGetter,
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

export type VueInstance = ComponentPublicInstance

export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeRefOrGetter<T>
export type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null

/**
 * A ref that allow to set null or undefined
 */
export type RemovableRef<T> = Omit<Ref<T>, 'value'> & {
  get value(): T
  set value(value: T | null | undefined)
}

export interface ConfigurableFlush {
  /**
   * Timing for monitoring changes, refer to WatchOptions for more details
   *
   * @default 'pre'
   */
  flush?: WatchOptions['flush']
}
