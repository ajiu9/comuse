/**
 * 格式化工具函数
 * 提供下划线命名和驼峰命名之间的转换
 */

/**
 * 将下划线命名转换为驼峰命名
 * 例如: virtual_card_no -> virtualCardNo
 * @param str 下划线命名的字符串
 * @returns 驼峰命名的字符串
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * 将驼峰命名转换为下划线命名
 * 例如: virtualCardNo -> virtual_card_no
 * @param str 驼峰命名的字符串
 * @returns 下划线命名的字符串
 */
export function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, (_, letter) => `_${letter.toLowerCase()}`)
}

/**
 * 转换对象的键名格式
 * @param obj 要转换的对象
 * @param converter 转换函数 (snakeToCamel 或 camelToSnake)
 * @returns 转换后的新对象
 */
export function convertObjectKeys(obj: Record<string, any>, converter: (str: string) => string): Record<string, any> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj))
    return obj

  const result: Record<string, any> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = converter(key)
      result[newKey] = obj[key]
    }
  }

  return result
}
