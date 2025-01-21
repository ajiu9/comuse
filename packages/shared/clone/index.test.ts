import { describe, expect, it } from 'vitest'
import { cloneJSON } from './index'

describe('cloneJSON', () => {
  it('should return null when input is null', () => {
    expect(cloneJSON(null)).toBe(null)
  })

  it('should return undefined when input is undefined', () => {
    expect(cloneJSON(undefined)).toBe(undefined)
  })

  it('should clone an array correctly', () => {
    const input = [1, 2, 3, { a: 4 }]
    const output = cloneJSON(input)
    expect(output).toEqual(input)
    expect(output).not.toBe(input)
    expect(output[3]).toEqual(input[3])
    expect(output[3]).not.toBe(input[3])
  })

  it('should clone an object correctly', () => {
    const input = { a: 1, b: { c: 2 } }
    const output = cloneJSON(input)
    expect(output).toEqual(input)
    expect(output).not.toBe(input)
    expect(output.b).toEqual(input.b)
    expect(output.b).not.toBe(input.b)
  })

  it('should handle __proto__ property correctly', () => {
    const input = {}
    Object.defineProperty(input, '__proto__', {
      value: { a: 1 },
      configurable: true,
      enumerable: true,
      writable: true,
    })
    const output = cloneJSON(input)
    expect(output.__proto__).toEqual(input.__proto__)
    expect(output.__proto__).not.toBe(input.__proto__)
  })
})
