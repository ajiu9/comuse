import ajiu9 from '@ajiu9/eslint-config'
import { getUrlParam, inBrowser } from 'comuse-shared'
import { shallowRef } from 'vue'

declare global {
  interface Window {
    vConsole?: any // 用 any 或者自己写一个简单的类型
  }
}

let vConsole: ReturnType<typeof shallowRef<any | null>>

export interface UseVConsoleOptions {
  debug: boolean
  hostname: string[]
}

const defaultOptions: UseVConsoleOptions = {
  debug: false,
  hostname: [],
}

export async function useVConsole(options: Partial<UseVConsoleOptions> = {}) {
  if (!inBrowser) return

  options = Object.assign({}, defaultOptions, {
    debug: !!getUrlParam('debug'),
    ...options,
  })

  if (!vConsole) {
    vConsole = shallowRef(null)
    if (options.debug || options.hostname?.includes(window.location.hostname)) {
      const { default: VConsole } = await import('vconsole')
      window.vConsole = vConsole.value = new VConsole()
    }
  }

  return vConsole
}

export default ajiu9({
  formatters: true,
  ignores: [
    '**/cache',
    '**/dist',
    'playgrounds',
  ],
},
{
  files: [
    '**/*.md',
    '**/*.md/*.[jt]s',
    '**/*.md/*.vue',
    '**/demo.vue',
    '**/demo.client.vue',
    '**/*.test.ts',
    'scripts/*.ts',
  ],
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-restricted-imports': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-unused-refs': 'off',
    'vue/require-v-for-key': 'off',
    'ts/no-unused-vars': 'off',
    'ts/no-redeclare': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
})
