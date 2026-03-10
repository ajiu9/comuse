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

## Type Declarations

```ts
export interface UseVConsoleOptions {
  debug: boolean
  hostname: string[]
}
export declare function useVConsole(
  options?: Partial<UseVConsoleOptions>,
): Promise<ShallowRef<any, any> | undefined>
```
