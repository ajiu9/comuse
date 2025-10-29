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
export declare function parseUrlParam(url: string, covert?: boolean): Record<string, unknown>;
