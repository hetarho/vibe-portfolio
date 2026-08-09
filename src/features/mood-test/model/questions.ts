export type QuizValue = 'explorer' | 'dreamer'

export const quizQuestions = [
  {
    eyebrow: 'WEEKEND',
    question: '아무 약속 없는 토요일,\n가장 먼저 하고 싶은 건?',
    options: [
      { label: '새로 생긴 동네를 목적 없이 걷기', value: 'explorer', emoji: '🚶' },
      { label: '이불 속에서 미뤄둔 시리즈 정주행', value: 'dreamer', emoji: '🛋️' },
    ],
  },
  {
    eyebrow: 'CHOICE',
    question: '여행지에서 더 마음이\n끌리는 순간은?',
    options: [
      { label: '지도에 없는 골목을 발견했을 때', value: 'explorer', emoji: '🗺️' },
      { label: '노을이 예쁜 카페 창가에 앉았을 때', value: 'dreamer', emoji: '🌅' },
    ],
  },
  {
    eyebrow: 'ENERGY',
    question: '마음이 복잡할 때\n나를 회복시키는 방식은?',
    options: [
      { label: '일단 밖으로 나가 몸을 움직인다', value: 'explorer', emoji: '🏃' },
      { label: '조용한 곳에서 생각을 정리한다', value: 'dreamer', emoji: '🎧' },
    ],
  },
  {
    eyebrow: 'TASTE',
    question: '친구들이 말하는\n나의 가장 가까운 모습은?',
    options: [
      { label: '호기심 많고 뭐든 먼저 해보는 사람', value: 'explorer', emoji: '⚡' },
      { label: '섬세하고 자기만의 세계가 있는 사람', value: 'dreamer', emoji: '✨' },
    ],
  },
] as const
