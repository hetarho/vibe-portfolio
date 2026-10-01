import template from './retry-prompt.md?raw'
import { PROBLEMS } from './problems'
import type { TableKey } from './units'
import { TABLES } from './units'

function tableLine(key: TableKey) {
  return `- ${key}(${TABLES[key].join(', ')})`
}

/**
 * 정리 화면에서 복사하는 프롬프트.
 * 다시 볼 문제의 원문과 모범 답안을 함께 넣어서, AI가 문제집과 같은 기준으로 채점하게 한다.
 */
export function buildRetryPrompt(nos: number[]) {
  const problems = PROBLEMS.filter((problem) => nos.includes(problem.no))

  const body = problems
    .map((problem) => {
      const lang = problem.topic === 'JDBC' ? 'java' : 'sql'
      const code = problem.answerCode ? `\`\`\`${lang}\n${problem.answerCode.join('\n')}\n\`\`\`` : null
      const answer = [...problem.answer, code, ...(problem.explain ?? [])].filter(Boolean).join('\n')
      return `### ${problem.no}. [${problem.topic}·${problem.level}·${problem.points}점 | ${problem.askType}]\n${problem.question}\n\n모범 답안:\n${answer}`
    })
    .join('\n\n')

  const tables = (Object.keys(TABLES) as TableKey[]).map(tableLine).join('\n')

  // 함수로 넘겨야 답안 안의 $ 기호가 치환 패턴으로 읽히지 않는다
  return template.replace('{{TABLES}}', () => tables).replace('{{PROBLEMS}}', () => body)
}
