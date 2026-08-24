/**
 * 덱에서 실제로 눌러 들어가는 바깥 링크.
 * 강의장에서 그대로 열어 같이 읽으므로, 링크가 죽으면 수업이 멈춘다 —
 * 수업 전 준비 체크리스트(마지막 화면)에 "링크 열리는지 확인"이 들어 있다.
 */

/** R3. 미국 신입 PM · APM 공고 */
export const APM_LINKS = [
  {
    name: 'APM List',
    href: 'https://apmlist.org/',
    note: '지금 열려 있는 APM·신입 PM 공고를 한 곳에 모아 줘요. 매시간 갱신돼요',
    primary: true,
  },
  {
    name: 'Google APM',
    href: 'https://www.google.com/about/careers/applications/programs/apm/',
    note: '2년 로테이션 · 전공 제한 없음. 보통 여름~초가을에 열려요',
    primary: false,
  },
  {
    name: 'Meta RPM',
    href: 'https://www.metacareers.com/rotational-programs/',
    note: '18개월 로테이션 · PM 경력 1년 미만 대상. 1년에 한 번 열려요',
    primary: false,
  },
]

/** R16. 오늘 같이 읽을 파일 — 짧은 것부터 */
export const PRACTICE_FILES = [
  {
    repo: 'Cal.com',
    file: 'packages/lib/weekstart.ts',
    lines: '23줄',
    decides: '주 시작일을 일요일로 할까, 월요일로 할까',
    practice: '반복문으로 목록에서 찾기 · 못 찾으면 기본값(일요일)로 떨어지는 자리',
    href: 'https://github.com/calcom/cal.diy/blob/main/packages/lib/weekstart.ts',
  },
  {
    repo: 'Cal.com',
    file: 'packages/lib/timeFormat.ts',
    lines: '59줄',
    decides: '시간을 12시간제로 보여줄까, 24시간제로 보여줄까',
    practice: '조건의 우선순위 · 사용자가 고른 값 → 브라우저 설정 → 기본값 순서',
    href: 'https://github.com/calcom/cal.diy/blob/main/packages/lib/timeFormat.ts',
  },
  {
    repo: 'Cal.com',
    file: 'packages/lib/currencyConversions.ts',
    lines: '71줄',
    decides: '10,000원을 10000으로 저장할까, 1000000으로 저장할까',
    practice: '목록에 있는 통화만 예외 · 나머지는 100을 곱하는 기본 규칙',
    href: 'https://github.com/calcom/cal.diy/blob/main/packages/lib/currencyConversions.ts',
  },
]

/** R16. diff 실습용 — 여기서 작은 것 하나를 골라 같이 읽는다 */
export const DIFF_LINKS = [
  {
    name: 'Cal.com · 머지된 PR 목록',
    href: 'https://github.com/calcom/cal.diy/pulls?q=is%3Apr+is%3Amerged',
    note: '매일 여러 개가 머지돼요. Files changed가 30줄 이하인 것을 골라요',
  },
  {
    name: 'pretty-bytes · 커밋 목록',
    href: 'https://github.com/sindresorhus/pretty-bytes/commits/main',
    note: '커밋 하나가 곧 diff 하나예요. 숫자나 조건이 바뀐 것을 찾아요',
  },
]
