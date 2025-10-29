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
  // 添加这行：为浏览器环境提供明确的标识
  define: {
    'process.env.BROWSER': JSON.stringify(true),
    'import.meta.env.BROWSER': JSON.stringify(true),
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
    // 添加一个简单的插件来修复环境检测问题
    {
      name: 'fix-browser-detection',
      enforce: 'post',
      transform(code, id) {
        // 修复isClient检测逻辑
        if (id.includes('shared/env/index.ts')) {
          return code.replace(
            'export const isClient = typeof window !== \'undefined\' && typeof document !== \'undefined\'',
            'export const isClient = (typeof window !== \'undefined\' && typeof document !== \'undefined\') || (typeof process !== \'undefined\' && process.env?.BROWSER === true) || (typeof import !== \'undefined\' && import.meta?.env?.BROWSER === true)',
          )
        }
        return code
      },
    },
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
      'comuse-shared',
      'comuse-core',
    ],
    include: [
      'qrcode',
      'vconsole',
    ],
  },
  build: {
    target: 'es2020',
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
    noExternal: [
      '@vue/repl',
    ],
  },
})
