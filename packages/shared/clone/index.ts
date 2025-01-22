import { hasOwn, isArray, isDate, isMap, isObject, isRegExp, isSet } from '../utils/index'

export function cloneJSON<T>(val: T): T {
  if (val === null || val === undefined) return val

  let k, out, tmp

  if (isArray(val)) {
    out = Array(k = val.length)

    while (k--) {
      tmp = val[k]
      out[k] = typeof tmp === 'object' ? cloneJSON(tmp) : tmp
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
        out[k] = typeof tmp === 'object' ? cloneJSON(tmp) : tmp
      }
    }
    return out as T
  }

  return val
}

export function clone<T>(val: T): T {
  if (typeof val !== 'object' || val === null) return val

  const str = Object.prototype.toString.call(val)

  let k, tmp

  if (isArray(val)) {
    k = val.length
    tmp = Array(k)
    while (k--)
      tmp[k] = clone(val[k])

    return tmp as unknown as T
  }

  if (isDate(val))
    return new Date(+val) as unknown as T

  if (isRegExp(val)) {
    tmp = new RegExp(val.source, val.flags)
    tmp.lastIndex = val.lastIndex
    return tmp as T
  }

  if (isSet(val)) {
    const tmpSet: Set<typeof val> = new Set<typeof val>()
    val.forEach((v) => {
      tmpSet.add(clone(v))
    })
    tmp = tmpSet
    return tmp as T
  }

  if (isMap(val)) {
    const tmpMap: Map<any, any> = new Map()
    val.forEach((v, key) => {
      tmpMap.set(clone(key), clone(v))
    })
    tmp = tmpMap
    return tmp as T
  }

  if (isObject(val)) {
    if (val.constructor !== Object && typeof val.constructor === 'function') {
      tmp = new (val.constructor as new () => any)()
      for (k in val) {
        if (hasOwn(val, k as keyof typeof val) && (tmp as any)[k] !== (val as any)[k])
          tmp[k] = clone((val as any)[k])
      }
    }
    else {
      tmp = {}
      for (k in val) {
        if (k === '__proto__') {
          Object.defineProperty(
            tmp, k, {
              value: clone(val[k]),
              configurable: true,
              enumerable: true,
              writable: true,
            },
          )
        }
        else
          (tmp as any)[k] = clone((val as any)[k])
      }
    }
    return tmp as T
  }

  if (str === '[object DataView]') {
    tmp = new DataView(clone((val as DataView).buffer))
    return tmp as unknown as T
  }

  if (str === '[object ArrayBuffer]') {
    tmp = (val as ArrayBuffer).slice(0)
    return tmp as unknown as T
  }

  return val
}
