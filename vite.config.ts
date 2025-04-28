import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  // NOTE: github 会额外增加path前缀，需要构建额外一个 baseurl
  // TODO: 注入后不能支持 dist 预览了
  const base = env.VITE_BASE_URL || '/'
  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      port: 5178,
      host: true,
    },
  }
})
