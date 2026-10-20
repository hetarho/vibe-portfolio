import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cpSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

/**
 * 수업 실습 파일(html-practice/)을 빌드 결과에 그대로 복사한다.
 * 노트북 한 대로 수업할 때 개발 서버 없이 배포된 사이트에서 바로 열기 위해서다.
 * 목록 화면의 「정답」 링크가 가리키는 강의 정답 HTML도 같은 경로로 함께 옮긴다.
 */
function copyHtmlPractice(): Plugin {
  const answers = 'src/pages/lesson/content/js-practice-to-code/answers'
  return {
    name: 'copy-html-practice',
    apply: 'build',
    closeBundle() {
      cpSync('html-practice', 'dist/html-practice', { recursive: true })
      cpSync(answers, `dist/${answers}`, { recursive: true })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyHtmlPractice()],
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
