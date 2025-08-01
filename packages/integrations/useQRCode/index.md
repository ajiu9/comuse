---
category: '@Integrations'
---

# useQRCode

Wrapper for [`qrcode`](https://github.com/soldair/node-qrcode).

## Install

```bash
npm i qrcode@^1
```

## Usage

```ts
import { useQRCode } from 'comuse-integrations/useQRCode'

// `qrcode` will be a ref of data URL
const qrcode = useQRCode('text-to-encode')
```

or passing a `ref` to it, the returned data URL ref will change along with the source ref's changes.

```ts
import { useQRCode } from 'comuse-integrationsintegrations/useQRCode'
import { shallowRef } from 'vue'

const text = shallowRef('text-to-encode')
const qrcode = useQRCode(text)
```

```html
<input v-model="text" type="text" />
<img :src="qrcode" alt="QR Code" />
```
