import { isArray, isObject } from '../utils/index'

type cloneType = 'index' | 'json' | 'lite' | 'full'
export function clone<T>(val: T, type: cloneType = 'index'): T {
  if (type === 'json') return cloneJSON(val)
  return val
}

export function cloneJSON<T>(val: T): T {
  if (val === null || val === undefined) return val

  let k, out, tmp

  if (isArray(val)) {
    out = Array(k = val.length)

    while (k--) {
      tmp = val[k]
      out[k] = isObject(tmp) ? cloneJSON(tmp) : tmp
    }
    return out as T
  }

  if (isObject(val)) {
    const out: Record<string, any> = {}
    for (const k in val) {
      if (k === '__proto__') {
        Object.defineProperty(
          out, k, {
            value: cloneJSON(val[k]),
            configurable: true,
            enumerable: true,
            writable: true,
          },
        )
      }
      else {
        tmp = val[k]
        out[k] = isObject(tmp) ? cloneJSON(tmp) : tmp
      }
    }
    return out as T
  }

  return val
}
