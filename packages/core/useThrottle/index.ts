import type { FunctionArgs } from 'comuse-shared'
import { createFilterWrapper, throttleFilter } from 'comuse-shared'

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
