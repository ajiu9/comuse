---
category: Animation
related: animation
---

# Ease

> [easing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)

The code defines easing functions that are commonly used in animations to create smooth transitions. The main function cubicBezier calculates the y-value for a given x-value using cubic Bezier curves. Predefined easing functions like ease, easeIn, easeOut, and easeInOut are provided for convenience.

## Usage

```ts
import { Animation, ease } from 'comuse-shared'

const animations = new Animation({
  object: el.value.style,
  property: 'transform',
  startValue: 0,
  endValue: 500,
  duration: 2000,
  easing: ease,
  template: v => `translateX(${v}px)`,
})
```
