import { describe, expect, it } from 'vitest'
import { getRandom, uuid } from './index'

describe('uuid', () => {
  it('should generate a random uuid', () => {
    const result = uuid()
    expect(result).toHaveLength(36)
  })
})

describe('getRandom', () => {
  it('should generate a random number in range [0, 1000)', () => {
    const result = getRandom(1000)
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThan(1000)

    const result2 = getRandom(1000, 100)
    expect(result2).toBeGreaterThanOrEqual(100)
    expect(result2).toBeLessThan(1000)
  })
})
