---
category: '@Integrations'
---

# useProxy

Dynamic proxy IP management utility. Fetches proxy IP from configurable suppliers, creates proxy agents, and supports validation with automatic retry.

Built on [`axios`](https://github.com/axios/axios).

## Install

```bash
npm i axios@^1
```

## Usage

### Basic

```ts
import { useProxy } from 'comuse-integrations'
import { HttpsProxyAgent } from 'https-proxy-agent'

const { getAgent, getIp } = useProxy({
  suppliers: [
    {
      name: 'my-supplier',
      url: 'https://proxy.example.com/api/getip',
      parser: (res) => {
        if (res.code !== 200) return null
        return { ip: res.data.ip, port: res.data.port }
      },
    },
  ],
  createAgent: (proxy) => new HttpsProxyAgent({
    host: proxy.ip,
    port: proxy.port,
  }),
})

// Get a proxy agent (no validation)
const { proxy, agent } = await getAgent()

// Use the agent in requests
import axios from 'axios'
const res = await axios.get('https://example.com/api', {
  httpsAgent: agent,
})
```

### With validation

```ts
import axios from 'axios'
import { useProxy } from 'comuse-integrations'
import { HttpsProxyAgent } from 'https-proxy-agent'

const { getAgent } = useProxy({
  suppliers: [
    {
      name: 'tianqi',
      url: 'http://api.tianqiip.com/getip',
      config: {
        params: {
          secret: 'xxx',
          num: 1,
          type: 'json',
        },
      },
      parser: (res) => {
        if (res.code !== 1000) return null
        return res.data[0]
      },
    },
  ],
  createAgent: (proxy) => new HttpsProxyAgent({
    host: proxy.ip,
    port: proxy.port,
  }),
  validateProxy: async (proxy, agent) => {
    const res = await axios.get('https://ipinfo.io/json', {
      httpsAgent: agent,
      timeout: 5000,
    })
    return res.data.ip === proxy.ip
  },
  maxRetries: 3,
  retryDelay: 100,
})

const { proxy, agent } = await getAgent(true)
```

### Multiple suppliers with fallback

```ts
const { getAgent } = useProxy({
  suppliers: [
    {
      name: 'supplier-a',
      url: 'http://api.supplier-a.com/ip',
      parser: (res) => {
        if (res.code !== 200) return null
        return res.data[0]
      },
    },
    {
      name: 'supplier-b',
      url: 'http://api.supplier-b.com/ip',
      parser: (res) => {
        if (res.code !== 200) return null
        return { ip: res.ip, port: res.port }
      },
    },
  ],
  createAgent: (proxy) => new HttpsProxyAgent({ host: proxy.ip, port: proxy.port }),
})

// supplier-a is tried first, if it fails, supplier-b is used
const { proxy, agent } = await getAgent()
```

### Custom cache

```ts
import { useProxy } from 'comuse-integrations'

const proxyCache = new Map()

const { getIp } = useProxy({
  suppliers: [...],
  createAgent: [...],
  cache: {
    get: (key) => proxyCache.get(key) ?? null,
    put: (key, value, ttl) => {
      proxyCache.set(key, value)
      if (ttl) setTimeout(() => proxyCache.delete(key), ttl)
    },
    del: (key) => { proxyCache.delete(key); return true },
  },
})
```

### Error classification

```ts
import { useProxy, defaultIsProxyError } from 'comuse-integrations'

const { getAgent, isProxyError } = useProxy({
  suppliers: [...],
  createAgent: [...],
})

// Use it after a failed request to decide whether to retry with a new IP
try {
  await axios.get('...', { httpsAgent: agent })
}
catch (error) {
  if (isProxyError(error)) {
    // Get a fresh agent and retry
    const { agent: newAgent } = await getAgent(true)
  }
}
```

## API

### `useProxy(options)`

Returns an object with the following functions:

| Function | Description |
|----------|-------------|
| `getAgent(needValid?)` | Get a validated proxy agent. Fetches IP, creates agent, optionally validates. Retries on failure. |
| `getIp(key)` | Get proxy IP config (with caching). |
| `delIp(key)` | Delete a cached IP entry. |
| `clearCache()` | Clear all cached IP entries. |
| `isProxyError(error)` | Check if an error is proxy-related. |

### `UseProxyOptions`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `suppliers` | `ProxySupplier[]` | **required** | Proxy IP suppliers, tried in order |
| `createAgent` | `(proxy: ProxyConfig) => any` | **required** | Create a proxy agent instance |
| `validateProxy` | `(proxy: ProxyConfig, agent: any) => Promise<boolean>` | - | Validate proxy before returning |
| `cache` | `CacheLike` | built-in memory cache | Custom cache implementation |
| `isProxyError` | `(error: any) => boolean` | `defaultIsProxyError` | Custom error classifier |
| `maxRetries` | `number` | `3` | Max retry attempts |
| `retryDelay` | `number` | `100` | Delay between retries (ms) |
| `timeout` | `number` | `3000` | Supplier request timeout (ms) |

### `ProxySupplier`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string` | **required** | Supplier name |
| `url` | `string` | **required** | Proxy API URL |
| `method` | `'GET' \| 'POST'` | `'GET'` | HTTP method |
| `config` | `AxiosRequestConfig` | - | Additional axios config (params, headers, etc.) |
| `parser` | `(response: any) => ProxyConfig \| null` | **required** | Parse API response, return `null` to trigger next supplier |
