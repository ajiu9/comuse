import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { debounce } from './index'

describe('debounce', () => {
  let callback: vi.Mock

  beforeEach(() => {
    callback = vi.fn()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  it('should not call the function immediately on the first call', () => {
    const debounced = debounce(callback, 100)
    debounced()
    expect(callback).not.toHaveBeenCalled()
  })

  it('should call the function after the delay if not called again', () => {
    const debounced = debounce(callback, 100)
    debounced()
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should reset the timer on subsequent calls within the delay', () => {
    const debounced = debounce(callback, 100)
    debounced()
    debounced()
    vi.advanceTimersByTime(50)
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should call the function with the correct context and arguments', () => {
    const context = { name: 'test' }
    const debounced = debounce(function (this: any, arg: any) {
      callback(this, arg)
    }, 100)

    debounced.call(context, 'argument')
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledWith(context, 'argument')
  })
})
