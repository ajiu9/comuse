<p align="center">
<a href="https://www.npmjs.com/package/comuse-core" target="__blank"><img src="https://img.shields.io/npm/v/comuse-core?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/comuse" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/comuse-core?color=50a36f&label="></a>
<a href="https://ajiu9.cn/comuse" target="__blank"><img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=1e8a7a" alt="Docs & Demos"></a>
<br>
<a href="https://github.com/ajiu9/comuse" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/ajiu9/comuse?style=social"></a>
</p>
</p>

> some of the copy from [vueuse](https://vueuse.org/)

## 🚀 Features

- 🎪 [**Interactive docs & demos**](https://ajiu9.cn/comuse)
- ⚡ **Fully tree shakeable**: Only take what you want, [bundle size](https://ajiu9.cn/comuse/export-size)
- 🦾 **Type Strong**: Written in [TypeScript](https://www.typescriptlang.org/), with [TS Docs](https://github.com/microsoft/tsdoc)
- 🔋 **SSR Friendly**

## 🦄 Usage

```ts
import { useThrottle } from 'comuse-core'

const throttledFn = useThrottle(() => {
  // do something, it will be called at most 1 time per second
}, 1000)

window.addEventListener('resize', throttledFn)
```

Refer to [functions list](https://ajiu9.cn/comuse/functions) or [documentations](https://ajiu9.cn/comuse/) for more details.

## 📦 Install

```bash
npm i comuse
```

## 🧱 Contribute

See the [**Contributing Guide**](https://ajiu9.cn/comuse/contributing)

## 📄 License

[MIT License](https://github.com/ajiu9/comuse/blob/main/LICENSE) © 2024-PRESENT [Ajiu9](https://github.com/ajiu9)
