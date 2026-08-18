import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  /**
   * 개발/미리보기 서버는 3030 고정 — 포트가 바뀌면 강의 중 주소를 다시 불러줘야 한다.
   * strictPort: 포트가 잡혀 있으면 조용히 3031로 넘어가지 말고 그냥 실패해라.
   * (먼저 띄워둔 서버를 못 보고 다른 주소로 강의를 시작하는 사고를 막는다)
   */
  server: { port: 3030, strictPort: true },
  preview: { port: 3030, strictPort: true },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
