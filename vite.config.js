import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
const prefix = `monaco-editor/esm/vs`
export default defineConfig({
  plugins: [
    vue(),
  ],
  server:{
    proxy:{
       '/api':{
           target:"http://10.4.0.59:8080", //跨域地址
           changeOrigin:true, //支持跨域
           rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
       }
    }
 },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: [
      `${prefix}/language/json/json.worker`,
      `${prefix}/language/css/css.worker`,
      `${prefix}/language/html/html.worker`,
      `${prefix}/language/typescript/ts.worker`,
      `${prefix}/editor/editor.worker`,
    ], 
  },
})
