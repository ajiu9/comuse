---
category: "Utilities"
---

# ConvertObjectKeys

Convert object keys between snake_case and camelCase formats.

## Usage

```ts
import { camelToSnake, convertObjectKeys } from 'comuse-shared'

const obj = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30
}

const result = convertObjectKeys(obj, camelToSnake) // { first_name: 'John', last_name: 'Doe', age: 30 }
```
