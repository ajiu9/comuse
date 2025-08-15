---
category: State
---

# useStorage

Create a reactive ref that can be used to access & modify [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

Uses localStorage by default, other storage sources be specified via third argument.

## Usage

```ts
import { useStorage } from 'comuse-core'

// bind object
const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' })

// bind boolean
const flag = useStorage('my-flag', true) // returns Ref<boolean>

// bind number
const count = useStorage('my-count', 0) // returns Ref<number>

// bind string with SessionStorage
const id = useStorage('my-id', 'some-string-id', sessionStorage) // returns Ref<string>

// delete data from storage
state.value = null
```

## Merge Defaults

By default, `useStorage` will use the value from storage if it is present and ignores the default value. Be aware that when you are adding more properties to the default value, the key might be `undefined` if client's storage does not have that key.

```ts
import { useStorage } from 'comuse-core'
// ---cut---
localStorage.setItem('my-store', '{"hello": "hello"}')

const state = useStorage('my-store', { hello: 'hi', greeting: 'hello' }, localStorage)

console.log(state.value.greeting) // undefined, since the value is not presented in storage
```

To solve that, you can enable `mergeDefaults` option.

```ts
import { useStorage } from 'comuse-core'
// ---cut---
localStorage.setItem('my-store', '{"hello": "nihao"}')

const state = useStorage(
  'my-store',
  { hello: 'hi', greeting: 'hello' },
  localStorage,
  { mergeDefaults: true } // <--
)

console.log(state.value.hello) // 'nihao', from storage
console.log(state.value.greeting) // 'hello', from merged default value
```

When setting it to true, it will perform a **shallow merge** for objects. You can pass a function to perform custom merge (e.g. deep merge), for example:

```ts
import { useStorage } from 'comuse-core'
// ---cut---
const state = useStorage(
  'my-store',
  { hello: 'hi', greeting: 'hello' },
  localStorage,
  { mergeDefaults: (storageValue, defaults) => deepMerge(defaults, storageValue) } // <--
)
```

## Custom Serialization

By default, `useStorage` will smartly use the corresponding serializer based on the data type of provided default value. For example, `JSON.stringify` / `JSON.parse` will be used for objects, `Number.toString` / `parseFloat` for numbers, etc.

You can also provide your own serialization function to `useStorage`:

```ts
import { useStorage } from 'comuse-core'

useStorage(
  'key',
  {},
  undefined,
  {
    serializer: {
      read: (v: any) => v ? JSON.parse(v) : null,
      write: (v: any) => JSON.stringify(v),
    },
  },
)
```

Please note when you provide `null` as the default value, `useStorage` can't assume the data type from it. In this case, you can provide a custom serializer or reuse the built-in ones explicitly.

```ts
import { StorageSerializers, useStorage } from 'comuse-core'

const objectLike = useStorage('key', null, undefined, { serializer: StorageSerializers.object })
objectLike.value = { foo: 'bar' }
```

## 微信小程序适配示例

```ts
import type { StorageLike } from 'comuse-core/ssr-handlers'
import { useStorage } from 'comuse-core'

const wxStorage: StorageLike = {
  getItem(key) {
    try {
      const v = wx.getStorageSync(key)
      if (v === undefined || v === null) return null
      return typeof v === 'string' ? v : JSON.stringify(v)
    }
    catch {
      return null
    }
  },
  setItem(key, value) {
    try {
      wx.setStorageSync(key, value)
    }
    catch {}
  },
  removeItem(key) {
    try {
      wx.removeStorageSync(key)
    }
    catch {}
  },
}

// usage (disable cross-document listener)
const state = useStorage('comuse-local-storage', { foo: 1 }, wxStorage, {
  listenToStorageChanges: false,
})
```

use Taro

```ts
import type { StorageLike } from 'comuse-core'
import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro'

export const wxStorage: StorageLike = {
  getItem(key) {
    try {
      const v = getStorageSync(key)
      if (v === undefined || v === null) return null
      return typeof v === 'string' ? v : JSON.stringify(v)
    }
    catch {
      return null
    }
  },
  setItem(key, value) {
    try {
      setStorageSync(key, value)
    }
    catch {}
  },
  removeItem(key) {
    try {
      removeStorageSync(key)
    }
    catch {}
  },
}
```

useStorageAsync

```ts
import type { StorageLikeAsync } from 'comuse-core/ssr-handlers'
import { useStorageAsync } from 'comuse-core/useStorageAsync'

const wxStorageAsync: StorageLikeAsync = {
  getItem(key) {
    return new Promise((resolve) => {
      wx.getStorage({
        key, success: res => resolve(
          typeof res?.data === 'string' ? res.data : JSON.stringify(res?.data ?? null)
        ), fail: () => resolve(null)
      })
    })
  },
  setItem(key, value) {
    return new Promise((resolve) => {
      wx.setStorage({ key, data: value, complete: () => resolve() })
    })
  },
  removeItem(key) {
    return new Promise((resolve) => {
      wx.removeStorage({ key, complete: () => resolve() })
    })
  },
}

const state = await useStorageAsync('comuse-local-storage', { foo: 1 }, wxStorageAsync, {
  listenToStorageChanges: false,
  initOnMounted: false,
})
```

- [微信小程序存储能力](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/storage.html)。
