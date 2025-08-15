import { pattern } from '../utils/pattern'

/**
 * Convert string value to appropriate type
 * @param value - string value to convert
 * @returns converted value
 */
function convertValue(value: string): unknown {
  const VALUE_MAP = {
    'null': null,
    undefined,
    'true': true,
    'false': false,
    NaN,
    Infinity,
    '-Infinity': -Infinity,
  }

  if (value in VALUE_MAP)
    return VALUE_MAP[value as keyof typeof VALUE_MAP]

  if (pattern.number.test(value))
    return Number(value)

  return value
}

/**
 * parse url params
 *
 * @example
 * ```js
 * parseUrlParam('?key1=100&key2=true&key3=null&key4=undefined&key5=NaN&key6=10.888&key7=Infinity&key8=test')
 * // \{"key1":"100","key2":"true","key3":"null","key4":"undefined","key5":"NaN","key6":"10.888","key7":"Infinity","key8":"test"\}
 *
 * parseUrlParam('?key1=100&key2=true&key3=null&key4=undefined&key5=NaN&key6=10.888&key7=Infinity&key8=test', true)
 * // \{"key1":100,"key2":true,"key3":null,"key5":NaN,"key6":10.888,"key7":Infinity,"key8":"test"\}
 * ```
 * @param url - url string (like: ?key1=value1&key2=value2)
 * @param covert - Converts a specific string to a corresponding value (Scientific notation, binary, octal and hexadecimal types of data are not converted, like: 0b111, 0o13, 0xFF, 1e3, -1e-2)
 * @returns object
 */
export function parseUrlParam(url: string, covert = false) {
  if (!url) {
    // eslint-disable-next-line no-console
    console.info('url is required')
    return {}
  }

  url = url.substring(url.lastIndexOf('?') + 1) // delete string before "?"

  const result: Record<string, unknown> = {}

  // Extract all key-value pairs using regex
  const params = url.match(/([^?&=]+)=([^?&=]*)/g) || []

  params.forEach((param) => {
    const [key, value] = param.split('=')
    const decodedKey = decodeURIComponent(key)
    const decodedValue = decodeURIComponent(value)

    if (covert)
      result[decodedKey] = convertValue(decodedValue)
    else
      result[decodedKey] = decodedValue
  })

  if (covert) return result as Record<string, unknown>
  return result as Record<string, string>
}
