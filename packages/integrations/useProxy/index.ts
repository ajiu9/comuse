import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { cache as defaultCache, waiting } from 'comuse-shared'

// ==================== Types ====================

export interface ProxyConfig {
  ip: string
  port: string
  [key: string]: any
}

export interface ProxySupplier {
  /** Supplier name */
  name: string
  /** Proxy API URL */
  url: string
  /** HTTP method, default GET */
  method?: 'GET' | 'POST'
  /** Additional axios config (params, headers, etc.) */
  config?: AxiosRequestConfig
  /** Parse the response, return ProxyConfig or null to trigger fallback to next supplier */
  parser: (response: any) => ProxyConfig | null
}

export interface CacheLike {
  get: (key: string) => any
  put: (key: string, value: any, ttl?: number) => void
  del: (key: string) => boolean
}

export interface UseProxyOptions {
  /** Proxy suppliers, tried in order */
  suppliers: ProxySupplier[]
  /** Create a proxy agent instance from ProxyConfig */
  createAgent: (proxy: ProxyConfig) => any
  /** Validate whether a proxy is working */
  validateProxy?: (proxy: ProxyConfig, agent: any) => Promise<boolean>
  /** Cache implementation, defaults to in-memory cache */
  cache?: CacheLike
  /** Custom proxy error classifier */
  isProxyError?: (error: any) => boolean
  /** Max retry attempts, default 3 */
  maxRetries?: number
  /** Retry delay in ms, default 100 */
  retryDelay?: number
  /** Request timeout in ms, default 3000 */
  timeout?: number
}

export interface UseProxyReturn {
  /**
   * Get a validated proxy agent.
   * @param needValid whether to validate the proxy before returning
   */
  getAgent: (needValid?: boolean) => Promise<{ proxy: ProxyConfig, agent: any }>
  /**
   * Get proxy IP config (with caching).
   * @param key cache key
   */
  getIp: (key: string) => Promise<ProxyConfig>
  /**
   * Delete a cached IP entry.
   * @param key cache key
   */
  delIp: (key: string) => void
  /**
   * Clear all cached IP entries.
   */
  clearCache: () => void
  /**
   * Check if an error is proxy-related.
   */
  isProxyError: (error: any) => boolean
}

// ==================== Default error classifier ====================

const PROXY_ERROR_STATUS_CODES = [407, 436, 618, 639, 643]
const PROXY_ERROR_CODES = [
  'ETIMEDOUT',
  'ECONNABORTED',
  'ECONNRESET',
  'ENOTFOUND',
  'EAI_AGAIN',
  'ERR_CANCELED',
  'ECONNREFUSED',
  'ERR_PROXY_CONNECTION_FAILED',
]
const PROXY_ERROR_MESSAGES = ['canceled', 'timeout', '644', '618', '643', '639']

export function defaultIsProxyError(error: any): boolean {
  if (!error)
    return false

  if (error.response?.status && PROXY_ERROR_STATUS_CODES.includes(error.response.status))
    return true

  if (error.code && PROXY_ERROR_CODES.includes(error.code))
    return true

  if (error.message && PROXY_ERROR_MESSAGES.some(msg => error.message.includes(msg)))
    return true

  return false
}

// ==================== Internal helpers ====================

/**
 * Request a proxy IP from a single supplier.
 */
async function fetchFromSupplier(
  supplier: ProxySupplier,
  timeout: number,
): Promise<ProxyConfig | null> {
  try {
    const response = await axios({
      method: supplier.method || 'GET',
      url: supplier.url,
      timeout,
      ...supplier.config,
    })
    return supplier.parser(response.data)
  }
  catch {
    return null
  }
}

// ==================== Main ====================

export function useProxy(options: UseProxyOptions): UseProxyReturn {
  const {
    suppliers,
    createAgent,
    validateProxy,
    cache = defaultCache as unknown as CacheLike,
    isProxyError = defaultIsProxyError,
    maxRetries = 3,
    retryDelay = 100,
    timeout = 3000,
  } = options

  if (!suppliers || suppliers.length === 0)
    throw new Error('[useProxy] At least one supplier is required')

  /**
   * Try all suppliers in order, return the first successful result.
   */
  async function getRemoteIp(): Promise<ProxyConfig> {
    for (const supplier of suppliers) {
      const result = await fetchFromSupplier(supplier, timeout)
      if (result)
        return result
    }
    throw new Error('[useProxy] All suppliers failed')
  }

  /**
   * Get proxy IP config from cache or remote.
   */
  async function getIp(key: string): Promise<ProxyConfig> {
    const cached = cache.get(key) as ProxyConfig | null
    if (cached)
      return cached

    const proxy = await getRemoteIp()
    // Default TTL: 3 minutes
    cache.put(key, proxy, 3 * 60 * 1000)
    return proxy
  }

  /**
   * Get and optionally validate a proxy agent.
   */
  async function getAgent(
    needValid = false,
  ): Promise<{ proxy: ProxyConfig, agent: any }> {
    let proxy: ProxyConfig | null = null
    let agent: any = null
    let tryCount = 0

    while (tryCount < maxRetries) {
      try {
        tryCount++
        // Different cache key per attempt to avoid reusing a stale IP
        const cacheKey = `useProxy_${tryCount}`
        proxy = await getIp(cacheKey)
        agent = createAgent(proxy)

        if (needValid && validateProxy) {
          const valid = await validateProxy(proxy, agent)
          if (!valid) {
            // Validation failed, clear cache and retry
            cache.del(cacheKey)
            await waiting(retryDelay)
            continue
          }
        }

        return { proxy, agent }
      }
      catch {
        // Failed to get IP or create agent, retry
        await waiting(retryDelay)
      }
    }

    if (proxy && agent)
      return { proxy, agent }

    throw new Error(`[useProxy] Failed to get a valid proxy after ${maxRetries} attempts`)
  }

  function delIp(key: string): void {
    cache.del(key)
  }

  function clearCache(): void {
    defaultCache.clear()
  }

  return {
    getAgent,
    getIp,
    delIp,
    clearCache,
    isProxyError,
  }
}
