import { getUrlParam, inBrowser } from 'comuse-shared'
import { shallowRef } from 'vue'

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
      // 这里不做类型推断，直接 any
      const { default: VConsole } = await import('vconsole')
      ;(window as any).vConsole = vConsole.value = new VConsole()
    }
  }

  return vConsole
}
