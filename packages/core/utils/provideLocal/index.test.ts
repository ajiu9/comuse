import type { InjectionKey } from 'vue'
import { describe, expect, it } from 'vitest'
import { createApp, defineComponent, h, nextTick, ref } from 'vue'
import { injectLocal } from '../injectLocal/index'
import { provideLocal } from './index'

describe('provideLocal', () => {
  it('should be defined', () => {
    expect(provideLocal).toBeDefined()
  })

  it('should provide value that can be injected with injectLocal', async () => {
    const injectedValue = ref<any>(null)

    const Child = defineComponent({
      setup() {
        injectedValue.value = injectLocal('myKey')
        return () => h('div')
      },
    })

    const App = defineComponent({
      setup() {
        provideLocal('myKey', 'myValue')
        return () => h(Child)
      },
    })

    createApp(App).mount(document.createElement('div'))
    await nextTick()

    expect(injectedValue.value).toBe('myValue')
  })

  it('should work with InjectionKey', async () => {
    const key = Symbol('test-key') as InjectionKey<number>
    const injectedValue = ref<number | undefined>()

    const Child = defineComponent({
      setup() {
        injectedValue.value = injectLocal(key)
        return () => h('div')
      },
    })

    const App = defineComponent({
      setup() {
        provideLocal(key, 42)
        return () => h(Child)
      },
    })

    createApp(App).mount(document.createElement('div'))
    await nextTick()

    expect(injectedValue.value).toBe(42)
  })

  it('should throw error when called outside setup', () => {
    expect(() => {
      provideLocal('test', 'value')
    }).toThrow('provideLocal must be called in setup')
  })

  it('should allow injectLocal in same component', async () => {
    const result = ref<any>(null)

    const App = defineComponent({
      setup() {
        provideLocal('sameKey', 'sameValue')
        result.value = injectLocal('sameKey')
        return () => h('div')
      },
    })

    createApp(App).mount(document.createElement('div'))
    await nextTick()

    expect(result.value).toBe('sameValue')
  })
})
