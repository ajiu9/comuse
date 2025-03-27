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
