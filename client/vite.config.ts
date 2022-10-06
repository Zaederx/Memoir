import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import  path  from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

/*
 * for info on building openssl see to generate certificates
 * https://github.com/openssl/openssl/blob/master/INSTALL.md#building-openssl
 */
const key = fs.readFileSync(path.join('..', 'memoir.pem'))
const cert = fs.readFileSync(path.join('..', 'memoir.crt'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:
  {
    https:
    {
      key:key,
      cert:cert
    },
    proxy:
    {
      '/api':
      {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path:any) => path.replace(/^\/api/, ''),
        secure:false,//https?
        ws:true
      }
    }
  },
  experimentalDisableTemplateSupport: true
})
