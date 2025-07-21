---
category: Utilities
---

## promiseFactory

### usage

Convert an object to a promise like api

```ts
import { promiseFactory, waiting } from 'comuse-shared'

function promise() {
  const stats = {
    value: 100
  }

  const resolver = () =>
    new Promise(resolve =>
      waiting(2000).then(() => {
        stats.value = 200
        resolve(stats)
      })
    )

  return promiseFactory(stats, resolver)
}

const res = promise() // res => 100
const res = await promise() // res => 200
```

## createSingletonPromise

Create a singleton promise.

### usage

```ts
import { createSingletonPromise } from 'comuse-shared'
const promise = createSingletonPromise(async () => {
  return await promise()
})
promise()
```
