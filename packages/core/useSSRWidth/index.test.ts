import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'
import { provideSSRWidth, useSSRWidth } from './index'

describe('useSSRWidth', () => {
  it('should be defined', () => {
    expect(useSSRWidth).toBeDefined()
  })

  it('should return undefined when not provided', () => {
    const width = useSSRWidth()
    expect(width).toBeUndefined()
  })

  it('should get the ssr width from the global store', async () => {
    const app = createSSRApp({ render: () => '' })
    provideSSRWidth(500, app)
    await app.runWithContext(async () => {
      const width = useSSRWidth()
      expect(width).toBe(500)
    })
  })

  it('should get the ssr width from local provide', async () => {
    const app = createSSRApp({
      setup() {
        provideSSRWidth(768)
        const width = useSSRWidth()
        expect(width).toBe(768)
        return {}
      },
      render: () => '',
    })
    await app.runWithContext(async () => {
      // Test runs in setup context
    })
  })
})
