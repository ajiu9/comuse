---
category: Utilities
---

# useSupported

SSR compatibility `isSupported`

## Usage

```ts
import { useSupported } from 'comuse-core'

const isSupported = useSupported(() => navigator && 'getBattery' in navigator)

if (isSupported.value) {
  // do something
  navigator.getBattery
}
```
