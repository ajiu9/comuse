---
category: Animation
---

# useInterval

Reactive counter increases on every interval

## Usage

```ts
import { useInterval } from 'comuse-core'

// count will increase every 200ms
const counter = useInterval(200)
```

```ts
import { useInterval } from 'comuse-core'
// ---cut---
const { counter, reset, pause, resume } = useInterval(200, {
  controls: true
})
```
