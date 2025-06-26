---
category: Env
---

# Env

Check if the current environment.

## Usage

### osVersion

```ts
import { osVersion } from 'comuse-shared'

const version = osVersion()
console.log(version)
```

### inBrowser

```ts
import { inBrowser } from 'comuse-shared'

if (inBrowser())
  console.log('Browser')
```

### isAlipay

```ts
import { isAlipay } from 'comuse-shared'

if (isAlipay())
  console.log('Alipay')
```

### isWechat

```ts
import { isWechat } from 'comuse-shared'

if (isWechat())
  console.log('Wechat')
```
