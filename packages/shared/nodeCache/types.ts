/**
 * Memory cache types
 */

export interface CacheRecord<T = any> {
  value: T
  expire: number
  timeout?: ReturnType<typeof setTimeout>
}

export interface ImportOptions {
  /**
   * If true, any duplicate keys will be ignored when importing them
   * @default false
   */
  skipDuplicates?: boolean
}

export interface TimeoutCallback<T = any> {
  (key: string, value: T): void
}

export interface ExportedCacheRecord<T = any> {
  value: T
  expire: number | 'NaN'
}

export type ExportedCacheJson = Record<string, ExportedCacheRecord>
