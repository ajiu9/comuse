---
category: Utilities
---

# Cache

A simple in-memory cache with TTL support.

## Usage

```ts
import { cache, Cache } from 'comuse-shared'

// Basic usage with default instance
cache.put('foo', 'bar')
console.log(cache.get('foo')) // 'bar'

// Create new instance
const myCache = new Cache()
myCache.put('key', 'value')
```

### put

Store a value in the cache with optional TTL and callback.

```ts
import { cache } from 'comuse-shared'

// Store without TTL (permanent)
cache.put('permanent', 'value')

// Store with TTL (100ms)
cache.put('temporary', 'value', 100)

// Store with TTL and callback
cache.put('key', 'value', 1000, (key, value) => {
  console.log(`${key} expired with value: ${value}`)
})
```

### get

Retrieve a value from the cache.

```ts
import { cache } from 'comuse-shared'

cache.put('foo', 'bar')
console.log(cache.get('foo')) // 'bar'
console.log(cache.get('nonexistent')) // null
```

### del

Delete a key from the cache.

```ts
import { cache } from 'comuse-shared'

cache.put('foo', 'bar')
console.log(cache.del('foo')) // true
console.log(cache.del('nonexistent')) // false
```

### clear

Clear all keys from the cache.

```ts
import { cache } from 'comuse-shared'

cache.put('foo', 'bar')
cache.put('baz', 'qux')
cache.clear()
console.log(cache.size()) // 0
```

### size

Get current number of entries in the cache.

```ts
import { cache } from 'comuse-shared'

cache.put('foo', 'bar')
console.log(cache.size()) // 1
```

### memsize

Get number of entries taking up space in memory.

```ts
import { cache } from 'comuse-shared'

cache.put('foo', 'bar')
console.log(cache.memsize()) // 1
```

### debug

Enable/disable debug mode to track hits and misses.

```ts
import { cache } from 'comuse-shared'

cache.debug(true)
cache.put('foo', 'bar')

cache.get('foo') // hit
cache.get('nonexistent') // miss

console.log(cache.hits()) // 1
console.log(cache.misses()) // 1
```

### hits

Get number of cache hits (only tracked in debug mode).

```ts
import { cache } from 'comuse-shared'

cache.debug(true)
cache.put('foo', 'bar')
cache.get('foo')
console.log(cache.hits()) // 1
```

### misses

Get number of cache misses (only tracked in debug mode).

```ts
import { cache } from 'comuse-shared'

cache.debug(true)
cache.get('nonexistent')
console.log(cache.misses()) // 1
```

### keys

Get all cache keys.

```ts
import { cache } from 'comuse-shared'

cache.put('foo', 'bar')
cache.put('baz', 'qux')
console.log(cache.keys()) // ['foo', 'baz']
```

### exportJson

Export cache data as JSON string.

```ts
import { Cache } from 'comuse-shared'

const cache1 = new Cache()
cache1.put('key1', 'value1')
cache1.put('key2', 'value2')

const exported = cache1.exportJson()
console.log(exported) // JSON string
```

### importJson

Import cache data from JSON string.

```ts
import { Cache } from 'comuse-shared'

const cache1 = new Cache()
cache1.put('key1', 'value1')

const exported = cache1.exportJson()

const cache2 = new Cache()
cache2.importJson(exported)
console.log(cache2.get('key1')) // 'value1'

// Skip duplicates
cache2.importJson(exported, { skipDuplicates: true })
```
