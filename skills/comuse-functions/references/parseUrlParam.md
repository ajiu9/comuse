---
category: "Browser"
---

# parseUrlParam

> Parse URL query parameters into an object, with optional auto type conversion.

`parseUrlParam` is used to parse a URL query string into an object. It supports automatic conversion of string values to corresponding JS types (such as number, boolean, null, undefined, NaN, Infinity, etc.), or you can get only string values.

> [!tip] Scientific notation, binary, octal, hexadecimal and other special number formats will NOT be automatically converted.

## Usage

```ts
import parseUrlParam from 'comuse-shared/parseUrlParam'

const url = '?key1=100&key2=true&key3=null&key4=undefined&key5=NaN&key6=10.888&key7=Infinity&key8=test'

// Parse as string only
const result1 = parseUrlParam(url)
// { key1: '100', key2: 'true', key3: 'null', ... }

// Auto type conversion
const result2 = parseUrlParam(url, true)
// { key1: 100, key2: true, key3: null, ... }
```

## Type Declarations

```ts
/**
 * parse url params
 *
 * @example
 * ```js
 * parseUrlParam('?key1=100&key2=true&key3=null&key4=undefined&key5=NaN&key6=10.888&key7=Infinity&key8=test')
 * // \{"key1":"100","key2":"true","key3":"null","key4":"undefined","key5":"NaN","key6":"10.888","key7":"Infinity","key8":"test"\}
 *
 * parseUrlParam('?key1=100&key2=true&key3=null&key4=undefined&key5=NaN&key6=10.888&key7=Infinity&key8=test', true)
 * // \{"key1":100,"key2":true,"key3":null,"key5":NaN,"key6":10.888,"key7":Infinity,"key8":"test"\}
 * ```
 * @param url - url string (like: ?key1=value1&key2=value2)
 * @param covert - Converts a specific string to a corresponding value (Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)
 * @returns object
 */
export declare function parseUrlParam(
  url: string,
  covert?: boolean,
): Record<string, unknown>
```
