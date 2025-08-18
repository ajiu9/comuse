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
// 增加是否递归转换
export function convertObjectKeys(obj: Record<string, any>, converter: (str: string) => string, recursive = true): Record<string, any> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj))
    return obj

  const result: Record<string, any> = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 递归转换嵌套对象
      if (recursive) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key]))
          result[converter(key)] = convertObjectKeys(obj[key], converter, recursive)
        else if (Array.isArray(obj[key])) {
          result[converter(key)] = obj[key].map((item: any) => {
            if (typeof item === 'object')
              return convertObjectKeys(item, converter, recursive)
            return item
          })
        }
        else {
          const newKey = converter(key)
          result[newKey] = obj[key]
        }
      }
      else {
        const newKey = converter(key)
        result[newKey] = obj[key]
      }
    }
  }

  return result
}
