import type { CommitInfo } from 'comuse-metadata'
import type { Plugin } from 'vite'

const ID = 'virtual:changelog'

export function ChangeLog(data: CommitInfo[]): Plugin {
  return {
    name: 'comuse-changelog',
    resolveId(id) {
      return id === ID ? ID : null
    },
    load(id) {
      if (id !== ID)
        return null
      return `export default ${JSON.stringify(data)}`
    },
  }
}
