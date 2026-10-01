import template from './retry-prompt.md?raw'
import type { ExamBlock, PracticeProblem } from './problems'
import { examHeading, isAcademyProblem, isMonoBlock, PROBLEMS } from './problems'
import { ACADEMY_PROBLEMS } from './academy-problems'
import type { TableKey } from './units'
import { TABLES } from './units'

function tableLine(key: TableKey) {
  return `- ${key}(${TABLES[key].join(', ')})`
}

/** JDBC 단원의 코드는 자바, 나머지는 SQL로 표시해야 AI가 문법을 헷갈리지 않는다 */
function codeLang(problem: PracticeProblem) {
  return (isAcademyProblem(problem) ? problem.section : problem.topic) === 'JDBC' ? 'java' : 'sql'
}

/** 시험지의 [보기]·[코드] 덩어리를 문제집과 같은 모양으로 옮긴다 */
function blockText(problem: PracticeProblem, block: ExamBlock) {
  if (!isMonoBlock(block)) return `[${block.label}]\n${block.lines.join('\n')}`
  const lang = block.label === '코드' ? codeLang(problem) : 'text'
  return `[${block.label}]\n\`\`\`${lang}\n${block.lines.join('\n')}\n\`\`\``
}

/**
 * 정리 화면에서 복사하는 프롬프트.
 * 다시 볼 문제의 원문과 모범 답안을 함께 넣어서, AI가 문제집과 같은 기준과 같은 형식으로 문제를 내고 채점하게 한다.
 */
export function buildRetryPrompt(nos: number[]) {
  const problems = [...PROBLEMS, ...ACADEMY_PROBLEMS].filter((problem) => nos.includes(problem.no))

  const body = problems
    .map((problem) => {
      const question = [
        `${problem.question}${isAcademyProblem(problem) ? '' : ` (${problem.points}점)`}`,
        ...(problem.blocks ?? []).map((block) => blockText(problem, block)),
      ].join('\n\n')
      const code = problem.answerCode ? `\`\`\`${codeLang(problem)}\n${problem.answerCode.join('\n')}\n\`\`\`` : null
      const answer = [...problem.answer, code, ...(problem.explain ?? [])].filter(Boolean).join('\n')
      const heading = isAcademyProblem(problem) ? examHeading(problem) : `${problem.no}. ${examHeading(problem)}`
      return `### ${heading}\n${question}\n\n모범 답안:\n${answer}`
    })
    .join('\n\n')

  const tables = (Object.keys(TABLES) as TableKey[]).map(tableLine).join('\n')

  // 함수로 넘겨야 답안 안의 $ 기호가 치환 패턴으로 읽히지 않는다
  return template.replace('{{TABLES}}', () => tables).replace('{{PROBLEMS}}', () => body)
}
