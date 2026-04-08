---
category: Utilities
---

# amountCapital

金额转大写

## Usage

```ts
import { amountCapital } from 'comuse-shared'

const num: number = 100.53

amountCapital(num) // 壹佰元伍角叁分
```

## Type Declarations

```ts
/**
 * Converts a number to its Chinese capital representation.
 * @param {number | null | undefined | string} n - The number to convert.
 * @returns {string | void} - The Chinese capital representation of the number, or `void` if the input is invalid.
 */
type T = number | null | undefined | `${number}` | ""
export declare function amountCapital(n: T): string | void
```
