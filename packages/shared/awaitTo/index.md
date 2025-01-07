---
category: 'Tools'
---

# AwaitTo

Async await wrapper for easy error handling.

## Usage

```ts
const bar = () => new Promise<boolean>((resolve, reject) => {})
const foo = () => new Promise<string>((resolve, reject) => {})

;(async () => {
  const [err, data] = await awaitTo(bar())
  const [err1, data1] = await awaitTo(bar(), foo())
  const [err2, data2] = await awaitTo([bar(), foo()])
})()
```
