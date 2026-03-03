import { resolve } from 'node:path'
import process from 'node:process'
import UnoCSS from 'unocss/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { getChangeLog } from '../../scripts/changelog'
import { ChangeLog } from './plugins/changelog'
import { markdownTransform } from './plugins/markdownTransform'

const [changeLog] = await Promise.all([
  getChangeLog(process.env.CI ? 1000 : 100),
])
export default defineConfig({
  server: {
    fs: {
      allow: [
        resolve(__dirname, '..'),
      ],
    },
  },
  plugins: [
    // custom
    markdownTransform(),
    ChangeLog(changeLog),

    // plugins
    Components({
      dirs: resolve(__dirname, 'theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: resolve(__dirname, 'components.d.ts'),
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
      transformer: 'vue3',
    }),
    Icons({
      compiler: 'vue3',
      defaultStyle: 'display: inline-block',
    }),
    UnoCSS(),
    Inspect(),
  ],
  resolve: {
    alias: {
      'comuse-core': resolve(__dirname, '../core/index.ts'),
      'comuse-metadata': resolve(__dirname, '../metadata/index.ts'),
      'comuse-shared': resolve(__dirname, '../shared/index.ts'),
      'comuse-integrations': resolve(__dirname, '../integrations/index.ts'),
    },
  },
  optimizeDeps: {
    exclude: [
      // 'comuse-shared',
      // 'comuse-core',
    ],
    include: [
      'qrcode',
      'vconsole',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('comuse-'))
            return 'comuse'
          if (id.includes('@vue/') || id.includes('/vue/'))
            return 'vue'
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  ssr: {
    // 将 comuse 的包包含在 SSR bundle 中，避免 external 化导致的 SSR 问题
    noExternal: [
      '@vue/repl',
      'comuse-core',
      'comuse-metadata',
      'comuse-shared',
      'comuse-integrations',
    ],
    // 确保以 web 为目标，避免 Node.js 特定 API
    target: 'web',
  },
})
