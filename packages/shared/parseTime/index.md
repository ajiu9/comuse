---
category: Time
---

# formatTime

Automatically update the time ago string when the time changes.

formatter:

- year: yyyy
- quarter: q
- month: MM
- day: dd
- hour: hh
- minute: mm
- second: ss
- millisecond: S

## Usage

```js
import { formatTime, parseTime } from 'comuse-shared'

const timeAgo = formatTime(new Date(2024, 12, 1))

parseTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
```
