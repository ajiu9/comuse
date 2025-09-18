export interface PackageManifest {
  name: string
  display: string
  addon?: boolean
  author?: string
  description?: string
  external?: string[]
  globals?: Record<string, string>
  manualImport?: boolean
  deprecated?: boolean
  submodules?: boolean
  build?: boolean
  iife?: boolean
  cjs?: boolean
  mjs?: boolean
  dts?: boolean
  target?: string
  utils?: boolean
  copy?: string[]
}

export const packages: PackageManifest[] = [
  {
    name: 'core',
    display: 'Comuse',
    description: 'Collection of essential Vue Composition Utilities',
  },
  {
    name: 'metadata',
    display: 'Metadata for Comuse functions',
    manualImport: true,
    iife: false,
    utils: true,
  },
  {
    name: 'shared',
    display: 'Shared',
    description: 'Shared utilities',
    cjs: true,
  },
  {
    name: 'integrations',
    display: 'Integrations',
    description: 'Integration wrappers for utility libraries',
    addon: true,
    submodules: true,
    external: [
      'qrcode',
      'vconsole',
    ],
    globals: {
      qrcode: 'QRCode',
      vconsole: 'VConsole',
    },
  },
]
