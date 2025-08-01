import type { DebounceFilterOptions, FunctionArgs, PromisifyFn } from '../utils'
import { createFilterWrapper, debounceFilter } from '../utils'

/**
 * Debounce execution of a function.
 *
 * @param  fn          A function to be executed after delay milliseconds debounced.
 * @param  ms          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  options     Options
 *
 * @return A new, debounce, function.
 */
export function useDebounce<T extends FunctionArgs>(
  fn: T,
  ms: number = 200,
  options: DebounceFilterOptions = {},
): PromisifyFn<T> {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn,
  )
}
