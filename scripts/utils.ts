import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
// import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const DIR_ROOT = resolve(__dirname, '..')
console.log(DIR_ROOT)
export const DIR_SRC = resolve(__dirname, '../packages')
const DIR_TYPES = resolve(__dirname, '../types/packages')
console.log(DIR_ROOT, DIR_SRC, DIR_TYPES)

export async function getTypeDefinition(pkg: string, name: string): Promise<string | undefined> {
  const typingFilepath = join(DIR_TYPES, `${pkg}/${name}/index.d.ts`)

  console.log('typingFilepath', typingFilepath)

  if (!existsSync(typingFilepath))
    return

  let types = await fs.readFile(typingFilepath, 'utf-8')

  if (!types)
    return

  // clean up types
  types = types
    .replace(/import\(.*?\)\./g, '')
    .replace(/import[\s\S]+?from ?["'][\s\S]+?["']/g, '')
    .replace(/export \{\}/g, '')

  const prettier = await import('prettier')
  return (await prettier
    .format(
      types,
      {
        semi: false,
        parser: 'typescript',
      },
    ))
    .trim()
}

// const allTargets = fs.readdirSync('packages').filter((f) => {
//   if (!fs.statSync(`packages/${f}`).isDirectory())
//     return false

//   if (!fs.existsSync(`packages/${f}/package.json`)) return false

//   const pkg = require(`../packages/${f}/package.json`)
//   if (pkg.private && !pkg.buildOptions)
//     return false

//   return true
// })

// export const targets = (() => {
//   const ret = allTargets.slice()
//   console.log('ret')
//   // const name = 'comuse'
//   // const index = ret.findIndex(item => item === name)
//   // ret.splice(index, 1)
//   return ret
// })()
