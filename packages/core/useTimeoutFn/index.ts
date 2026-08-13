import type { AnyFn } from 'comuse-shared'

import type { MaybeRefOrGetter } from 'vue'
import type { Stoppable, TimerHandle } from '../utils/types'

import { isClient } from 'comuse-shared'
import { shallowReadonly, shallowRef, toValue } from 'vue'
import { tryOnScopeDispose } from '../tryOnScopeDispose'

export interface UseTimeoutFnOptions {
  /**
   * Start the timer immediately
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Execute the callback immediately after calling `start`
   *
   * @default false
   */
  immediateCallback?: boolean
}

export type UseTimeoutFnReturn<CallbackFn extends AnyFn> = Stoppable<Parameters<CallbackFn> | []>

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useTimeoutFn<CallbackFn extends AnyFn>(
  cb: CallbackFn,
  interval: MaybeRefOrGetter<number>,
  options: UseTimeoutFnOptions = {},
): UseTimeoutFnReturn<CallbackFn> {
  const {
    immediate = true,
    immediateCallback = false,
  } = options

  const isPending = shallowRef(false)

  let timer: TimerHandle

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  function stop() {
    isPending.value = false
    clear()
  }

  function start(...args: Parameters<CallbackFn> | []) {
    if (immediateCallback)
      cb()
    clear()
    isPending.value = true
    timer = setTimeout(() => {
      isPending.value = false
      timer = undefined

      cb(...args)
    }, toValue(interval))
  }

  if (immediate) {
    isPending.value = true
    if (isClient)
      start()
  }

  tryOnScopeDispose(stop)

  return {
    isPending: shallowReadonly(isPending),
    start,
    stop,
  }
}
