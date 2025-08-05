import type { MaybeRefOrGetter } from 'vue'
import type { Fn } from '../types'
import type { Pausable } from '../utils/types'
import { isClient } from 'comuse-shared'
import { isRef, shallowRef, toValue, watch } from 'vue'
import { tryOnScopeDispose } from '../tryOnScopeDispose'

export interface UseIntervalFnOptions {
  /**
   * start the timer immediately
   *
   * @default true
   */
  immediate?: boolean
  /**
   * execute the callback immediately
   *
   * @default false
   */
  immediateCallback?: boolean
}

export type UseIntervalFnReturn = Pausable

/**
 * Wrapper for `setInterval` with controls
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useIntervalFn(cb: Fn, interval: MaybeRefOrGetter<number> = 1000, options: UseIntervalFnOptions = {}): UseIntervalFnReturn {
  const {
    immediate = true,
    immediateCallback = false,
  } = options

  let timer: ReturnType<typeof setInterval> | null = null
  const isActive = shallowRef(false)

  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function pause() {
    isActive.value = false
    clean()
  }

  function resume() {
    const intervalValue = toValue(interval)
    if (intervalValue <= 0)
      return
    isActive.value = true
    if (immediateCallback)
      cb()
    clean()
    if (isActive.value)
      timer = setInterval(cb, intervalValue)
  }

  if (immediate && isClient)
    resume()

  if (isRef(interval) || typeof interval === 'function') {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume()
    })
    tryOnScopeDispose(stopWatch)
  }

  tryOnScopeDispose(pause)

  return {
    isActive,
    pause,
    resume,
  }
}
