import type { FunctionArgs, PromisifyFn } from '../utils'
import { createFilterWrapper, throttleFilter } from '../utils'

export function useThrottle< T extends FunctionArgs>(
  fn: T,
  ms: number = 200,
  trailing = false,
  leading = true,
  rejectOnCancel = false,
): PromisifyFn<T> {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn,
  )
}
