import type { MaybeRef } from 'vue'
import { shallowRef, unref } from 'vue'

interface UseCounterOptions {
  min?: number
  max?: number
}

export function useCounter(initialValue: MaybeRef<number> = 0, options: UseCounterOptions = {}) {
  let _initialValue = unref(initialValue)
  const count = shallowRef(initialValue)

  const {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
  } = options

  const inc = (delta = 1) => count.value = Math.max(Math.min(max, count.value + delta), min)
  const dec = (delta = 1) => (count.value = Math.max(Math.min(max, count.value - delta), min))
  const get = () => count.value
  const set = (value: number) => (count.value = Math.max(Math.min(max, value), min))
  const reset = (val = _initialValue) => {
    _initialValue = val
    return set(val)
  }

  return { count, inc, dec, get, set, reset }
}
