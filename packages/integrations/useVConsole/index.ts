import type { Ref } from 'vue'
import { getUrlParam, inBrowser } from 'comuse-shared'
import VConsole from 'vconsole'
import { shallowRef } from 'vue'

declare global {
  interface Window {
    vConsole?: VConsole
  }
}

let vConsole: Ref<VConsole | null>
const defaultOptions = {
  debug: false,
  hostname: [],
}

export interface UseVConsoleOptions {
  debug: boolean
  hostname: string[]
}

export function useVConsole(options: Partial<UseVConsoleOptions> = {}) {
  if (!inBrowser) return
  if (!VConsole) {
    console.warn(
      '[comuse-integrations] no "VConsole" instance found, please be sure to import `vConsole` before `comuse-integrations`.',
    )
    return
  }

  options = Object.assign({}, defaultOptions, {
    debug: !!getUrlParam('debug'),
    ...options,
  })

  if (!vConsole) {
    vConsole = shallowRef(null)
    if (options.debug || options.hostname?.includes(window.location.hostname))
      window.vConsole = vConsole.value = new VConsole()
  }

  return vConsole
}
