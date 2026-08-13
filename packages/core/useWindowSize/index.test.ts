import { describe, expect, it } from 'vitest'
import { useWindowSize } from './index'

describe('useWindowSize', () => {
  it('should be defined', () => {
    expect(useWindowSize).toBeDefined()
  })

  it('should work', () => {
    const { width, height } = useWindowSize({ initialWidth: 100, initialHeight: 200 })

    expect(width.value).toBe(window.innerWidth)
    expect(height.value).toBe(window.innerHeight)
  })

  it('should exclude scrollbar', () => {
    const { width, height } = useWindowSize({ initialWidth: 100, initialHeight: 200, includeScrollbar: false })

    expect(width.value).toBe(window.document.documentElement.clientWidth)
    expect(height.value).toBe(window.document.documentElement.clientHeight)
  })

  it('should use outer size', () => {
    const { width, height } = useWindowSize({ initialWidth: 100, initialHeight: 200, type: 'outer' })

    expect(width.value).toBe(window.outerWidth)
    expect(height.value).toBe(window.outerHeight)
  })

  it('should return initial values when window is not available', () => {
    const { width, height } = useWindowSize({
      initialWidth: 100,
      initialHeight: 200,
      window: null as any,
    })

    expect(width.value).toBe(100)
    expect(height.value).toBe(200)
  })
})
