---
category: Utilities
---

# uuid

Browser-side generation of UUID v4.

### usage

```ts
import { uuid } from 'comuse-shared'

console.log(uuid()) // '4222fcfe-5721-4632-bede-6043885be57d'
```

# getRandom

Generate a random integer in range [min, max).

## usage

```ts
import { getRandom } from 'comuse-shared'
console.log(getRandom(1, 10))
```
