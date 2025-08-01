---
category: Reactivity
alias: createReactiveFn
---

# reactify

Converts plain functions into reactive functions. The converted function accepts refs as its arguments and returns a ComputedRef, with proper typing.

## Usage

Basic example

```ts
import { reactify } from 'comuse-core'
import { shallowRef } from 'vue'

// a plain function
function add(a: number, b: number): number {
  return a + b
}

// now it accept refs and returns a computed ref
// (a: number | Ref<number>, b: number | Ref<number>) => ComputedRef<number>
const reactiveAdd = reactify(add)

const a = shallowRef(1)
const b = shallowRef(2)
const sum = reactiveAdd(a, b)

console.log(sum.value) // 3

a.value = 5

console.log(sum.value) // 7
```

An example of implementing a reactive [Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem).

<!-- eslint-skip -->

```ts
import { reactify } from 'comuse-core'
import { shallowRef } from 'vue'

const pow = reactify(Math.pow)
const sqrt = reactify(Math.sqrt)
const add = reactify((a: number, b: number) => a + b)

const a = shallowRef(3)
const b = shallowRef(4)
const c = sqrt(add(pow(a, 2), pow(b, 2)))
console.log(c.value) // 5

// 5:12:13
a.value = 5
b.value = 12
console.log(c.value) // 13
```

You can also do it this way:

```ts
import { reactify } from 'comuse-core'
import { shallowRef } from 'vue'

function pythagorean(a: number, b: number) {
  return Math.sqrt(a ** 2 + b ** 2)
}

const a = shallowRef(3)
const b = shallowRef(4)

const c = reactify(pythagorean)(a, b)
console.log(c.value) // 5
```

Another example of making reactive `stringify`

```ts
import { reactify } from 'comuse-core'
import { shallowRef } from 'vue'

const stringify = reactify(JSON.stringify)

const obj = shallowRef(42)
const dumped = stringify(obj)

console.log(dumped.value) // '42'

obj.value = { foo: 'bar' }

console.log(dumped.value) // '{"foo":"bar"}'
```
