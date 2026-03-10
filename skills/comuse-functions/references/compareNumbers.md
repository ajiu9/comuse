---
category: "Utilities"
---

# CompareNumbers

## Usage

```ts
import { compareNumbers } from 'comuse-shared'

const result = compareNumbers(1, 2)
```

## Type Declarations

```ts
export interface CompareNumbersResult {
  isEqual: boolean
  isLess: boolean
  isGreater: boolean
  isLessOrEqual: boolean
  isGreaterOrEqual: boolean
}
export declare const compareNumbers: (
  num1: number | string,
  num2: number | string,
  precision?: number,
) => CompareNumbersResult
```
