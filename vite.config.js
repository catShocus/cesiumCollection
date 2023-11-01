import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import cesium from 'vite-plugin-cesium'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),cesium(),
  AutoImport({
    resolvers: [ElementPlusResolver()]
  }),
  Components({
    resolvers: [ElementPlusResolver()]
  })
  ],
})
