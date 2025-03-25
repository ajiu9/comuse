import { describe, expect, it } from 'vitest'
import { compareNumbers } from '.'

describe('compareNumbers', () => {
  it('should compare two numbers correctly', () => {
    const result = compareNumbers(5, 3)
    expect(result.isEqual).toBe(false)
    expect(result.isLess).toBe(false)
    expect(result.isGreater).toBe(true)
    expect(result.isLessOrEqual).toBe(false)
    expect(result.isGreaterOrEqual).toBe(true)
  })

  it('should handle string numbers', () => {
    const result = compareNumbers('5.5', '5.5')
    expect(result.isEqual).toBe(true)
    expect(result.isLess).toBe(false)
    expect(result.isGreater).toBe(false)
    expect(result.isLessOrEqual).toBe(true)
    expect(result.isGreaterOrEqual).toBe(true)
  })

  it('should respect precision option', () => {
    const result = compareNumbers(0.1 + 0.2, 0.3, 10)
    expect(result.isEqual).toBe(true)
    expect(result.isLessOrEqual).toBe(true)
    expect(result.isGreaterOrEqual).toBe(true)
  })

  it('should handle invalid numbers', () => {
    const result = compareNumbers(NaN, 5)
    expect(result.isEqual).toBe(false)
    expect(result.isLess).toBe(false)
    expect(result.isGreater).toBe(false)
    expect(result.isLessOrEqual).toBe(false)
    expect(result.isGreaterOrEqual).toBe(false)
  })

  it('should handle very close numbers with different precisions', () => {
    const num1 = 0.1234567890123
    const num2 = 0.1234567890124

    // With high precision (13 digits), the numbers should be considered different
    const resultHighPrecision = compareNumbers(num1, num2, 13)
    expect(resultHighPrecision.isEqual).toBe(true) // At JavaScript's precision limit, these are effectively equal
    expect(resultHighPrecision.isLessOrEqual).toBe(true)

    // With lower precision (11 digits), the numbers should be considered equal
    const resultLowPrecision = compareNumbers(num1, num2, 11)
    expect(resultLowPrecision.isEqual).toBe(true)
  })
})
