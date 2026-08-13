---
category: Sensors
---

# useScroll

Reactive scroll position and state.

## Usage

```vue
<script setup lang="ts">
import { useScroll } from 'comuse-core'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const { x, y, isScrolling, arrivedState, directions } = useScroll(el)
</script>

<template>
  <div ref="el" />
</template>
```

### With offsets

```ts
import { useScroll } from 'comuse-core'
// ---cut---
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, {
  offset: { top: 30, bottom: 30, right: 30, left: 30 },
})
```

### Setting scroll position

Set the `x` and `y` values to make the element scroll to that position.

```vue
<script setup lang="ts">
import { useScroll } from 'comuse-core'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const { x, y } = useScroll(el)
</script>

<template>
  <div ref="el" />
  <button @click="x += 10">
    Scroll right 10px
  </button>
  <button @click="y += 10">
    Scroll down 10px
  </button>
</template>
```

### Smooth scrolling

Set `behavior: smooth` to enable smooth scrolling. The `behavior` option defaults to `auto`, which means no smooth scrolling. See the `behavior` option on [`window.scrollTo()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo) for more information.

```ts
import { useScroll } from 'comuse-core'
import { computed, ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const smooth = ref(false)
const behavior = computed(() => smooth.value ? 'smooth' : 'auto')
const { x, y } = useScroll(el, { behavior })
```

### Recalculate scroll state

You can call the `measure()` method to manually update the scroll position and `arrivedState` at any time.

This is useful, for example, after dynamic content changes or when you want to recalculate the scroll state outside of scroll events.

```ts
import { useScroll } from 'comuse-core'
import { nextTick, shallowRef, watch } from 'vue'

const el = ref<HTMLElement | null>(null)
const reactiveValue = shallowRef(false)

const { measure } = useScroll(el)

// In a watcher
watch(reactiveValue, () => {
  measure()
})

// Or inside any function
function updateScrollState() {
  // ...some logic
  nextTick(() => {
    measure()
  })
}
```

> [!NOTE]
> It's recommended to call `measure()` inside `nextTick()`, to ensure the DOM is updated first.
> The scroll state is initialized automatically `onMount`.
> You only need to call `measure()` manually if you want to recalculate the state after some dynamic changes.

## Return Values

- `x` - Horizontal scroll position (writable)
- `y` - Vertical scroll position (writable)
- `isScrolling` - Whether the element is currently scrolling
- `arrivedState` - Object with `left`, `right`, `top`, `bottom` booleans indicating scroll boundaries
- `directions` - Object with `left`, `right`, `top`, `bottom` booleans indicating scroll direction
- `measure` - Function to manually recalculate scroll state
