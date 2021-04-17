import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import replace from '@rollup/plugin-replace'

import monaco from 'rollup-plugin-monaco-editor'

const prefix = 'monaco-editor/esm/vs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monaco({
      languages: ['javascript', 'css', 'html', 'typescript', 'json'],
    }),

    VitePWA({
      mode: 'development',
      base: '/',
    }),
    replace({
      __DATE__: new Date().toISOString(),
      preventAssignment: true,
    }),
  ],
  base: process.env.BASE_URL || '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: [`${prefix}/language/json/json.worker`],
          cssWorker: [`${prefix}/language/css/css.worker`],
          htmlWorker: [`${prefix}/language/html/html.worker`],
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`],
        },
      },
    },
  },
})
