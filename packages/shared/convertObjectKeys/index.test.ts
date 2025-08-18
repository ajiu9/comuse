import { describe, expect, it } from 'vitest'
import { camelToSnake, convertObjectKeys, snakeToCamel } from './index'

describe('convertObjectKeys', () => {
  it('should convert camelCase to snake_case', () => {
    const obj = { camelCaseKey: 'value', anotherKey: 123 }
    const result = convertObjectKeys(obj, camelToSnake)
    expect(result).toEqual({ camel_case_key: 'value', another_key: 123 })
  })

  it('should convert snake_case to camelCase', () => {
    const obj = { snake_case_key: 'value', another_key: 123 }
    const result = convertObjectKeys(obj, snakeToCamel)
    expect(result).toEqual({ snakeCaseKey: 'value', anotherKey: 123 })
  })

  it('should return an empty object if input is empty', () => {
    const result = convertObjectKeys({}, camelToSnake)
    expect(result).toEqual({})
  })
})

describe('camelToSnake', () => {
  it('should convert camelCase to snake_case', () => {
    const str = 'camelCase'
    const result = camelToSnake(str)
    expect(result).toBe('camel_case')
  })
})

describe('snakeToCamel', () => {
  it('should convert snake_case to camelCase', () => {
    const str = 'snake_case'
    const result = snakeToCamel(str)
    expect(result).toBe('snakeCase')
  })
})

// recursive
describe('convertObjectKeys recursive true', () => {
  it('should convert nested object keys', () => {
    const obj = {
      nested: {
        camelCaseKey: 'value',
      },
    }
    const result = convertObjectKeys(obj, camelToSnake)
    expect(result).toEqual({
      nested: {
        camel_case_key: 'value',
      },
    })
  })
  // array
  it('should convert array', () => {
    const obj = {
      nested: [
        {
          camelCaseKey: 'value',
          nested: {
            camelCaseKey: 'value',
          },
        },
        {
          camelCaseKey: 'value2',
          nested: {
            camelCaseKey: 'value',
          },
        },
      ],
    }
    const result = convertObjectKeys(obj, camelToSnake)
    expect(result).toEqual({
      nested: [
        {
          camel_case_key: 'value',
          nested: {
            camel_case_key: 'value',
          },
        },
        {
          camel_case_key: 'value2',
          nested: {
            camel_case_key: 'value',
          },
        },
      ],
    })
  })
})
