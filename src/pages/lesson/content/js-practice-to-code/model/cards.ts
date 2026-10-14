/**
 * 이 수업에서 외우는 패턴 카드 여덟 장.
 *
 * 문법 한 조각(if, getElementById)은 너무 작아서 빈 화면에서 무엇부터 쓸지 알려주지 못하고,
 * 문제 정답 통째로는 너무 커서 문제가 바뀌면 다시 막힌다. 카드는 그 사이 크기다.
 * "체크된 것만 모은다"처럼 일 하나를 하는 두세 줄짜리 코드 묶음이고, 여러 문제에 다시 나온다.
 *
 * 앞면은 한글 절차에 나오는 말이고 뒷면은 그 말을 옮긴 코드다.
 * 1부에서는 문제를 풀며 뒷면을 모으고, 2부에서는 앞면을 보고 뒷면을 꺼내 쓴다.
 */

export type PatternCard = {
  no: number
  name: string
  /** 한글 절차에 이런 말이 나오면 이 카드를 꺼낸다 */
  front: string[]
  /** 외워 둘 코드 */
  back: string[]
  /** 뒷면을 쓸 때 같이 기억할 것 한 줄 */
  note: string
}

export const CARDS: PatternCard[] = [
  {
    no: 1,
    name: '값 가져오기',
    front: ['~칸에 적힌 값을 가져온다'],
    back: ["document.getElementById('아이디').value", '체크칸.checked'],
    note: '.value는 언제나 글자, .checked는 참 · 거짓입니다',
  },
  {
    no: 2,
    name: '화면에 쓰기',
    front: ['~에 보여준다', '~에 출력한다'],
    back: ['네모.innerHTML = 글자;', '입력칸.value = 글자;'],
    note: '네모(div)에는 innerHTML, 입력 칸에는 value',
  },
  {
    no: 3,
    name: '이벤트에 함수 걸기',
    front: ['~를 누르면', '칠 때마다', '칸에서 나가면'],
    back: ['<button onclick="이름()">', 'function 이름() { … }'],
    note: 'onclick · onkeyup · onblur의 따옴표 안에 함수 이름을 씁니다',
  },
  {
    no: 4,
    name: '스타일 바꾸기',
    front: ['숨긴다 · 보이게 한다', '빨간 글자로 바꾼다'],
    back: ["요소.style.display = 'none';", "요소.style.color = 'red';"],
    note: "되돌릴 때는 빈 글자 ''를 넣습니다",
  },
  {
    no: 5,
    name: '숫자로 바꾸기',
    front: ['숫자로 계산한다', '가격을 더한다'],
    back: ['Number(글자)'],
    note: "빼면 '10' + '0'이 '100'이 됩니다",
  },
  {
    no: 6,
    name: '목록 하나씩 돌기',
    front: ['모든 ~를 하나씩', '전부 보면서'],
    back: ['const list =', "  document.getElementsByName('이름');", 'for (let i = 0; i < list.length; i++) {', '  list[i] …', '}'],
    note: '배열도 같은 for로 돕니다',
  },
  {
    no: 7,
    name: '그릇에 모으기',
    front: ['모아서 · 합쳐서', '전부 ~인지 본다'],
    back: ['let 그릇 = 처음값;', '// 반복 안에서', '그릇 += 값;   또는   그릇 = false;'],
    note: '처음 값이 그릇의 뜻을 정합니다',
  },
  {
    no: 8,
    name: '걸리면 알리고 멈추기',
    front: ['~이면 알리고 멈춘다', '하나라도 비어 있으면'],
    back: ['if (조건) {', "  alert('알림');", '  칸.focus();', '  return;', '}'],
    note: 'return이 빠지면 알림창이 연달아 뜹니다',
  },
]

export function cardOf(no: number): PatternCard {
  const card = CARDS.find((item) => item.no === no)
  if (!card) throw new Error(`카드 ${no}번이 없습니다`)
  return card
}
