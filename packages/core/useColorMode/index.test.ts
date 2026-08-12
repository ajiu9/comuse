import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useColorMode } from './index'

describe('useColorMode', () => {
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
    expect(useColorMode).toBeDefined()
  })

  it('should return light by default when system prefers light', async () => {
    const mode = useColorMode()
    mode.value = 'auto'
    await nextTick()
    expect(mode.value).toBe('light')
    expect(localStorage.getItem(storageKey)).toBe('auto')
    expect(htmlEl?.className).toMatch(/light/)
  })

  it('should translate auto mode when system prefers dark', async () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const mode = useColorMode()
    mode.value = 'auto'
    await nextTick()
    expect(mode.value).toBe('dark')
    expect(localStorage.getItem(storageKey)).toBe('auto')
    expect(htmlEl?.className).toMatch(/dark/)
  })

  it('should switch to dark mode', async () => {
    const mode = useColorMode()
    mode.value = 'dark'
    await nextTick()
    expect(mode.value).toBe('dark')
    expect(localStorage.getItem(storageKey)).toBe('dark')
    expect(htmlEl?.className).toMatch(/dark/)
  })

  it('should switch to light mode', async () => {
    const mode = useColorMode()
    mode.value = 'light'
    await nextTick()
    expect(mode.value).toBe('light')
    expect(localStorage.getItem(storageKey)).toBe('light')
    expect(htmlEl?.className).toMatch(/light/)
  })

  it('should support custom modes', async () => {
    const mode = useColorMode<'dim'>({ modes: { dim: 'dim' } })
    mode.value = 'dim'
    await nextTick()
    expect(mode.value).toBe('dim')
    expect(localStorage.getItem(storageKey)).toBe('dim')
    expect(htmlEl?.className).toMatch(/dim/)
  })

  it('should not persist mode when storageKey is null', () => {
    const mode = useColorMode({ storageKey: null })
    mode.value = 'dark'
    expect(mode.value).toBe('dark')
    expect(localStorage.getItem(storageKey)).toBeNull()
  })

  it('should set html attribute instead of class', async () => {
    const mode = useColorMode({ attribute: 'data-color-mode' })
    mode.value = 'dark'
    await nextTick()
    expect(htmlEl?.getAttribute('data-color-mode')).toBe('dark')
  })

  it('should not affect html when selector is invalid', async () => {
    const mode = useColorMode({ selector: 'unknown' })
    mode.value = 'auto'
    await nextTick()
    expect(mode.value).toBe('light')
    expect(htmlEl?.className).toBe('')
  })

  it('should call onChanged callback when mode changes', async () => {
    let changedMode: string | null = null
    const onChanged = (mode: string) => {
      changedMode = mode
    }
    const mode = useColorMode({ onChanged })
    mode.value = 'dark'
    await nextTick()
    expect(changedMode).toBe('dark')
  })

  it('should access store, system and state properties', () => {
    const mode = useColorMode()
    expect(mode.store).toBeDefined()
    expect(mode.system).toBeDefined()
    expect(mode.state).toBeDefined()
    expect(mode.store.value).toBe('auto')
    expect(mode.system.value).toBe('light')
    expect(mode.state.value).toBe('light')
  })

  it('should use custom storageKey', async () => {
    const customKey = 'my-theme'
    const mode = useColorMode({ storageKey: customKey })
    mode.value = 'dark'
    await nextTick()
    expect(localStorage.getItem(customKey)).toBe('dark')
    expect(localStorage.getItem(storageKey)).toBeNull()
  })

  it('should work with custom selector element', async () => {
    const target = document.createElement('div')
    document.body.appendChild(target)

    const mode = useColorMode({ selector: target, initialValue: 'light' })
    mode.value = 'dark'
    await nextTick()
    expect(target.className).toMatch(/dark/)

    document.body.removeChild(target)
  })
})
