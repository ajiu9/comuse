import type { UseConvertObjectKeysReturn } from '../types'

import { camelToSnake, convertObjectKeys, snakeToCamel } from 'comuse-shared'

export function useConvertObjectKeys(): UseConvertObjectKeysReturn {
  const _convertObjectKeys = (obj: Record<string, any>, toSnake = true): Record<string, any> => {
    return convertObjectKeys(obj, toSnake ? camelToSnake : snakeToCamel)
  }
  return {
    convertObjectKeys: _convertObjectKeys,
    snakeToCamel,
    camelToSnake,
  }
}
