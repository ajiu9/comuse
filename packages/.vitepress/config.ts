import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { defineConfig } from 'vitepress'
import { currentVersion } from '../../meta/versions'
import { categoryNames, coreCategoryNames, metadata } from '../metadata/metadata'
import viteConfig from './vite.config'

const Guide = [
  { text: 'Get Started', link: '/guide/' },
]

const CoreCategories = coreCategoryNames.map(c => ({
  text: c,
  activeMatch: '___', // never active
  link: `/functions#category=${c}`,
}))

const DefaultSideBar = [
  { text: 'Guide', items: Guide },
  { text: 'Core Functions', items: CoreCategories },
]

const FunctionsSideBar = getFunctionsSideBar()

export default defineConfig({
  base: '/comuse/',
  title: 'Comuse',
  description: 'Collection of Essential Js Utilities',
  lang: 'en-US',
  ignoreDeadLinks: true,
  lastUpdated: true,

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    codeTransformers: [
      // @ts-expect-error: Type mismatch between @shikijs/types versions
      transformerTwoslash(),
    ],
  },

  themeConfig: {
    logo: '/favicon.svg',
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/ajiu9/comuse/tree/main/packages/:path',
      text: 'Suggest changes to this page',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-PRESENT Ajiu9',
    },
    nav: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'Functions',
        items: [
          {
            text: '',
            items: [
              { text: 'All Functions', link: '/functions#' },
              { text: 'Recent Updated', link: '/functions#sort=updated' },
            ],
          },
          {
            text: 'Core', items: [
              { text: 'Shared', link: '/functions#category=animation' },
            ],
          },
          {
            text: 'Shared', items: [
              { text: 'Shared', link: '/functions#category=shared' },
            ],
          },
        ],
      },
      {
        text: currentVersion,
        items: [
          {
            items: [
              { text: 'Release Notes', link: 'https://github.com/ajiu9/comuse/releases' },
            ],
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': DefaultSideBar,
      '/functions': FunctionsSideBar,
      '/shared/': FunctionsSideBar,
      '/core/': FunctionsSideBar,
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ajiu9/vistara' },
    ],
  },
  head: [
    ['meta', { name: 'author', content: 'Ajiu9' }],
    ['meta', { property: 'og:title', content: 'Comuse' }],
    ['meta', { property: 'og:description', content: 'Collection of Essential Js Utilities' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
  vite: viteConfig,
})

function getFunctionsSideBar() {
  const links = []

  for (const name of categoryNames) {
    if (name.startsWith('_'))
      continue

    const functions = metadata.functions.filter(i => i.category === name && !i.internal)

    links.push({
      text: name,
      items: functions.map(i => ({
        text: i.name,
        link: i.external || `/${i.package}/${i.name}/`,
      })),
      link: name.startsWith('@')
        ? (functions[0].external || `/${functions[0].package}/README`)
        : undefined,
    })
  }

  return links
}
