import type { ProxyConfig, ProxySupplier } from './index'
import axios from 'axios'
import { Cache, cache as defaultCache } from 'comuse-shared'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defaultIsProxyError, useProxy } from './index'

vi.mock('axios')

const mockedAxios = vi.mocked(axios)

const mockSupplier: ProxySupplier = {
  name: 'test-supplier',
  url: 'https://proxy.example.com/api/getip',
  parser: (res: any) => {
    if (res?.code === 200)
      return { ip: res.data.ip, port: res.data.port }
    return null
  },
}

const mockSupplierWithExpire: ProxySupplier = {
  name: 'test-supplier-expire',
  url: 'https://proxy.example.com/api/getip',
  parser: (res: any) => {
    if (res?.code === 200)
      return { ip: res.data.ip, port: res.data.port, expire: res.data.expire }
    return null
  },
}

function createMockAgent(proxy: ProxyConfig) {
  return { type: 'mock-agent', host: proxy.ip, port: proxy.port }
}

describe('useProxy', () => {
  beforeEach(() => {
    defaultCache.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('initialization', () => {
    it('should throw if no suppliers provided', () => {
      expect(() =>
        useProxy({ suppliers: [], createAgent: createMockAgent }),
      ).toThrow('[useProxy] At least one supplier is required')
    })
  })

  describe('getIp', () => {
    it('should fetch IP from supplier and cache it', async () => {
      mockedAxios.mockResolvedValueOnce({
        data: { code: 200, data: { ip: '1.2.3.4', port: '8080' } },
      } as any)

      const { getIp } = useProxy({ suppliers: [mockSupplier], createAgent: createMockAgent })
      const result = await getIp('test-key')

      expect(result.ip).toBe('1.2.3.4')
      expect(result.port).toBe('8080')
      expect(mockedAxios).toHaveBeenCalledTimes(1)
    })

    it('should return cached IP on second call', async () => {
      mockedAxios.mockResolvedValueOnce({
        data: { code: 200, data: { ip: '5.6.7.8', port: '3128' } },
      } as any)

      const { getIp } = useProxy({ suppliers: [mockSupplier], createAgent: createMockAgent })

      await getIp('cached-key')
      const result = await getIp('cached-key')

      expect(result.ip).toBe('5.6.7.8')
      expect(mockedAxios).toHaveBeenCalledTimes(1)
    })

    it('should try next supplier when first fails', async () => {
      const supplierA: ProxySupplier = {
        name: 'supplier-a',
        url: 'https://a.example.com/ip',
        parser: (res: any) => (res?.code === 200 ? { ip: res.ip, port: res.port } : null),
      }
      const supplierB: ProxySupplier = {
        name: 'supplier-b',
        url: 'https://b.example.com/ip',
        parser: (res: any) => (res?.code === 200 ? { ip: res.ip, port: res.port } : null),
      }

      // First supplier returns non-200
      mockedAxios.mockResolvedValueOnce({
        data: { code: 500 },
      } as any)
      // Second supplier succeeds
      mockedAxios.mockResolvedValueOnce({
        data: { code: 200, ip: '10.0.0.1', port: '9999' },
      } as any)

      const cache = new Cache()
      const { getIp } = useProxy({
        suppliers: [supplierA, supplierB],
        createAgent: createMockAgent,
        cache: cache as any,
      })

      const result = await getIp('fallback-key')
      expect(result.ip).toBe('10.0.0.1')
      expect(mockedAxios).toHaveBeenCalledTimes(2)
    })

    it('should throw when all suppliers fail', async () => {
      mockedAxios.mockRejectedValue(new Error('Network error'))

      const { getIp } = useProxy({ suppliers: [mockSupplier], createAgent: createMockAgent })

      await expect(getIp('doomed-key')).rejects.toThrow('[useProxy] All suppliers failed')
    })
  })

  describe('getAgent', () => {
    it('should return agent without validation', async () => {
      mockedAxios.mockResolvedValueOnce({
        data: { code: 200, data: { ip: '1.1.1.1', port: '8080' } },
      } as any)

      const { getAgent } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
      })

      const { proxy, agent } = await getAgent()
      expect(proxy.ip).toBe('1.1.1.1')
      expect(agent.type).toBe('mock-agent')
    })

    it('should validate proxy when needValid is true', async () => {
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '2.2.2.2', port: '3128' } },
      } as any)

      let validateCalled = false
      const { getAgent } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
        validateProxy: async (_proxy, _agent) => {
          validateCalled = true
          return true
        },
      })

      const result = await getAgent({ needValid: true })
      expect(validateCalled).toBe(true)
      expect(result.proxy.ip).toBe('2.2.2.2')
    })

    it('should retry when validation fails', async () => {
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '3.3.3.3', port: '3128' } },
      } as any)

      let validateCount = 0
      const { getAgent } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
        validateProxy: async () => {
          validateCount++
          return validateCount >= 3
        },
        maxRetries: 3,
        retryDelay: 10,
      })

      const { proxy } = await getAgent({ needValid: true })
      expect(proxy.ip).toBe('3.3.3.3')
    })

    it('should retry on fetch failure', async () => {
      mockedAxios
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          data: { code: 200, data: { ip: '4.4.4.4', port: '8080' } },
        } as any)

      const { getAgent } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
        retryDelay: 10,
      })

      const { proxy } = await getAgent()
      expect(proxy.ip).toBe('4.4.4.4')
      expect(mockedAxios).toHaveBeenCalledTimes(2)
    })

    it('should reuse proxy with custom cacheKey', async () => {
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '5.5.5.5', port: '3128' } },
      } as any)

      const { getAgent } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
      })

      const r1 = await getAgent({ cacheKey: 'reuse-key' })
      const r2 = await getAgent({ cacheKey: 'reuse-key' })

      expect(r1.proxy.ip).toBe('5.5.5.5')
      expect(r2.proxy.ip).toBe('5.5.5.5')
      // Second call hits cache, no extra supplier request
      expect(mockedAxios).toHaveBeenCalledTimes(1)
    })

    it('should fetch new IP when cacheKey validation fails and retries', async () => {
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '6.6.6.6', port: '8080' } },
      } as any)

      let validateCount = 0
      const { getAgent } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
        validateProxy: async () => {
          validateCount++
          return validateCount >= 2
        },
        retryDelay: 10,
      })

      const { proxy } = await getAgent({ cacheKey: 'retry-key', needValid: true })
      expect(proxy.ip).toBe('6.6.6.6')
      // Supplier should be called twice: first IP invalidated, second IP fetched
      expect(mockedAxios).toHaveBeenCalledTimes(2)
    })

    it('should use auto-generated key when cacheKey is omitted', async () => {
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '7.7.7.7', port: '8080' } },
      } as any)

      const { getAgent } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
      })

      // Both calls use the same auto-generated key (useProxy_1), second hits cache
      const r1 = await getAgent()
      const r2 = await getAgent()
      expect(r1.proxy.ip).toBe('7.7.7.7')
      expect(r2.proxy.ip).toBe('7.7.7.7')
      expect(mockedAxios).toHaveBeenCalledTimes(1)
    })
  })

  describe('debug mode', () => {
    it('should call logger when debug is enabled', async () => {
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '8.8.8.8', port: '8888' } },
      } as any)

      const logs: any[] = []
      const { getAgent } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
        debug: true,
        logger: (level, ...args) => {
          logs.push({ level, args })
        },
      })

      await getAgent({ cacheKey: 'debug-key' })
      expect(logs.length).toBeGreaterThan(0)
      expect(logs.some(l => l.args.join(' ').includes('debug-key'))).toBe(true)
    })

    it('should not call console when debug is false with no custom logger', async () => {
      const consoleSpy = vi.spyOn(console, 'log')
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '9.9.9.9', port: '9999' } },
      } as any)

      const { getAgent } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
      })

      await getAgent()
      // No debug logs should be emitted
      const proxyLogs = consoleSpy.mock.calls.filter(c => c[0]?.includes?.('[useProxy]'))
      expect(proxyLogs.length).toBe(0)
      consoleSpy.mockRestore()
    })
  })

  describe('TTL configuration', () => {
    it('should use defaultTTL when proxy has no expire field', async () => {
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '1.2.3.4', port: '8080' } },
      } as any)

      let capturedTTL: number | undefined
      const mockCache = {
        get: (_key: string) => null,
        put: (_key: string, _value: any, ttl?: number) => {
          capturedTTL = ttl
        },
        del: (_key: string) => true,
      }

      const { getIp } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
        cache: mockCache,
        defaultTTL: 5 * 60 * 1000,
      })

      await getIp('ttl-key')
      expect(capturedTTL).toBe(5 * 60 * 1000)
    })

    it('should use expire field from proxy response for TTL', async () => {
      const futureTime = new Date(Date.now() + 120000).toISOString() // 2 min from now
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '1.2.3.4', port: '8080', expire: futureTime } },
      } as any)

      let capturedTTL: number | undefined
      const mockCache = {
        get: (_key: string) => null,
        put: (_key: string, _value: any, ttl?: number) => {
          capturedTTL = ttl
        },
        del: (_key: string) => true,
      }

      const { getIp } = useProxy({
        suppliers: [mockSupplierWithExpire],
        createAgent: createMockAgent,
        cache: mockCache,
      })

      await getIp('expire-key')
      // TTL should be roughly 120000ms - 20000ms (buffer) = 100000ms
      expect(capturedTTL).toBeGreaterThan(0)
      expect(capturedTTL).toBeLessThanOrEqual(120000)
    })

    it('should use custom expireBuffer', async () => {
      const futureTime = new Date(Date.now() + 60000).toISOString() // 1 min from now
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '1.2.3.4', port: '8080', expire: futureTime } },
      } as any)

      let capturedTTL: number | undefined
      const mockCache = {
        get: (_key: string) => null,
        put: (_key: string, _value: any, ttl?: number) => {
          capturedTTL = ttl
        },
        del: (_key: string) => true,
      }

      const { getIp } = useProxy({
        suppliers: [mockSupplierWithExpire],
        createAgent: createMockAgent,
        cache: mockCache,
        expireBuffer: 10000,
      })

      await getIp('buffer-key')
      // TTL should be roughly 60000ms - 10000ms (buffer) = 50000ms
      expect(capturedTTL).toBeGreaterThan(0)
      expect(capturedTTL).toBeLessThanOrEqual(50000)
    })

    it('should clamp TTL to 0 when expire has already passed', async () => {
      const pastTime = new Date(Date.now() - 60000).toISOString() // 1 min ago
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '1.2.3.4', port: '8080', expire: pastTime } },
      } as any)

      let capturedTTL: number | undefined
      const mockCache = {
        get: (_key: string) => null,
        put: (_key: string, _value: any, ttl?: number) => {
          capturedTTL = ttl
        },
        del: (_key: string) => true,
      }

      const { getIp } = useProxy({
        suppliers: [mockSupplierWithExpire],
        createAgent: createMockAgent,
        cache: mockCache,
      })

      await getIp('expired-key')
      expect(capturedTTL).toBe(0)
    })
  })

  describe('delIp', () => {
    it('should delete cached IP', async () => {
      mockedAxios.mockResolvedValue({
        data: { code: 200, data: { ip: '7.7.7.7', port: '8888' } },
      } as any)

      const { getIp, delIp } = useProxy({
        suppliers: [mockSupplier],
        createAgent: createMockAgent,
      })

      await getIp('deletable-key')
      delIp('deletable-key')

      await getIp('deletable-key')
      expect(mockedAxios).toHaveBeenCalledTimes(2)
    })
  })
})

describe('defaultIsProxyError', () => {
  it('should return false for null/undefined', () => {
    expect(defaultIsProxyError(null)).toBe(false)
    expect(defaultIsProxyError(undefined)).toBe(false)
  })

  it('should detect proxy error by status code', () => {
    expect(defaultIsProxyError({ response: { status: 407 } })).toBe(true)
    expect(defaultIsProxyError({ response: { status: 618 } })).toBe(true)
    expect(defaultIsProxyError({ response: { status: 200 } })).toBe(false)
  })

  it('should detect proxy error by code', () => {
    expect(defaultIsProxyError({ code: 'ETIMEDOUT' })).toBe(true)
    expect(defaultIsProxyError({ code: 'ECONNRESET' })).toBe(true)
    expect(defaultIsProxyError({ code: 'SOME_OTHER' })).toBe(false)
  })

  it('should detect proxy error by message', () => {
    expect(defaultIsProxyError({ message: 'Connection timeout' })).toBe(true)
    expect(defaultIsProxyError({ message: 'Request canceled' })).toBe(true)
    expect(defaultIsProxyError({ message: 'Success' })).toBe(false)
  })
})
