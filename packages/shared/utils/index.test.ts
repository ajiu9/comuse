import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { debounce, randomString, splitKeyValues, throttle } from './index'

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

describe('throttle', () => {
  let callback: vi.Mock

  beforeEach(() => {
    callback = vi.fn()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  it('should call the function immediately on the first call', () => {
    const throttled = throttle(callback, 100)
    throttled()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should not call the function after the delay if not called again', () => {
    const throttled = throttle(callback, 100)
    throttled()
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)
  })
  it('should call the function one time after the delay', () => {
    const throttled = throttle(callback, 100)
    throttled()
    throttled()
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should call the function with the correct context and arguments', () => {
    const context = { name: 'test' }
    const throttled = throttle(function (this: any, arg: any) {
      callback(this, arg)
    }, 100)

    throttled.call(context, 'argument')
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledWith(context, 'argument')
  })
})

describe('splitKeyValues', () => {
  it('should split key values correctly', () => {
    const result = splitKeyValues('id1,id2', 'name1,name2')
    expect(result).toEqual([{ id: 'id1', name: 'name1' }, { id: 'id2', name: 'name2' }])
  })
})

describe('randomString', () => {
  it('should generate a random string', () => {
    const result = randomString(32)
    expect(result).toHaveLength(32)
  })
  it('should only generate  alphanumeric characters', () => {
    const result = randomString(32)
    const regex = /^[a-zA-Z0-9]+$/
    expect(result).toMatch(regex)
  })
  it('should generate a random string with numbers only', () => {
    const result = randomString(32, 'number')
    const regex = /^[0-9]+$/
    expect(result).toMatch(regex)
  })
})
