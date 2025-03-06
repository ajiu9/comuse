---
category: Utilities
---

# useToggle

A boolean switcher with utility functions.

## Usage

```js
import { useToggle } from 'comuse-core'

const [value, toggle] = useToggle()
```

When you pass a ref, `useToggle` will return a simple toggle function instead:

```js
import { useToggle } from 'comuse-core'
import { ref } from 'vue'

const value = ref(true)
const toggleValue = useToggle(value)
```

Note: be aware that the toggle function accepts the first argument as the override value. You might want to avoid directly passing the function to events in the template, as the event object will pass in.

```html
<!-- caution: $event will be pass in -->
<button @click="toggleValue" />
<!-- recommended to do this -->
<button @click="toggleValue()" />
```
