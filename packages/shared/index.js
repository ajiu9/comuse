export * from './addEvent'
export * from './amountCapital'
export * from './animation'
export * from './array'
export * from './awaitTo'
export * from './clone'
export * from './compareNumbers'
export * from './ease'
export * from './gesture'
export * from './keyMap'
export * from './parseGitUrl'
export * from './parseTime'
export * from './removeEvent'
export * from './utils'
export * from './windowPrint'
/**
 * Create singleton promise function
 *
 * @example
 * ```
 * const promise = createSingletonPromise(async () => { ... })
 *
 * await promise()
 * await promise() // all of them will be bind to a single promise instance
 * await promise() // and be resolved together
 * ```
 */
export function createSingletonPromise(fn) {
  let _promise
  function wrapper() {
    if (!_promise)
      _promise = fn()
    return _promise
  }
  wrapper.reset = async () => {
    const _prev = _promise
    _promise = undefined
    if (_prev)
      await _prev
  }
  return wrapper
}
