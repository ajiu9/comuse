---
category: '@Integrations'
---

# useVConsole

Wrapper for [`vconsole`](https://github.com/Tencent/vConsole).

## Install

```bash
npm i vconsole
```

## Usage

```ts
import { useVConsole } from 'comuse-integrations/useVConsole'

const vConsole = useVConsole({
  hostname: ['ajiu9.cn']
})
```

or

```ts
import { useVConsole } from 'comuse-integrations/useVConsole'

const vConsole = useVConsole({
  debug: true
})
```
