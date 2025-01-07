import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { markdownTransform } from './plugins/markdownTransform'

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

    // plugins
    Components({
      dirs: resolve(__dirname, 'theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: resolve(__dirname, 'components.d.ts'),
      transformer: 'vue3',
    }),
    UnoCSS(),
    Inspect(),
  ],
  resolve: {
    alias: {
      'comuse-core': resolve(__dirname, '../core/index.ts'),
      'comuse-metadata': resolve(__dirname, '../metadata/index.ts'),
      'comuse-shared': resolve(__dirname, '../shared/index.ts'),
    },
  },
})
