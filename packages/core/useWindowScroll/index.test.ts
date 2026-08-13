import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useWindowScroll } from './index'

describe('useWindowScroll', () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollTo(0, 0)
  })

  it('should be defined', () => {
    expect(useWindowScroll).toBeDefined()
  })

  it('should return scroll position', async () => {
    const { x, y } = useWindowScroll()

    await nextTick()

    expect(x.value).toBe(0)
    expect(y.value).toBe(0)
  })

  it('should track isScrolling', async () => {
    const { isScrolling } = useWindowScroll()

    await nextTick()
    expect(isScrolling.value).toBe(false)
  })

  it('should return arrivedState', async () => {
    const { arrivedState } = useWindowScroll()

    await nextTick()

    expect(arrivedState.top).toBe(true)
    expect(arrivedState.left).toBe(true)
  })

  it('should return directions', async () => {
    const { directions } = useWindowScroll()

    await nextTick()

    expect(directions.left).toBe(false)
    expect(directions.right).toBe(false)
    expect(directions.top).toBe(false)
    expect(directions.bottom).toBe(false)
  })

  it('should accept options', async () => {
    const onScroll = vi.fn()
    const { x, y } = useWindowScroll({
      behavior: 'smooth',
      onScroll,
    })

    await nextTick()

    expect(x.value).toBe(0)
    expect(y.value).toBe(0)
  })

  it('should have measure function', async () => {
    const { measure } = useWindowScroll()

    await nextTick()

    expect(typeof measure).toBe('function')
    expect(() => measure()).not.toThrow()
  })
})
