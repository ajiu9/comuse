---
category: Utilities
---

## debounce

### usage

```ts
import { debounce } from 'comuse-shared'

const fn = debounce(() => {
  console.log('debounced')
}, 1000)

fn()
```

## throttle

### usage

```ts
import { throttle } from 'comuse-shared'

const fn = throttle(() => {
  console.log('throttled')
}, 1000)

fn()
```

## splitKeyValues

### usage

```ts
import { splitKeyValues } from 'comuse-shared'

const data = splitKeyValues('id1,id2', 'name1,name2')

console.log(data) // [{ id: 'id1', name: 'name1' }, { id: 'id2', name: 'name2' }]
```

## uuid

### usage

```ts
import { uuid } from 'comuse-shared'

console.log(uuid()) // '4222fcfe-5721-4632-bede-6043885be57d'
```

## openFile

### usage

```ts
import { openFile } from 'comuse-shared'

openFile('https://example.com/file.txt')
```
