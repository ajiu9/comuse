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
      const { default: VConsole } = await import('vconsole')
      ;(window as any).vConsole = vConsole.value = new VConsole()
    }
  }

  return vConsole
}
