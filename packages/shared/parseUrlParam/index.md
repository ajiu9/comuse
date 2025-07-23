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
