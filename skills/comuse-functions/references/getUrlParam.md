---
category: "Browser"
related: parseUrlParam
---

# getUrlParam

Get a single URL parameter (from the "location.search", before "#")

## Usage

```ts
import { getUrlParam } from 'comuse-shared'

const query = getUrlParam('key')
```

## Type Declarations

```ts
/**
 * Get a single URL parameter (from the "location.search", before "#")
 *
 * @example
 * ```js
 * getUrlParam('key1')
 * // key1 => xxx
 *
 * getUrlParam('key1', 'https://test.com?key1=100#/home?key1=200')
 * // key1 => 100
 * ```
 * @param key - key name
 * @param url - pass in the url string
 * @returns - result
 */
export declare function getUrlParam(key: string): string | undefined
export declare function getUrlParam(
  key: string,
  url: string,
): string | undefined
```
