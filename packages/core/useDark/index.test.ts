import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useDark } from './index'

describe('useDark', () => {
  const storageKey = 'comuse-color-scheme'
  const htmlEl = document.querySelector('html')

  // Mock matchMedia for system preference
  const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))

  beforeEach(() => {
    localStorage.clear()
    htmlEl!.className = ''
    vi.stubGlobal('matchMedia', mockMatchMedia)
    mockMatchMedia.mockClear()
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  })

  it('should be defined', () => {
    expect(useDark).toBeDefined()
  })

  it('should return false by default when system prefers light', async () => {
    const isDark = useDark()
    await nextTick()
    expect(isDark.value).toBe(false)
    expect(htmlEl?.className).toBe('')
  })

  it('should return true when system prefers dark', async () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const isDark = useDark()
    await nextTick()
    expect(isDark.value).toBe(true)
    expect(htmlEl?.className).toMatch(/dark/)
  })

  it('should toggle to dark mode', async () => {
    const isDark = useDark()
    isDark.value = true
    await nextTick()
    expect(isDark.value).toBe(true)
    expect(htmlEl?.className).toMatch(/dark/)
    expect(localStorage.getItem(storageKey)).toBe('dark')
  })

  it('should toggle to light mode', async () => {
    const isDark = useDark()
    // First set to dark
    isDark.value = true
    await nextTick()
    expect(htmlEl?.className).toMatch(/dark/)

    // Then toggle to light
    // Since system prefers light (matches: false), setting isDark = false
    // will switch to 'auto' mode (not 'light') because it matches system preference
    isDark.value = false
    await nextTick()
    expect(isDark.value).toBe(false)
    expect(htmlEl?.className).toBe('') // valueLight defaults to ''
    expect(localStorage.getItem(storageKey)).toBe('auto')
  })

  it('should set auto mode when toggling to system preference', async () => {
    // System prefers dark
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const isDark = useDark()
    await nextTick()

    // System is dark, setting isDark = true should switch to auto
    isDark.value = true
    await nextTick()
    expect(localStorage.getItem(storageKey)).toBe('auto')
  })

  it('should support custom valueDark and valueLight', async () => {
    const isDark = useDark({
      valueDark: 'my-dark',
      valueLight: 'my-light',
    })
    isDark.value = true
    await nextTick()
    expect(htmlEl?.className).toMatch(/my-dark/)

    isDark.value = false
    await nextTick()
    expect(htmlEl?.className).toMatch(/my-light/)
  })

  it('should call onChanged callback', async () => {
    let isDarkValue: boolean | null = null
    const onChanged = (dark: boolean) => {
      isDarkValue = dark
    }
    const isDark = useDark({ onChanged })
    isDark.value = true
    await nextTick()
    expect(isDarkValue).toBe(true)
  })

  it('should use custom selector', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)

    const isDark = useDark({ selector: target })
    isDark.value = true
    await nextTick()
    expect(target.className).toMatch(/dark/)

    document.body.removeChild(target)
  })

  it('should use custom attribute', async () => {
    const isDark = useDark({ attribute: 'data-theme' })
    isDark.value = true
    await nextTick()
    expect(htmlEl?.getAttribute('data-theme')).toBe('dark')
  })

  it('should not persist when storageKey is null', () => {
    const isDark = useDark({ storageKey: null })
    isDark.value = true
    expect(localStorage.getItem(storageKey)).toBeNull()
  })
})
