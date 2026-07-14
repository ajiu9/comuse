---
category: Utilities
---

# debounce

Debounce execution of a function.

### usage

```ts
import { debounce } from 'comuse-shared'

const fn = debounce(() => {
  console.log('debounced')
}, 1000)

fn()
```

# throttle

Throttle execution of a function.

### usage

```ts
import { throttle } from 'comuse-shared'

const fn = throttle(() => {
  console.log('throttled')
}, 1000)

fn()
```

# splitKeyValues

Split key-value strings into object array.

### usage

```ts
import { splitKeyValues } from 'comuse-shared'

const data = splitKeyValues('id1,id2', 'name1,name2')

console.log(data) // [{ id: 'id1', name: 'name1' }, { id: 'id2', name: 'name2' }]
```

# uuid

Generate UUID v4.

### usage

```ts
import { uuid } from 'comuse-shared'

console.log(uuid()) // '4222fcfe-5721-4632-bede-6043885be57d'
```

# openFile

Open a file or URL.

### usage

```ts
import { openFile } from 'comuse-shared'

openFile('https://example.com/file.txt')
```

# toThousand

Format number with thousand separators.

### usage

```ts
import { toThousand } from 'comuse-shared'

console.log(toThousand(1234567.89)) // '1,234,567'
```

# randomString

Generate random string.

### usage

```ts
import { randomString } from 'comuse-shared'

console.log(randomString(10)) // 'a1b2c3d4e5'

console.log(randomString(10, 'number')) // '1234567890'
```
