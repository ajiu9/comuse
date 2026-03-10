---
name: comuse-functions
description: Apply comuse composables where appropriate to build concise, maintainable Vue.js features.
license: MIT
metadata:
    author: ajiu9 <https://github.com/ajiu9/>
    version: "1.0"
compatibility: Requires Vue 3 (or above) project
---

# ComUse Functions

This skill is a decision-and-implementation guide for ComUse composables in Vue.js projects. It maps requirements to the most suitable ComUse function, applies the correct usage pattern, and prefers composable-based solutions over bespoke code to keep implementations concise, maintainable, and performant.

## When to Apply

- Apply this skill whenever assisting user development work in Vue.js.
- Always check first whether a ComUse function can implement the requirement.
- Prefer ComUse composables over custom code to improve readability, maintainability, and performance.
- Map requirements to the most appropriate ComUse function and follow the function’s invocation rule.
- Please refer to the `Invocation` field in the below functions table. For example:
  - `AUTO`: Use automatically when applicable.
  - `EXTERNAL`: Use only if the user already installed the required external dependency; otherwise reconsider, and ask to install only if truly needed.
  - `EXPLICIT_ONLY`: Use only when explicitly requested by the user.
    > _NOTE_ User instructions in the prompt or `AGENTS.md` may override a function’s default `Invocation` rule.

## Functions

All functions listed below are part of the [ComUse](https://www.ajiu9.cn/comuse/) library, each section categorizes functions based on their functionality.

IMPORTANT: Each function entry includes a short `Description` and a detailed `Reference`. When using any function, always consult the corresponding document in `./references` for Usage details and Type Declarations.

### Tools

| Function | Description | Invocation |
|----------|-------------|------------|
| [`awaitTo`](references/awaitTo.md) | Async await wrapper for easy error handling | AUTO |

### State

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useSessionStorage`](references/useSessionStorage.md) | Reactive [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) | AUTO |
| [`useStorage`](references/useStorage.md) | Create a reactive ref that can be used to access & modify [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) | AUTO |
| [`useStorageAsync`](references/useStorageAsync.md) | Reactive Storage in with async support | AUTO |

### Browser

| Function | Description | Invocation |
|----------|-------------|------------|
| [`getQueryParam`](references/getQueryParam.md) | Get a single query parameter (behind "#") | AUTO |
| [`getUrlParam`](references/getUrlParam.md) | Get a single URL parameter (from the "location.search" | AUTO |
| [`parseUrlParam`](references/parseUrlParam.md) | > Parse URL query parameters into an object | AUTO |
| [`useEventListener`](references/useEventListener.md) | Use EventListener with ease | AUTO |
| [`usePermission`](references/usePermission.md) | Reactive [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) | AUTO |
| [`windowPrint`](references/windowPrint.md) | Print using `window.print` via an iframe | AUTO |

### Animation

| Function | Description | Invocation |
|----------|-------------|------------|
| [`animation`](references/animation.md) | ## Usage | AUTO |
| [`ease`](references/ease.md) | > [easing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function) | AUTO |
| [`gesture`](references/gesture.md) |  | AUTO |
| [`useInterval`](references/useInterval.md) | Reactive counter increases on every interval | AUTO |
| [`useIntervalFn`](references/useIntervalFn.md) | Wrapper for `setInterval` with controls | AUTO |
| [`useRafFn`](references/useRafFn.md) | Call function on every `requestAnimationFrame` | AUTO |

### Component

| Function | Description | Invocation |
|----------|-------------|------------|
| [`tryOnMounted`](references/tryOnMounted.md) | Safe `onMounted` | AUTO |
| [`tryOnScopeDispose`](references/tryOnScopeDispose.md) | Safe `onScopeDispose` | AUTO |
| [`unrefElement`](references/unrefElement.md) | Retrieves the underlying DOM element from a Vue ref or component instance | AUTO |
| [`useMounted`](references/useMounted.md) | Mounted state in ref | AUTO |

### Watch

| Function | Description | Invocation |
|----------|-------------|------------|
| [`until`](references/until.md) | Promised one-time watch for changes | AUTO |
| [`watchPausable`](references/watchPausable.md) | Pausable watch | AUTO |
| [`watchWithFilter`](references/watchWithFilter.md) | `watch` with additional EventFilter control | AUTO |

### Reactivity

| Function | Description | Invocation |
|----------|-------------|------------|
| [`reactify`](references/reactify.md) | Converts plain functions into reactive functions | AUTO |
| [`toRef`](references/toRef.md) | Normalize value/ref/getter to `ref` or `computed` | EXPLICIT_ONLY |

### Time

| Function | Description | Invocation |
|----------|-------------|------------|
| [`parseTime`](references/parseTime.md) | Automatically update the time ago string when the time changes | AUTO |

### Utilities

| Function | Description | Invocation |
|----------|-------------|------------|
| [`amountCapital`](references/amountCapital.md) | 金额转大写 | AUTO |
| [`clone`](references/clone.md) | > [_proto_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) can be redefined as an own property on any object instance through Object.defineProperty() without triggering the setter | AUTO |
| [`compareNumbers`](references/compareNumbers.md) | ## Usage | AUTO |
| [`convertObjectKeys`](references/convertObjectKeys.md) | ## Usage | AUTO |
| [`parseGitUrl`](references/parseGitUrl.md) | ## Usage | AUTO |
| [`promise`](references/promise.md) | ### usage | AUTO |
| [`rand`](references/rand.md) | ### usage | AUTO |
| [`useBase64`](references/useBase64.md) | Reactive base64 transforming | AUTO |
| [`useConvertObjectKeys`](references/useConvertObjectKeys.md) | Basic counter with utility functions | AUTO |
| [`useCounter`](references/useCounter.md) | Basic counter with utility functions | AUTO |
| [`useDebounce`](references/useDebounce.md) | Debounce execution of a function | AUTO |
| [`useSupported`](references/useSupported.md) | SSR compatibility `isSupported` | AUTO |
| [`useThrottle`](references/useThrottle.md) | Throttle execution of a function | AUTO |
| [`useToggle`](references/useToggle.md) | A boolean switcher with utility functions | AUTO |
| [`utils`](references/utils.md) | ### usage | AUTO |

### Env

| Function | Description | Invocation |
|----------|-------------|------------|
| [`env`](references/env.md) | Check if the current environment | AUTO |

### @Integrations

| Function | Description | Invocation |
|----------|-------------|------------|
| [`useAxios`](references/useAxios.md) | Wrapper for [`axios`](https://github.com/axios/axios) | EXTERNAL |
| [`useQRCode`](references/useQRCode.md) | Wrapper for [`qrcode`](https://github.com/soldair/node-qrcode) | EXTERNAL |
| [`useVConsole`](references/useVConsole.md) | Wrapper for [`vconsole`](https://github.com/Tencent/vConsole) | EXTERNAL |


