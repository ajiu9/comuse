import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useScroll } from './index'

describe('useScroll', () => {
  let target: HTMLElement

  beforeEach(() => {
    target = document.createElement('div')
    target.style.width = '100px'
    target.style.height = '100px'
    target.style.overflow = 'auto'
    document.body.appendChild(target)

    // Add content to make it scrollable
    const content = document.createElement('div')
    content.style.width = '500px'
    content.style.height = '500px'
    target.appendChild(content)
  })

  it('should be defined', () => {
    expect(useScroll).toBeDefined()
  })

  it('should return scroll position', async () => {
    const targetRef = ref(target)
    const { x, y } = useScroll(targetRef)

    await nextTick()

    expect(x.value).toBe(0)
    expect(y.value).toBe(0)
  })

  it('should track isScrolling', async () => {
    const targetRef = ref(target)
    const { isScrolling } = useScroll(targetRef)

    await nextTick()
    expect(isScrolling.value).toBe(false)
  })

  it('should return arrivedState', async () => {
    const targetRef = ref(target)
    const { arrivedState } = useScroll(targetRef)

    await nextTick()

    // Initially at top-left corner
    expect(arrivedState.left).toBe(true)
    expect(arrivedState.top).toBe(true)
    // Note: jsdom doesn't fully implement scroll dimensions,
    // so right/bottom may not be accurate
  })

  it('should return directions', async () => {
    const targetRef = ref(target)
    const { directions } = useScroll(targetRef)

    await nextTick()

    expect(directions.left).toBe(false)
    expect(directions.right).toBe(false)
    expect(directions.top).toBe(false)
    expect(directions.bottom).toBe(false)
  })

  it('should call onScroll callback', async () => {
    const onScroll = vi.fn()
    const targetRef = ref(target)

    useScroll(targetRef, { onScroll })

    await nextTick()

    target.dispatchEvent(new Event('scroll'))
    await nextTick()

    expect(onScroll).toHaveBeenCalled()
  })

  it('should call onStop callback when scrolling ends', async () => {
    vi.useFakeTimers()

    const onStop = vi.fn()
    const targetRef = ref(target)

    useScroll(targetRef, { onStop, idle: 100 })

    await nextTick()

    target.dispatchEvent(new Event('scroll'))
    await nextTick()

    // Wait for debounce
    vi.advanceTimersByTime(150)
    await nextTick()

    expect(onStop).toHaveBeenCalled()

    vi.useRealTimers()
  })

  it('should measure scroll state manually', async () => {
    const targetRef = ref(target)
    const { measure, arrivedState } = useScroll(targetRef)

    await nextTick()

    // Just verify measure doesn't throw
    expect(() => measure()).not.toThrow()
  })

  it('should handle null target', async () => {
    const targetRef = ref<HTMLElement | null>(null)
    const { x, y } = useScroll(targetRef)

    await nextTick()

    expect(x.value).toBe(0)
    expect(y.value).toBe(0)
  })

  it('should support throttle option', async () => {
    const onScroll = vi.fn()
    const targetRef = ref(target)

    useScroll(targetRef, { onScroll, throttle: 100 })

    await nextTick()

    target.dispatchEvent(new Event('scroll'))
    await nextTick()

    expect(onScroll).toHaveBeenCalled()
  })

  it('should support offset option', async () => {
    const targetRef = ref(target)
    const { arrivedState } = useScroll(targetRef, {
      offset: { top: 10, bottom: 10, left: 10, right: 10 },
    })

    await nextTick()

    expect(arrivedState).toBeDefined()
  })
})
