/**
 * Memory cache implementation
 * - Full type safety
 * - Modern ES6+ features
 * - Clean code principles
 * - No magic numbers/strings
 */

import type { CacheRecord, ExportedCacheJson, ExportedCacheRecord, ImportOptions, TimeoutCallback } from './types'

export * from './types'

/**
 * A simple in-memory cache with TTL support
 */
export class Cache {
  private _cache = Object.create(null) as Record<string, CacheRecord>
  private _hitCount = 0
  private _missCount = 0
  private _size = 0
  private _debug = false

  /**
   * Stores a value in the cache
   *
   * @param key - Cache key
   * @param value - Value to cache
   * @param time - Time to live in milliseconds (optional)
   * @param timeoutCallback - Callback function when entry expires (optional)
   * @returns The cached value
   * @throws Error if time is not a positive number or timeoutCallback is not a function
   */
  put<T>(key: string, value: T, time?: number, timeoutCallback?: TimeoutCallback<T>): T {
    if (this._debug)
      console.warn('caching: %s = %j (@%s)', key, value, time)

    if (typeof time !== 'undefined' && (typeof time !== 'number' || isNaN(time) || time <= 0))
      throw new Error('Cache timeout must be a positive number')

    if (typeof timeoutCallback !== 'undefined' && typeof timeoutCallback !== 'function')
      throw new Error('Cache timeout callback must be a function')

    const oldRecord = this._cache[key]
    if (oldRecord)
      clearTimeout(oldRecord.timeout)
    else
      this._size++

    const expire = time ? time + Date.now() : NaN
    const record: CacheRecord<T> = {
      value,
      expire,
    }

    if (!isNaN(expire)) {
      record.timeout = setTimeout(() => {
        this._del(key)
        if (timeoutCallback)
          timeoutCallback(key, value)
      }, time!)
    }

    this._cache[key] = record as CacheRecord
    return value
  }

  /**
   * Deletes a key from the cache
   *
   * @param key - Cache key to delete
   * @returns Whether the key was deleted
   */
  del(key: string): boolean {
    const oldRecord = this._cache[key]

    if (!oldRecord)
      return false

    clearTimeout(oldRecord.timeout)

    // Only delete if not expired
    const canDelete = isNaN(oldRecord.expire) || oldRecord.expire >= Date.now()

    if (canDelete)
      this._del(key)

    return canDelete
  }

  /**
   * Internal delete method
   */
  private _del(key: string): void {
    this._size--
    delete this._cache[key]
  }

  /**
   * Clears all keys from the cache
   */
  clear(): void {
    for (const key in this._cache)
      clearTimeout(this._cache[key].timeout)
    this._size = 0
    this._cache = Object.create(null)

    if (this._debug) {
      this._hitCount = 0
      this._missCount = 0
    }
  }

  /**
   * Retrieves a value for a given key
   *
   * @param key - Cache key
   * @returns The cached value or null if not found/expired
   */
  get<T = any>(key: string): T | null {
    const data = this._cache[key]

    if (typeof data === 'undefined') {
      if (this._debug)
        this._missCount++
      return null
    }

    if (isNaN(data.expire) || data.expire >= Date.now()) {
      if (this._debug)
        this._hitCount++
      return data.value as T
    }

    // Expired - free some space
    if (this._debug) this._missCount++
    this._size--
    delete this._cache[key]
    return null
  }

  /**
   * Returns the current number of entries in the cache
   */
  size(): number {
    return this._size
  }

  /**
   * Returns the number of entries taking up space in the cache
   * Will usually == size() unless a setTimeout removal went wrong
   */
  memsize(): number {
    return Object.keys(this._cache).length
  }

  /**
   * Turns on or off debugging
   */
  debug(bool: boolean): void {
    this._debug = bool
  }

  /**
   * Returns the number of cache hits (only monitored in debug mode)
   */
  hits(): number {
    return this._hitCount
  }

  /**
   * Returns the number of cache misses (only monitored in debug mode)
   */
  misses(): number {
    return this._missCount
  }

  /**
   * Returns all the cache keys
   */
  keys(): string[] {
    return Object.keys(this._cache)
  }

  /**
   * Exports the cache data as JSON
   * Note: timeoutCallbacks will be ignored
   *
   * @returns JSON string representation of cache data
   */
  exportJson(): string {
    const plainJsCache: Record<string, ExportedCacheRecord> = {}

    // Discard the `timeout` property
    // Note: JSON doesn't support `NaN`, so convert it to `'NaN'`
    for (const key in this._cache) {
      const record = this._cache[key]
      plainJsCache[key] = {
        value: record.value,
        expire: record.expire || 'NaN',
      }
    }

    return JSON.stringify(plainJsCache)
  }

  /**
   * Imports cache data from JSON
   *
   * @param jsonToImport - JSON string from exportJson()
   * @param options - Import options
   * @returns The new size of the cache
   */
  importJson(jsonToImport: string, options?: ImportOptions): number {
    const cacheToImport = JSON.parse(jsonToImport) as ExportedCacheJson
    const currTime = Date.now()
    const skipDuplicates = options?.skipDuplicates ?? false

    for (const key in cacheToImport) {
      if (!Object.prototype.hasOwnProperty.call(cacheToImport, key))
        continue

      if (skipDuplicates) {
        const existingRecord = this._cache[key]
        if (existingRecord) {
          if (this._debug)
            console.warn('Skipping duplicate imported key \'%s\'', key)
          continue
        }
      }

      const record = cacheToImport[key]
      // record.expire could be `'NaN'` if no expiry was set
      // Try to subtract from it; a string minus a number is `NaN`
      const remainingTime = record.expire === 'NaN' ? NaN : (record.expire as number) - currTime

      if (!isNaN(remainingTime) && remainingTime <= 0) {
        // Delete any record that might exist with the same key
        this.del(key)
        continue
      }

      // Remaining time must now be either positive or `NaN`
      // but `put` will throw an error if we try to give it `NaN`
      const time = remainingTime > 0 ? remainingTime : undefined
      this.put(key, record.value, time)
    }

    return this.size()
  }
}

// Default singleton instance
export const cache = new Cache()

// Default export for backward compatibility
export default cache
