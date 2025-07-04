---
category: Utilities
related: useThrottle
---

# useDebounce

Debounce execution of a function.

> Debounce is an overloaded waiter: if you keep asking him your requests will be ignored until you stop and give him some time to think about your latest inquiry.

## Usage

```js
import { useDebounce, useEventListener } from 'comuse-core'

const debouncedFn = useDebounce(() => {
  // do something
}, 1000)

useEventListener(window, 'resize', debouncedFn)
```

You can also pass a 3rd parameter to this, with a maximum wait time, similar to [lodash debounce](https://lodash.com/docs/4.17.15#debounce)

```js
import { useDebounce, useEventListener } from 'comuse-core'

// If no invokation after 5000ms due to repeated input,
// the function will be called anyway.
const debouncedFn = useDebounce(() => {
  // do something
}, 1000, { maxWait: 5000 })

useEventListener(window, 'resize', debouncedFn)
```

Optionally, you can get the return value of the function using promise operations.

```js
import { useDebounce } from 'comuse-core'

const debouncedRequest = useDebounce(() => 'response', 1000)

debouncedRequest().then((value) => {
  console.log(value) // 'response'
})

// or use async/await
async function doRequest() {
  const value = await debouncedRequest()
  console.log(value) // 'response'
}
```

Since unhandled rejection error is quite annoying when developer doesn't need the return value, the promise will **NOT** be rejected if the function is canceled **by default**. You need to specify the option `rejectOnCancel: true` to capture the rejection.

```js
import { useDebounce } from 'comuse-core'

const debouncedRequest = useDebounce(() => 'response', 1000, { rejectOnCancel: true })

debouncedRequest()
  .then((value) => {
    // do something
  })
  .catch(() => {
    // do something when canceled
  })

// calling it again will cancel the previous request and gets rejected
setTimeout(debouncedRequest, 500)
```

## Recommended Reading

- [**Debounce vs Throttle**: Definitive Visual Guide](https://kettanaito.com/blog/debounce-vs-throttle)
