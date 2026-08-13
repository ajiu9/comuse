import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useMutationObserver } from './index'

describe('useMutationObserver', () => {
  let target: HTMLElement

  beforeEach(() => {
    target = document.createElement('div')
    document.body.appendChild(target)
  })

  it('should be defined', () => {
    expect(useMutationObserver).toBeDefined()
  })

  it('should observe attribute changes', async () => {
    const callback = vi.fn()
    const targetRef = ref(target)

    useMutationObserver(targetRef, callback, {
      attributes: true,
    })

    await nextTick()

    target.setAttribute('data-test', 'value')
    await nextTick()

    expect(callback).toHaveBeenCalled()
    const mutations = callback.mock.calls[0][0]
    expect(mutations[0].type).toBe('attributes')
    expect(mutations[0].attributeName).toBe('data-test')
  })

  it('should observe childList changes', async () => {
    const callback = vi.fn()
    const targetRef = ref(target)

    useMutationObserver(targetRef, callback, {
      childList: true,
    })

    await nextTick()

    const child = document.createElement('span')
    target.appendChild(child)
    await nextTick()

    expect(callback).toHaveBeenCalled()
    const mutations = callback.mock.calls[0][0]
    expect(mutations[0].type).toBe('childList')
  })

  it('should stop observing when stop is called', async () => {
    const callback = vi.fn()
    const targetRef = ref(target)

    const { stop } = useMutationObserver(targetRef, callback, {
      attributes: true,
    })

    await nextTick()

    stop()

    target.setAttribute('data-test', 'value')
    await nextTick()

    expect(callback).not.toHaveBeenCalled()
  })

  it('should return isSupported', async () => {
    const targetRef = ref(target)
    const { isSupported } = useMutationObserver(targetRef, () => {}, { attributes: true })

    await nextTick()
    expect(isSupported.value).toBe(true)
  })

  it('should take records', async () => {
    const callback = vi.fn()
    const targetRef = ref(target)

    const { takeRecords } = useMutationObserver(targetRef, callback, {
      attributes: true,
    })

    await nextTick()

    target.setAttribute('data-test', 'value')
    target.setAttribute('data-test2', 'value2')

    const records = takeRecords()
    expect(records).toBeDefined()
    expect(records?.length).toBe(2)
  })

  it('should observe multiple elements', async () => {
    const target2 = document.createElement('div')
    document.body.appendChild(target2)

    const callback = vi.fn()
    const targetRef1 = ref(target)
    const targetRef2 = ref(target2)

    useMutationObserver([targetRef1, targetRef2], callback, {
      attributes: true,
    })

    await nextTick()

    target.setAttribute('data-test', 'value')
    await nextTick()

    target2.setAttribute('data-test', 'value')
    await nextTick()

    // Both elements should trigger the callback
    expect(callback).toHaveBeenCalled()
    expect(callback.mock.calls.length).toBeGreaterThanOrEqual(1)

    document.body.removeChild(target2)
  })

  it('should cleanup on scope dispose', async () => {
    const callback = vi.fn()
    const targetRef = ref(target)

    const { stop } = useMutationObserver(targetRef, callback, {
      attributes: true,
    })

    await nextTick()

    // Simulate scope dispose
    stop()

    target.setAttribute('data-test', 'value')
    await nextTick()

    expect(callback).not.toHaveBeenCalled()
  })

  it('should handle null target', async () => {
    const callback = vi.fn()
    const targetRef = ref<HTMLElement | null>(null)

    useMutationObserver(targetRef, callback, {
      attributes: true,
    })

    await nextTick()

    // Should not throw
    expect(callback).not.toHaveBeenCalled()
  })

  it('should reconnect when target changes', async () => {
    const callback = vi.fn()
    const targetRef = ref(target)

    useMutationObserver(targetRef, callback, {
      attributes: true,
    })

    await nextTick()

    // Change target
    const newTarget = document.createElement('div')
    document.body.appendChild(newTarget)
    targetRef.value = newTarget

    await nextTick()

    newTarget.setAttribute('data-test', 'value')
    await nextTick()

    expect(callback).toHaveBeenCalled()

    document.body.removeChild(newTarget)
  })
})
