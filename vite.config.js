import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.CF_PAGES 
  ? '/' // Cloudflare Pages
  : process.env.GITHUB_ACTIONS 
    ? '/sshan-library-deploy/' // GitHub Pages
    : '/', //local
    
  plugins: [
    vue(),
    vueDevTools(),
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
