---
category: Browser
---

# Browser

Print using `window.print` via an iframe.

## Usage

```ts
import { formatTime, windowPrint } from 'comuse-shared'

windowPrint(`<span style="margin-right: 10px">Time：${formatTime(new Date(), 'yyyy-MM-dd')}</span>`)
```

## Type Declarations

```ts
/**
 * @description Print using window.print via an iframe
 * @param {string} content - The content to be printed
 * @returns {void}
 */
export declare function windowPrint(content: string): void
```
