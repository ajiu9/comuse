import type { Fn } from 'typing-ts'

import type { MaybeRef, MaybeRefOrGetter, Ref } from 'vue'

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
