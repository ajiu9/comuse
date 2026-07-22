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

      const result = await getAgent(true)
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

      const { proxy } = await getAgent(true)
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
