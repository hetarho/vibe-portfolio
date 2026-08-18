import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  /** 개발/미리보기 서버는 3030 고정 — 포트가 바뀌면 강의 중 주소를 다시 불러줘야 한다 */
  server: { port: 3030 },
  preview: { port: 3030 },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
