import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createFilterWrapper, throttleFilter } from './index'

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  it('should throttle', () => {
    const throttledFilterSpy = vi.fn()
    const filter = createFilterWrapper(throttleFilter(1000), throttledFilterSpy)
    setTimeout(filter, 500)
    setTimeout(filter, 500)
    setTimeout(filter, 500)
    setTimeout(filter, 500)

    vi.runAllTimers()

    expect(throttledFilterSpy).toHaveBeenCalledTimes(2)
  })
})
