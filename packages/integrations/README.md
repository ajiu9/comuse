# comuse-integrations

[![NPM version](https://img.shields.io/npm/v/comuse-integrations?color=a1b858)](https://www.npmjs.com/package/comuse-integrations)

> This is an add-on of [Comuse](https://github.com/ajiu9/comuse), providing integration wrappers for utility libraries.

## Install

```bash
npm i comuse-integrations
```

## Functions

<!--GENERATED LIST, DO NOT MODIFY MANUALLY-->
<!--FUNCTIONS_LIST_STARTS-->

- [`useQRCode`](https://vueuse.org/integrations/useQRCode/) — wrapper for [`qrcode`](https://github.com/soldair/node-qrcode)

<!--FUNCTIONS_LIST_ENDS-->

## Tree-shaking

For better tree-shaking result, import functions from submodules, for example:

```ts
// Don't
import { useQRCode } from 'comuse-integrations'

import { useQRCode } from 'comuse-integrations/useAxios'
```

## License

[MIT License](https://github.com/ajiu9/comuse/blob/main/LICENSE) © 2024-PRESENT [ajiu9](https://github.com/ajiu9)
