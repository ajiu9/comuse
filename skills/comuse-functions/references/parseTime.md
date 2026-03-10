---
category: Time
---

# formatTime

Automatically update the time ago string when the time changes.

formatter:

- year: yyyy
- quarter: q
- month: MM
- day: dd
- hour: hh
- minute: mm
- second: ss
- millisecond: S

## Usage

```js
import { formatTime, parseTime } from 'comuse-shared'

const timeAgo = formatTime(new Date(2024, 12, 1))

parseTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
```

## Type Declarations

```ts
export declare const now: () => number
export declare const timestamp: () => number
export declare function parseTime(time: any, fmt: string): string | null
/**
 * Formats time based on the provided option.
 *
 * @param {number | string} time - The time value to format.
 * @param {string | undefined} fmt - Optional format string.
 * @returns {string} - Formatted time string.
 */
export declare function formatTime(
  time: number | string | Date,
  fmt?: string,
): string | null
export declare const nowStr: (format?: string) => string | null
```
