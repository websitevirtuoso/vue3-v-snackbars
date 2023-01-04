import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['vuetify'],
    },
  },
})
