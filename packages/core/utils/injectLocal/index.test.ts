import type { InjectionKey } from 'vue'
import { describe, expect, it } from 'vitest'
import { createApp, defineComponent, h, nextTick, provide, ref } from 'vue'
import { provideLocal } from '../provideLocal/index'
import { injectLocal } from './index'

describe('injectLocal', () => {
  it('should be defined', () => {
    expect(injectLocal).toBeDefined()
  })

  it('should inject value from provideLocal', async () => {
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
    const key = Symbol('test-key') as InjectionKey<string>
    const injectedValue = ref<string | undefined>()

    const Child = defineComponent({
      setup() {
        injectedValue.value = injectLocal(key)
        return () => h('div')
      },
    })

    const App = defineComponent({
      setup() {
        provideLocal(key, 'typed-value')
        return () => h(Child)
      },
    })

    createApp(App).mount(document.createElement('div'))
    await nextTick()

    expect(injectedValue.value).toBe('typed-value')
  })

  it('should fallback to inject if not in localProvidedStateMap', async () => {
    const injectedValue = ref<string | undefined>()

    const Child = defineComponent({
      setup() {
        injectedValue.value = injectLocal('parentKey')
        return () => h('div')
      },
    })

    const App = defineComponent({
      setup() {
        provide('parentKey', 'parent-value')
        return () => h(Child)
      },
    })

    createApp(App).mount(document.createElement('div'))
    await nextTick()

    expect(injectedValue.value).toBe('parent-value')
  })

  it('should throw error when called outside setup', () => {
    expect(() => {
      injectLocal('test')
    }).toThrow('injectLocal must be called in setup')
  })
})
