import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default ({ mode }) => {
  // Загружаем env-файл
  const env = loadEnv(mode, process.cwd(), '')
  
  return defineConfig({
    plugins: [vue()],
    server: {
      port: Number(env.VITE_PORT) || 3002, // берём из env, fallback 3002
      strictPort: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
}