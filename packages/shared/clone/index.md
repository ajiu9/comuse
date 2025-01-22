---
category: "Utilities"
---

# Clone

> [_proto_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) can be redefined as an own property on any object instance through Object.defineProperty() without triggering the setter.

The `clone` function is a general object cloning function that supports a wider range of data types than cloneJSON, including some special object types such as Set, Map, Date, RegExp, DataView, and ArrayBuffer, etc. It will invoke different cloning logic depending on the type of the input object.

The `cloneJSON` function is mainly used for deep cloning of JSON serializable data types. It recursively clones arrays and objects. For primitive data types, it simply copies them. For elements within objects and arrays.

> [!tip] Circular references are not supported.

## Usage

```ts
import { clone, cloneJSON } from 'comuse-core'

const input = [1, 2, 3, { a: 4 }]

const output = cloneJSON(input)

const cloneOutput = clone(input)
```
