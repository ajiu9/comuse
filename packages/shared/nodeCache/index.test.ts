import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Cache } from './index'

describe('Cache', () => {
  let cache: Cache

  beforeEach(() => {
    cache = new Cache()
  })

  afterEach(() => {
    cache.clear()
  })

  describe('put', () => {
    it('should store a value', () => {
      const result = cache.put('foo', 'bar')
      expect(result).toBe('bar')
      expect(cache.get('foo')).toBe('bar')
    })

    it('should store a value with TTL', async () => {
      vi.useFakeTimers()

      cache.put('houdini', 'disappear', 100)
      expect(cache.get('houdini')).toBe('disappear')

      vi.advanceTimersByTime(100)
      expect(cache.get('houdini')).toBe(null)

      vi.useRealTimers()
    })

    it('should call timeout callback when entry expires', async () => {
      vi.useFakeTimers()
      const callback = vi.fn()

      cache.put('houdini', 'disappear', 100, callback)
      vi.advanceTimersByTime(100)

      expect(callback).toHaveBeenCalledWith('houdini', 'disappear')

      vi.useRealTimers()
    })

    it('should throw error for invalid time parameter', () => {
      expect(() => cache.put('key', 'value', -1)).toThrow('Cache timeout must be a positive number')
      expect(() => cache.put('key', 'value', NaN)).toThrow('Cache timeout must be a positive number')
      expect(() => cache.put('key', 'value', 'invalid' as any)).toThrow('Cache timeout must be a positive number')
    })

    it('should throw error for invalid timeoutCallback', () => {
      expect(() => cache.put('key', 'value', 100, 'invalid' as any)).toThrow('Cache timeout callback must be a function')
    })

    it('should update existing key', () => {
      cache.put('foo', 'bar')
      cache.put('foo', 'baz')
      expect(cache.get('foo')).toBe('baz')
      expect(cache.size()).toBe(1)
    })

    it('should store complex objects', () => {
      const obj = { name: 'test', values: [1, 2, 3] }
      cache.put('obj', obj)
      expect(cache.get('obj')).toEqual(obj)
    })
  })

  describe('get', () => {
    it('should return null for non-existent key', () => {
      expect(cache.get('nonexistent')).toBe(null)
    })

    it('should return value for existing key', () => {
      cache.put('foo', 'bar')
      expect(cache.get('foo')).toBe('bar')
    })

    it('should return null for expired key', async () => {
      vi.useFakeTimers()

      cache.put('expired', 'value', 50)
      vi.advanceTimersByTime(50)

      expect(cache.get('expired')).toBe(null)
      expect(cache.size()).toBe(0)

      vi.useRealTimers()
    })
  })

  describe('del', () => {
    it('should delete existing key', () => {
      cache.put('foo', 'bar')
      expect(cache.del('foo')).toBe(true)
      expect(cache.get('foo')).toBe(null)
      expect(cache.size()).toBe(0)
    })

    it('should return false for non-existent key', () => {
      expect(cache.del('nonexistent')).toBe(false)
    })

    it('should return false for expired key', async () => {
      vi.useFakeTimers()

      cache.put('expired', 'value', 50)
      vi.advanceTimersByTime(50)

      expect(cache.del('expired')).toBe(false)

      vi.useRealTimers()
    })

    it('should clear timeout when deleting', async () => {
      vi.useFakeTimers()
      const callback = vi.fn()

      cache.put('key', 'value', 100, callback)
      cache.del('key')

      vi.advanceTimersByTime(100)
      expect(callback).not.toHaveBeenCalled()

      vi.useRealTimers()
    })
  })

  describe('clear', () => {
    it('should clear all keys', () => {
      cache.put('foo', 'bar')
      cache.put('baz', 'qux')
      cache.clear()
      expect(cache.get('foo')).toBe(null)
      expect(cache.get('baz')).toBe(null)
      expect(cache.size()).toBe(0)
    })

    it('should clear all timeouts', async () => {
      vi.useFakeTimers()
      const callback1 = vi.fn()
      const callback2 = vi.fn()

      cache.put('key1', 'value1', 100, callback1)
      cache.put('key2', 'value2', 100, callback2)
      cache.clear()

      vi.advanceTimersByTime(100)
      expect(callback1).not.toHaveBeenCalled()
      expect(callback2).not.toHaveBeenCalled()

      vi.useRealTimers()
    })

    it('should reset hit/miss counts in debug mode', () => {
      cache.debug(true)
      cache.put('foo', 'bar')
      cache.get('foo') // hit
      cache.get('nonexistent') // miss

      expect(cache.hits()).toBe(1)
      expect(cache.misses()).toBe(1)

      cache.clear()
      expect(cache.hits()).toBe(0)
      expect(cache.misses()).toBe(0)
    })
  })

  describe('size and memsize', () => {
    it('should return correct size', () => {
      expect(cache.size()).toBe(0)

      cache.put('foo', 'bar')
      expect(cache.size()).toBe(1)

      cache.put('baz', 'qux')
      expect(cache.size()).toBe(2)

      cache.del('foo')
      expect(cache.size()).toBe(1)
    })

    it('should return correct memsize', () => {
      expect(cache.memsize()).toBe(0)

      cache.put('foo', 'bar')
      expect(cache.memsize()).toBe(1)

      cache.put('baz', 'qux')
      expect(cache.memsize()).toBe(2)
    })
  })

  describe('debug', () => {
    it('should track hits and misses when debug is on', () => {
      cache.debug(true)
      cache.put('foo', 'bar')

      cache.get('foo')
      expect(cache.hits()).toBe(1)
      expect(cache.misses()).toBe(0)

      cache.get('nonexistent')
      expect(cache.hits()).toBe(1)
      expect(cache.misses()).toBe(1)
    })

    it('should not track hits and misses when debug is off', () => {
      cache.debug(false)
      cache.put('foo', 'bar')

      cache.get('foo')
      expect(cache.hits()).toBe(0)
      expect(cache.misses()).toBe(0)
    })
  })

  describe('keys', () => {
    it('should return all keys', () => {
      cache.put('foo', 'bar')
      cache.put('baz', 'qux')
      expect(cache.keys()).toEqual(['foo', 'baz'])
    })

    it('should return empty array for empty cache', () => {
      expect(cache.keys()).toEqual([])
    })
  })

  describe('exportJson and importJson', () => {
    it('should export and import cache data', () => {
      cache.put('foo', 'bar')
      cache.put('baz', 'qux')

      const exported = cache.exportJson()
      expect(exported).toBeDefined()

      const newCache = new Cache()
      const size = newCache.importJson(exported)
      expect(size).toBe(2)
      expect(newCache.get('foo')).toBe('bar')
      expect(newCache.get('baz')).toBe('qux')
    })

    it('should handle TTL entries in export/import', async () => {
      vi.useFakeTimers()

      cache.put('ttl', 'value', 1000)
      const exported = cache.exportJson()

      const newCache = new Cache()
      const startTime = Date.now()
      vi.setSystemTime(startTime)

      newCache.importJson(exported)
      expect(newCache.get('ttl')).toBe('value')

      vi.advanceTimersByTime(1000)
      expect(newCache.get('ttl')).toBe(null)

      vi.useRealTimers()
    })

    it('should handle entries without TTL', () => {
      cache.put('permanent', 'value') // No TTL
      const exported = cache.exportJson()

      const newCache = new Cache()
      newCache.importJson(exported)
      expect(newCache.get('permanent')).toBe('value')
    })

    it('should skip duplicates when skipDuplicates is true', () => {
      cache.put('foo', 'bar')
      const exported = cache.exportJson()

      const newCache = new Cache()
      newCache.put('foo', 'original')
      newCache.importJson(exported, { skipDuplicates: true })

      expect(newCache.get('foo')).toBe('original')
    })

    it('should overwrite duplicates when skipDuplicates is false', () => {
      cache.put('foo', 'bar')
      const exported = cache.exportJson()

      const newCache = new Cache()
      newCache.put('foo', 'original')
      newCache.importJson(exported, { skipDuplicates: false })

      expect(newCache.get('foo')).toBe('bar')
    })

    it('should expire entries that would have expired since export', async () => {
      vi.useFakeTimers()

      cache.put('expired', 'value', 50)
      const exported = cache.exportJson()

      vi.advanceTimersByTime(50)

      const newCache = new Cache()
      const size = newCache.importJson(exported)
      expect(size).toBe(0)
      expect(newCache.get('expired')).toBe(null)

      vi.useRealTimers()
    })
  })

  describe('multiple instances', () => {
    it('should work independently with multiple instances', () => {
      const cache1 = new Cache()
      const cache2 = new Cache()

      cache1.put('foo', 'bar1')
      cache2.put('foo', 'bar2')

      expect(cache1.get('foo')).toBe('bar1')
      expect(cache2.get('foo')).toBe('bar2')

      cache1.clear()
      cache2.clear()
    })
  })

  describe('type safety', () => {
    it('should preserve types', () => {
      const num = 42
      const str = 'hello'
      const obj = { key: 'value' }
      const arr = [1, 2, 3]

      cache.put('num', num)
      cache.put('str', str)
      cache.put('obj', obj)
      cache.put('arr', arr)

      expect(cache.get<number>('num')).toBe(num)
      expect(cache.get<string>('str')).toBe(str)
      expect(cache.get<{ key: string }>('obj')).toEqual(obj)
      expect(cache.get<number[]>('arr')).toEqual(arr)
    })
  })
})
