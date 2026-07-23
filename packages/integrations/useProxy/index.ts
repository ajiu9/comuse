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

export interface GetAgentOptions {
  /** Cache key for reusing the same proxy IP across calls */
  cacheKey?: string
  /** Whether to validate the proxy before returning */
  needValid?: boolean
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

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
  /** Enable debug logging, default false */
  debug?: boolean
  /** Custom logger, defaults to console */
  logger?: (level: LogLevel, ...args: any[]) => void
}

export interface UseProxyReturn {
  /**
   * Get a validated proxy agent.
   */
  getAgent: (options?: GetAgentOptions) => Promise<{ proxy: ProxyConfig, agent: any }>
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
    debug = false,
    logger,
  } = options

  const log: (level: LogLevel, ...args: any[]) => void = logger
    || ((level, ...args) => {
      if (debug) {
        const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : level === 'info' ? 'ℹ️' : '🐛'
        console.error(`[useProxy] ${prefix}`, ...args)
      }
    })

  if (!suppliers || suppliers.length === 0)
    throw new Error('[useProxy] At least one supplier is required')

  /**
   * Try all suppliers in order, return the first successful result.
   */
  async function getRemoteIp(): Promise<ProxyConfig> {
    log('debug', `fetching proxy from ${suppliers.length} supplier(s)`)
    for (const supplier of suppliers) {
      const result = await fetchFromSupplier(supplier, timeout)
      if (result) {
        log('info', `got IP from supplier "${supplier.name}": ${result.ip}:${result.port}`)
        return result
      }
      log('warn', `supplier "${supplier.name}" failed, trying next...`)
    }
    throw new Error('[useProxy] All suppliers failed')
  }

  /**
   * Get proxy IP config from cache or remote.
   */
  async function getIp(key: string): Promise<ProxyConfig> {
    const cached = cache.get(key) as ProxyConfig | null
    if (cached) {
      log('debug', `cache HIT for key "${key}": ${cached.ip}:${cached.port}`)
      return cached
    }

    log('debug', `cache MISS for key "${key}", fetching from remote...`)
    const proxy = await getRemoteIp()
    // Default TTL: 3 minutes
    cache.put(key, proxy, 3 * 60 * 1000)
    log('debug', `cached proxy under key "${key}" (TTL: 3min)`)
    return proxy
  }

  /**
   * Get and optionally validate a proxy agent.
   */
  async function getAgent(
    options: GetAgentOptions = {},
  ): Promise<{ proxy: ProxyConfig, agent: any }> {
    const { cacheKey, needValid = false } = options

    log('debug', `getAgent called | cacheKey: "${cacheKey || '<auto>'}" | needValid: ${needValid} | maxRetries: ${maxRetries}`)

    let proxy: ProxyConfig | null = null
    let agent: any = null
    let tryCount = 0

    while (tryCount < maxRetries) {
      try {
        tryCount++

        // Use custom cacheKey if provided, else use auto-generated key per attempt
        const effectiveKey = cacheKey || `useProxy_${tryCount}`
        log('debug', `attempt ${tryCount}/${maxRetries} | effectiveKey: "${effectiveKey}"`)

        proxy = await getIp(effectiveKey)
        agent = createAgent(proxy)
        log('debug', `agent created for ${proxy.ip}:${proxy.port}`)

        if (needValid && validateProxy) {
          log('debug', `validating proxy ${proxy.ip}:${proxy.port}...`)
          const valid = await validateProxy(proxy, agent)
          if (!valid) {
            log('warn', `proxy ${proxy.ip}:${proxy.port} validation FAILED, retrying...`)
            // Clear the cached entry so next attempt fetches a fresh IP
            cache.del(effectiveKey)
            await waiting(retryDelay)
            continue
          }
          log('info', `proxy ${proxy.ip}:${proxy.port} validation PASSED`)
        }

        log('info', `getAgent success | proxy: ${proxy.ip}:${proxy.port} | attempt: ${tryCount}`)
        return { proxy, agent }
      }
      catch (error) {
        log('error', `attempt ${tryCount} failed:`, error)
        await waiting(retryDelay)
      }
    }

    if (proxy && agent) {
      log('warn', `returning last proxy ${proxy.ip}:${proxy.port} despite maxRetries exhausted`)
      return { proxy, agent }
    }

    log('error', `all ${maxRetries} attempts exhausted, throwing`)
    throw new Error(`[useProxy] Failed to get a valid proxy after ${maxRetries} attempts`)
  }

  function delIp(key: string): void {
    log('debug', `deleting cache key "${key}"`)
    cache.del(key)
  }

  function clearCache(): void {
    log('debug', 'clearing all cached proxies')
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
