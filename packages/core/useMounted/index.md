---
category: Component
---

# useMounted

Mounted state in ref.

## Usage

```js
import { useMounted } from 'comuse-core'

const isMounted = useMounted()
```

Which is essentially a shorthand of:

```ts
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
```
