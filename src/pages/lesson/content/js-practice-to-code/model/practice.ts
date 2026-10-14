/**
 * 1부에서 푸는 학원 실습문제 다섯 개.
 *
 * 학원 번호(Practice1~5) 대신 쉬운 순서로 푼다. 앞 문제에서 쓴 카드가 뒤 문제에 다시 나오고,
 * 문제마다 새 카드는 한두 장만 늘어난다. 파일 이름은 학원 번호를 그대로 쓴다.
 *
 * 동작(move)의 코드 줄은 answers/의 정답 파일과 같은 줄이어야 한다. 정답 파일이 원본이고,
 * 여기에는 함수 안쪽 들여쓰기를 뺀 줄만 둔다. 화면에서 두 칸 들여 붙인다.
 * 문제 원문(quote)은 학원 PDF 그대로다. 따옴표 짝이 맞지 않는 곳도 원문이므로 고치지 않는다.
 */

export type DesignRow = {
  /** 화면에 보이는 칸 이름 */
  part: string
  /** 그 칸을 만드는 태그와 속성 */
  tag: string
  id: string
}

export type Step = {
  say: string
  cards: number[]
  /** 카드가 아닌 문법에 붙이는 이름표 (예: 자바와 같은 if) */
  tag?: string
  code: string[]
}

export type Move = {
  key: string
  /** 전체 목록(O 키)에 보이는 이름 */
  navTitle: string
  /** 언제 이 함수가 실행되는가 */
  when: string
  /** HTML 쪽에서 함수를 거는 줄 */
  wire: string
  head: string[]
  steps: Step[]
  /** 첫 단계의 번호. 한 함수를 두 화면에 나눌 때 뒤 화면은 이어지는 번호로 시작한다 */
  startAt?: number
  tail?: string[]
  /** 코드가 길면 한 단계 작은 글자로 */
  dense?: boolean
  point: string
}

export type PracticeProblem = {
  academyNo: number
  /** 상단 파트명에 쓰는 짧은 이름 */
  short: string
  title: string
  /** 학원 PDF에서의 위치 */
  source: string
  quote: string[]
  design: DesignRow[]
  designNotes: string[]
  moves: Move[]
  checks: string[]
  traps: Array<{ wrong: string; why: string }>
}

export const PRACTICE: PracticeProblem[] = [
  {
    academyNo: 4,
    short: '구매 정보',
    title: '구매 정보를 아래에 출력하기',
    source: '연습문제2 · 실습문제1',
    quote: [
      '필드에 넣은 값을 아래에 출력',
      '단, 초기 화면은 아래와 같이 만들어야 하며 구매 수량 같은 경우 최소 10, 최대 100,',
      '각 개수는 10씩 커지도록 하며 납품 등급은 최소 1, 최대 9로 2씩 커지게 함.',
    ],
    design: [
      { part: '구매자 · 상품명 · 가격', tag: '<input type="text" placeholder="…">', id: 'buyer · product · price' },
      { part: '구매 수량', tag: '<input type="number" min="10" max="100" step="10">', id: 'count' },
      { part: '납품 등급', tag: '<input type="range" min="1" max="9" step="2" value="1">', id: 'grade' },
      { part: '기타 사항', tag: '<textarea>', id: 'etc' },
      { part: '출력 버튼', tag: '<button onclick="printInfo()">', id: '' },
      { part: '결과 네모', tag: '<div>', id: 'output' },
    ],
    designNotes: [
      '바깥 테두리와 제목은 <fieldset>과 <legend>, 점 목록은 <ul>과 <li>로 만듭니다.',
      'min · max · step이 화살표와 막대가 멈추는 값을 정합니다. 납품 등급에 value="1"을 줘야 처음에 왼쪽 끝에 놓입니다.',
      'id는 다음 단계에서 값을 꺼낼 때 쓰는 이름표입니다.',
    ],
    moves: [
      {
        key: 'print',
        navTitle: '출력 버튼',
        when: '「입력 값 출력하기」 버튼을 누르면',
        wire: '<button onclick="printInfo()">',
        head: ['function printInfo() {'],
        steps: [
          {
            say: '여섯 칸의 값을 하나씩 가져온다',
            cards: [1],
            code: [
              "const buyer = document.getElementById('buyer').value;",
              "const product = document.getElementById('product').value;",
              "const price = document.getElementById('price').value;",
              "const count = document.getElementById('count').value;",
              "const grade = document.getElementById('grade').value;",
              "const etc = document.getElementById('etc').value;",
            ],
          },
          {
            say: '값마다 앞에 이름을, 뒤에 단위를 붙여 한 줄씩 잇는다',
            cards: [],
            tag: '글자 잇기 +',
            code: [
              "const text = '구매자 명 : ' + buyer + '님<br>'",
              "  + '상품 명 : ' + product + '<br>'",
              "  + '가격 : ' + price + '만원<br>'",
              "  + '구매 수량 : ' + count + '개<br>'",
              "  + '납품등급 : ' + grade + '등급<br>'",
              "  + '기타사항 : ' + etc;",
            ],
          },
          {
            say: '결과 네모에 쓴다',
            cards: [2],
            code: ["document.getElementById('output').innerHTML = text;"],
          },
        ],
        point: 'innerHTML은 글자를 HTML로 읽습니다. 그래서 줄을 바꾸려면 글자 안에 <br>을 넣습니다.',
      },
    ],
    checks: [
      '칸을 모두 채우고 누르면 여섯 줄이 화면 예시와 같다',
      '버튼을 두 번 눌러도 여섯 줄만 남는다',
      '구매 수량 화살표를 누르면 10씩 바뀌고 100에서 멈춘다',
      '납품 등급 막대가 1 · 3 · 5 · 7 · 9에서만 멈춘다',
      '처음 화면에서 납품 등급 막대가 왼쪽 끝에 있다',
    ],
    traps: [
      { wrong: "줄 끝에 '\\n'을 붙였다", why: 'innerHTML은 줄바꿈 글자를 빈칸 하나로 봅니다. <br>을 넣어야 줄이 바뀝니다.' },
      { wrong: 'innerHTML += 로 썼다', why: '누를 때마다 여섯 줄이 아래로 계속 쌓입니다. 덮어쓰려면 = 입니다.' },
      { wrong: '결과 네모에 .value로 썼다', why: 'div에는 value가 없어서 아무것도 보이지 않습니다. 네모에는 innerHTML로 씁니다.' },
    ],
  },
  {
    academyNo: 5,
    short: '검색 항목',
    title: '고른 항목의 검색 창만 보여주기',
    source: '연습문제2 · 실습문제2',
    quote: [
      '라디오 버튼을 누르면 아래 그 버튼에 맞는 검색 창이 나오도록 함',
      '날짜 검색 같은 경우 필드는 마우스로도 입력할 수 있는 필드를 사용해야 함',
      '(검색을 눌렀을 때는 아무 반응도 일어나지 않음)',
    ],
    design: [
      { part: '라디오 세 개', tag: `<input type="radio" name="search" onclick="showSearch('title')">`, id: '' },
      { part: '제목 검색 창', tag: '<div class="box"> 안에 글자 칸과 검색 버튼', id: 'title' },
      { part: '날짜 검색 창', tag: '<input type="date"> - <input type="date">', id: 'date' },
      { part: '작성자 검색 창', tag: '<div class="box"> 안에 글자 칸과 검색 버튼', id: 'writer' },
      { part: '처음에는 숨김', tag: '.box { display: none; background: lightgray; }', id: '' },
    ],
    designNotes: [
      '라디오 세 개의 name이 같아야 셋 중 하나만 고를 수 있습니다.',
      'type="date"를 쓰면 마우스로 고르는 달력이 붙습니다. 문제에서 말한 필드가 이것입니다.',
      '검색 버튼을 <form> 안에 넣으면 누를 때 페이지가 새로 열립니다. form 없이 둡니다.',
    ],
    moves: [
      {
        key: 'radio',
        navTitle: '라디오 버튼',
        when: '라디오 버튼을 누르면',
        wire: `<input type="radio" onclick="showSearch('date')">`,
        head: ['function showSearch(kind) {'],
        steps: [
          {
            say: '세 검색 창을 모두 숨긴다',
            cards: [4],
            code: [
              "document.getElementById('title').style.display = 'none';",
              "document.getElementById('date').style.display = 'none';",
              "document.getElementById('writer').style.display = 'none';",
            ],
          },
          {
            say: '고른 검색 창 하나만 보이게 한다',
            cards: [4],
            tag: '매개변수 kind',
            code: ["document.getElementById(kind).style.display = 'block';"],
          },
        ],
        point:
          "라디오마다 함수를 따로 만들면 세 함수가 한 줄만 다릅니다. 다른 부분인 'title' · 'date' · 'writer'를 매개변수 kind로 받으면 함수가 하나로 줄어듭니다.",
      },
    ],
    checks: [
      '처음 열면 회색 창이 하나도 없다',
      '제목 → 날짜 → 작성자 순서로 누르면 창이 하나씩만 보인다',
      '같은 라디오를 다시 눌러도 그대로다',
      '날짜 칸을 누르면 달력이 뜬다',
      '검색 버튼을 눌러도 아무 일이 없다',
    ],
    traps: [
      { wrong: '라디오 name을 서로 다르게 썼다', why: '셋 다 동시에 선택됩니다. 하나만 고르게 만드는 것이 같은 name입니다.' },
      { wrong: '1번(모두 숨기기)을 빼먹었다', why: '누를 때마다 창이 하나씩 늘어나서 결국 셋 다 보입니다.' },
      { wrong: 'showSearch(title)처럼 따옴표를 뺐다', why: "따옴표가 없으면 글자가 아니라 변수 이름으로 읽습니다. 'title'처럼 글자로 넘깁니다." },
    ],
  },
  {
    academyNo: 2,
    short: '계산기',
    title: '0으로 나누면 연산불가를 띄우는 계산기',
    source: '연습문제1 · 실습문제2',
    quote: [
      '사용자가 계산할 숫자 두 개를 입력하고 연산자도 선택하게 함',
      '‘=‘버튼을 누르면 오른쪽에 계산 결과가 나오며 계산 결과가 나오는 창은 읽기만 가능',
      '이 때, 나누는 수가 0일 때 계산 결과 창의 배경이 빨갛게 변하며 ‘연산 불가‘라는 하얀 글자가 들어감',
      '(위 조건은 / 연산과 % 연산 모두 같음)',
    ],
    design: [
      { part: '첫째 숫자 · 둘째 숫자', tag: '<input type="number">', id: 'num1 · num2' },
      { part: '연산자', tag: '<select> 안에 <option value="+">+</option> 다섯 개', id: 'op' },
      { part: '= 버튼', tag: '<button onclick="calc()">=</button>', id: '' },
      { part: '결과 칸', tag: '<input type="text" readonly>', id: 'result' },
    ],
    designNotes: [
      'readonly를 붙이면 글자를 칠 수 없는 칸이 됩니다. 문제의 “읽기만 가능”이 이것입니다.',
      'select의 값은 지금 고른 option의 value입니다.',
    ],
    moves: [
      {
        key: 'calc',
        navTitle: '= 버튼',
        when: '「=」 버튼을 누르면',
        wire: '<button onclick="calc()">=</button>',
        head: ['function calc() {'],
        steps: [
          {
            say: '두 숫자는 숫자로 바꿔서, 연산자와 결과 칸은 그대로 가져온다',
            cards: [1, 5],
            code: [
              "const num1 = Number(document.getElementById('num1').value);",
              "const num2 = Number(document.getElementById('num2').value);",
              "const op = document.getElementById('op').value;",
              "const result = document.getElementById('result');",
            ],
          },
          {
            say: '연산자에 따라 다섯 갈래로 계산한다',
            cards: [],
            tag: '자바와 같은 if',
            code: [
              'let answer;',
              "if (op == '+') {",
              '  answer = num1 + num2;',
              "} else if (op == '-') {",
              '  answer = num1 - num2;',
              "} else if (op == '*') {",
              '  answer = num1 * num2;',
              "} else if (op == '/') {",
              '  answer = num1 / num2;',
              '} else {',
              '  answer = num1 % num2;',
              '}',
            ],
          },
          {
            say: '숫자가 아니게 됐으면 빨간 칸에 연산불가를, 아니면 원래 칸에 결과를 쓴다',
            cards: [4, 2],
            code: [
              'if (isNaN(answer) || answer == Infinity || answer == -Infinity) {',
              "  result.style.backgroundColor = 'red';",
              "  result.style.color = 'white';",
              "  result.value = '연산불가';",
              '} else {',
              "  result.style.backgroundColor = '';",
              "  result.style.color = '';",
              '  result.value = answer;',
              '}',
            ],
          },
        ],
        dense: true,
        point: "한 번 빨개진 칸은 저절로 돌아오지 않습니다. else에서 빈 글자 ''를 넣어 원래대로 돌려놓습니다.",
      },
    ],
    checks: [
      '10 + 0이 10이다 · 100이 나오면 Number가 빠진 것',
      '10 / 3이 3.333…이다',
      '10 / 0과 10 % 0이 빨간 칸에 연산불가다',
      '연산불가 다음에 10 * 0을 하면 칸이 원래 색으로 돌아온다',
      '결과 칸에 글자를 칠 수 없다',
    ],
    traps: [
      {
        wrong: 'Number 없이 .value를 그대로 계산했다',
        why: "+만 '10' + '0' = '100'으로 이어 붙고 나머지 넷은 맞게 나옵니다. 그래서 늦게 발견됩니다.",
      },
      { wrong: 'answer == NaN으로 비교했다', why: 'NaN은 자기 자신과도 같지 않습니다. isNaN(answer)로 확인합니다.' },
      { wrong: '빨간색을 되돌리는 줄이 없다', why: '0으로 한 번 나눈 뒤에는 모든 결과가 빨간 칸에 나옵니다.' },
    ],
  },
  {
    academyNo: 1,
    short: '카테고리',
    title: '고른 카테고리 출력과 전체선택',
    source: '연습문제1 · 실습문제1',
    quote: [
      '체크 박스 선택 후 “카테고리 선택“을 누르면 하단 네모에 선택한 카테고리 출력',
      '이 때, “전체 선택“ 체크 박스 선택 시 모든 카테고리가 선택 되며, 선택 해제 시 모두 선택 해제 됨',
      '또한 카테고리 체크박스를 전부 선택하면 “전체 선택“ 체크 박스가 선택되고',
      '하나라도 선택이 되어있지 않으면 “전체 선택“ 체크 박스는 선택 해제 됨.',
    ],
    design: [
      { part: '전체선택', tag: '<input type="checkbox" id="all" onclick="checkAll()">', id: 'all' },
      { part: '카테고리 열두 개', tag: '<input type="checkbox" name="category" value="종합" onclick="checkOne()">', id: '' },
      { part: '두 줄로 나누기', tag: '아동 다음에 <br>', id: '' },
      { part: '선택 버튼', tag: '<button onclick="printCategory()">', id: '' },
      { part: '결과 네모', tag: '<div> + 빨간 테두리', id: 'output' },
    ],
    designNotes: [
      '카테고리 열두 개는 id 대신 같은 name="category"로 묶습니다. 한 번에 모아 꺼내기 위해서입니다.',
      'value에 카테고리 이름을 넣어야 출력할 때 꺼낼 수 있습니다. <label>로 감싸면 글자를 눌러도 체크됩니다.',
      '이벤트가 세 개입니다. 선택 버튼, 전체선택, 카테고리 하나.',
    ],
    moves: [
      {
        key: 'print',
        navTitle: '선택 버튼',
        when: '「카테고리 선택」 버튼을 누르면',
        wire: '<button onclick="printCategory()">',
        head: ['function printCategory() {'],
        steps: [
          { say: '카테고리 칸을 전부 모은다', cards: [6], code: ["const boxes = document.getElementsByName('category');"] },
          { say: '결과 그릇을 빈 글자로 시작한다', cards: [7], code: ["let result = '';"] },
          {
            say: '하나씩 보면서 체크된 칸이면 이름을 뒤에 붙인다',
            cards: [6, 7],
            code: [
              'for (let i = 0; i < boxes.length; i++) {',
              '  if (boxes[i].checked) {',
              "    result += boxes[i].value + ' ';",
              '  }',
              '}',
            ],
          },
          { say: '결과 네모에 쓴다', cards: [2], code: ["document.getElementById('output').innerHTML = result;"] },
        ],
        point: "그릇 result의 뜻은 ‘지금까지 본 칸 중 체크된 이름들’입니다. 아직 아무 칸도 안 봤을 때는 빈 글자가 맞습니다.",
      },
      {
        key: 'all',
        navTitle: '전체선택',
        when: '「전체선택」을 누르면',
        wire: '<input type="checkbox" id="all" onclick="checkAll()">',
        head: ['function checkAll() {'],
        steps: [
          { say: '전체선택 칸이 체크됐는지 가져온다', cards: [1], code: ["const all = document.getElementById('all').checked;"] },
          {
            say: '카테고리 칸을 하나씩 전부 그 값과 같게 만든다',
            cards: [6],
            code: [
              "const boxes = document.getElementsByName('category');",
              'for (let i = 0; i < boxes.length; i++) {',
              '  boxes[i].checked = all;',
              '}',
            ],
          },
        ],
        point:
          '문제의 두 문장, ‘선택 시 모두 선택’과 ‘해제 시 모두 해제’가 코드 한 줄이 됩니다. 참이면 참을, 거짓이면 거짓을 그대로 넣으면 되니 if가 필요 없습니다.',
      },
      {
        key: 'one',
        navTitle: '카테고리 하나',
        when: '카테고리 칸을 하나 누를 때마다',
        wire: '<input type="checkbox" name="category" onclick="checkOne()">',
        head: ['function checkOne() {'],
        steps: [
          { say: '카테고리 칸을 전부 모은다', cards: [6], code: ["const boxes = document.getElementsByName('category');"] },
          { say: '‘전부 체크됨’ 그릇을 참으로 두고 시작한다', cards: [7], code: ['let allChecked = true;'] },
          {
            say: '하나씩 보면서 체크 안 된 칸을 만나면 거짓으로 바꾼다',
            cards: [6, 7],
            code: [
              'for (let i = 0; i < boxes.length; i++) {',
              '  if (!boxes[i].checked) {',
              '    allChecked = false;',
              '  }',
              '}',
            ],
          },
          { say: '전체선택 칸을 그릇과 같게 만든다', cards: [], tag: '.checked = 참·거짓', code: ["document.getElementById('all').checked = allChecked;"] },
        ],
        point:
          '그릇을 거짓으로 시작하면 열두 개를 다 체크해도 참이 될 길이 없습니다. ‘아직 체크 안 된 칸을 못 봤다’에서 시작하므로 처음 값은 참입니다.',
      },
    ],
    checks: [
      '전체선택을 누르면 열두 개가 모두 체크되고, 다시 누르면 모두 풀린다',
      '전체선택 상태에서 하나를 풀면 전체선택도 풀린다',
      '하나씩 열두 개를 다 누르면 전체선택이 저절로 체크된다',
      '아무것도 고르지 않고 버튼을 누르면 네모가 빈다',
      '두 개만 고르면 그 두 개만 순서대로 나온다',
    ],
    traps: [
      { wrong: 'value 없이 체크박스를 만들었다', why: "출력에 이름 대신 on이 줄줄이 나옵니다. 체크박스의 기본 value가 'on'입니다." },
      { wrong: 'boxes.checked처럼 목록에 바로 붙였다', why: '목록에는 checked가 없습니다. boxes[i]로 칸 하나를 꺼낸 다음에 붙입니다.' },
      { wrong: '그릇을 false로 시작했다', why: '다 체크해도 전체선택이 켜지지 않습니다.' },
    ],
  },
  {
    academyNo: 3,
    short: '회원가입',
    title: '칠 때마다 확인하는 회원가입',
    source: '연습문제1 · 실습문제3',
    quote: [
      '사용자에게 아이디와 비밀번호, 비밀번호 확인, 이름을 모두 입력 받음',
      '아이디를 입력 받을 때 중복 체크를 하는데 글자를 입력 받을 때마다 중복 체크가 되게 함',
      '’user01’이라는 아이디만 저장되어 있다는 설정으로 두고',
      '’user01’이 아니라면 아이디 필드 옆에 ‘사용 가능한 아이디입니다.’가 초록 글자로 뜨며',
      '’user01’이면 ‘이미 존재하는 아이디입니다.’가 빨간 글자로 뜸',
      '비밀번호를 입력 받고 비밀번호 확인을 입력 한 후 포커스가 비밀번호 확인 필드 밖으로 나갔을 때',
      '비밀번호와 비밀번호 확인의 값을 비교함',
      '비교 결과 같으면 초록 글자로 “비밀번호가 일치합니다.”,',
      '같지 않으면 빨간 글자로 “비밀번호가 일치하지 않습니다“가 비밀번호 확인 필드 옆에 뜸',
      '회원가입 버튼을 눌렀을 때 한 칸이라도 비어있으면 ‘XXX를 입력해주세요’라는',
      '알림창이 뜨고 해당 필드로 커서가 생김.',
      '모든 칸이 채워져 있을 때 아이디가 중복되어 있다면 ‘사용할 수 없는 아이디입니다’ 알림창이 뜨고',
      '아이디에 적혀있던 값은 지워지고 아이디 필드로 커서가 옮겨짐.',
      '비밀번호가 일치하지 않았을 때도 ‘비밀번호가 일치하지 않습니다‘ 알림창이 뜨고',
      '비밀번호 확인에 적혀있던 값은 지워지고 비밀번호 확인 필드로 커서가 옮겨짐.',
      '모든 경우가 완벽할 때 회원가입 버튼을 누르면',
      '’XXX(이름)님, 회원가입이 성공적으로 완료되었습니다^^’ 알림창이 뜨고 모든 값들이 지워짐.',
    ],
    design: [
      { part: '아이디', tag: '<input type="text" onkeyup="checkId()"> 옆에 <span>', id: 'userId · idMsg' },
      { part: '비밀번호', tag: '<input type="password">', id: 'pwd' },
      { part: '비밀번호 확인', tag: '<input type="password" onblur="checkPwd()"> 옆에 <span>', id: 'pwd2 · pwdMsg' },
      { part: '이름', tag: '<input type="text">', id: 'userName' },
      { part: '회원가입 버튼', tag: '<button onclick="join()">', id: '' },
    ],
    designNotes: [
      '안내 글자가 뜰 빈 <span>을 칸 옆에 미리 둡니다.',
      'type="password"는 친 글자를 점으로 가립니다.',
      '이벤트가 세 개입니다. 칠 때마다(onkeyup), 칸에서 나갈 때(onblur), 버튼(onclick).',
    ],
    moves: [
      {
        key: 'id',
        navTitle: '아이디 칠 때마다',
        when: '아이디 칸에 한 글자 칠 때마다',
        wire: '<input id="userId" onkeyup="checkId()">',
        head: ['function checkId() {'],
        steps: [
          {
            say: '아이디 값과 안내 칸을 가져온다',
            cards: [1],
            code: ["const id = document.getElementById('userId').value;", "const msg = document.getElementById('idMsg');"],
          },
          {
            say: '비었을 때 · user01일 때 · 그 밖일 때, 세 갈래로 안내한다',
            cards: [2, 4],
            code: [
              "if (id == '') {",
              "  msg.innerHTML = '';",
              "} else if (id == 'user01') {",
              "  msg.innerHTML = '이미 존재하는 아이디입니다.';",
              "  msg.style.color = 'red';",
              '} else {',
              "  msg.innerHTML = '사용 가능한 아이디입니다.';",
              "  msg.style.color = 'green';",
              '}',
            ],
          },
        ],
        point: '문제에는 두 갈래만 나옵니다. 그런데 아이디를 다 지우면 빈 칸에 ‘사용 가능’이 뜹니다. 그래서 세 번째 갈래를 맨 앞에 더했습니다.',
      },
      {
        key: 'pwd',
        navTitle: '비밀번호 확인 칸에서 나갈 때',
        when: '비밀번호 확인 칸에서 커서가 나가면',
        wire: '<input id="pwd2" onblur="checkPwd()">',
        head: ['function checkPwd() {'],
        steps: [
          {
            say: '두 비밀번호와 안내 칸을 가져온다',
            cards: [1],
            code: [
              "const pwd = document.getElementById('pwd').value;",
              "const pwd2 = document.getElementById('pwd2').value;",
              "const msg = document.getElementById('pwdMsg');",
            ],
          },
          {
            say: '같으면 초록 글자로, 다르면 빨간 글자로 안내한다',
            cards: [2, 4],
            code: [
              'if (pwd == pwd2) {',
              "  msg.innerHTML = '비밀번호가 일치합니다.';",
              "  msg.style.color = 'green';",
              '} else {',
              "  msg.innerHTML = '비밀번호가 일치하지 않습니다.';",
              "  msg.style.color = 'red';",
              '}',
            ],
          },
        ],
        point: '아이디 칸과 구조가 같습니다. 바뀐 것은 이벤트 이름과 비교하는 두 값뿐입니다.',
      },
      {
        key: 'join-empty',
        navTitle: '가입 버튼 ① 빈 칸',
        when: '「회원가입」 버튼을 누르면 · 앞부분',
        wire: '<button onclick="join()">',
        head: ['function join() {'],
        steps: [
          {
            say: '네 칸을 값이 아니라 칸째로 가져온다',
            cards: [1],
            code: [
              "const id = document.getElementById('userId');",
              "const pwd = document.getElementById('pwd');",
              "const pwd2 = document.getElementById('pwd2');",
              "const name = document.getElementById('userName');",
            ],
          },
          {
            say: '빈 칸이 있으면 알리고, 그 칸에 커서를 두고 멈춘다',
            cards: [8],
            code: [
              "if (id.value == '') {",
              "  alert('아이디를 입력해주세요');",
              '  id.focus();',
              '  return;',
              '}',
              "if (pwd.value == '') {",
              "  alert('비밀번호를 입력해주세요');",
              '  pwd.focus();',
              '  return;',
              '}',
              "if (pwd2.value == '') {",
              "  alert('비밀번호 확인을 입력해주세요');",
              '  pwd2.focus();',
              '  return;',
              '}',
              "if (name.value == '') {",
              "  alert('이름을 입력해주세요');",
              '  name.focus();',
              '  return;',
              '}',
            ],
          },
        ],
        tail: ['  // 3 · 4 · 5는 다음 화면', '}'],
        dense: true,
        point: '같은 다섯 줄이 네 번 되풀이됩니다. 이렇게 같은 형태가 되풀이되면 그게 카드 한 장입니다.',
      },
      {
        key: 'join-rest',
        navTitle: '가입 버튼 ② 중복 · 불일치 · 통과',
        when: '「회원가입」 버튼을 누르면 · 뒷부분',
        wire: '<button onclick="join()">',
        head: ['function join() {', '  // 1 · 2는 앞 화면'],
        startAt: 3,
        steps: [
          {
            say: '아이디가 user01이면 알리고, 아이디 칸을 지우고 커서를 두고 멈춘다',
            cards: [8],
            code: [
              "if (id.value == 'user01') {",
              "  alert('사용할 수 없는 아이디입니다');",
              "  id.value = '';",
              '  id.focus();',
              '  return;',
              '}',
            ],
          },
          {
            say: '비밀번호가 다르면 알리고, 확인 칸을 지우고 커서를 두고 멈춘다',
            cards: [8],
            code: [
              'if (pwd.value != pwd2.value) {',
              "  alert('비밀번호가 일치하지 않습니다');",
              "  pwd2.value = '';",
              '  pwd2.focus();',
              '  return;',
              '}',
            ],
          },
          {
            say: '여기까지 왔으면 전부 통과다. 환영 알림을 띄우고 모든 칸을 비운다',
            cards: [2],
            code: [
              "alert(name.value + '님, 회원가입이 성공적으로 완료되었습니다^^');",
              "id.value = '';",
              "pwd.value = '';",
              "pwd2.value = '';",
              "name.value = '';",
              "document.getElementById('idMsg').innerHTML = '';",
              "document.getElementById('pwdMsg').innerHTML = '';",
            ],
          },
        ],
        dense: true,
        point: '검사 순서가 곧 규칙입니다. 빈 칸을 먼저 보지 않으면 비어 있는 비밀번호 두 칸이 ‘일치한다’로 통과합니다.',
      },
    ],
    checks: [
      'user0까지는 초록, 1을 치는 순간 빨강으로 바뀐다',
      '아이디를 다 지우면 안내가 사라진다',
      '비밀번호 확인 칸에서 Tab을 누르면 일치 여부가 뜬다',
      '아무것도 안 쓰고 가입하면 아이디부터 알린다',
      'user01로 가입하면 아이디 칸만 비고 커서가 간다',
      '모두 맞게 쓰면 이름이 들어간 알림 뒤 모든 칸이 빈다',
    ],
    traps: [
      { wrong: 'return을 빼먹었다', why: '빈 칸 알림 뒤에도 아래 검사가 이어져서 알림창이 연달아 뜹니다.' },
      { wrong: '.value까지 붙여서 가져왔다', why: '글자만 가져오면 focus()로 커서를 옮기거나 칸을 비울 수 없습니다. 칸째로 가져옵니다.' },
      {
        wrong: 'onkeyup 대신 onkeydown을 썼다',
        why: '키를 누르는 순간에는 아직 글자가 칸에 들어가기 전입니다. 마지막 글자가 빠진 값으로 검사하게 됩니다.',
      },
    ],
  },
]

/**
 * 문제 하나에 쓴 카드. 동작 단계에 붙인 카드를 모으고, 이벤트에 함수를 거는 카드 3은 늘 들어간다.
 * 손으로 적어 두면 단계에 카드를 하나 더 붙였을 때 이 목록만 어긋난다.
 */
export function cardsUsed(problem: PracticeProblem): number[] {
  const all = new Set([3, ...problem.moves.flatMap((move) => move.steps.flatMap((step) => step.cards))])
  return [...all].sort((a, b) => a - b)
}

/** 앞 문제들에서 아직 나오지 않은 카드. 쉬운 순서로 풀 때 문제마다 새로 생기는 카드다 */
export function cardsNew(index: number): number[] {
  const seen = new Set(PRACTICE.slice(0, index).flatMap(cardsUsed))
  return cardsUsed(PRACTICE[index]).filter((card) => !seen.has(card))
}

/** 0으로 나눈 결과. 학원 힌트대로 계산부터 해 보고 조건을 정하는 쪽에서 쓴다 */
export const ZERO_RESULTS = [
  { expr: '10 / 0', value: 'Infinity' },
  { expr: '-10 / 0', value: '-Infinity' },
  { expr: '0 / 0', value: 'NaN' },
  { expr: '10 % 0', value: 'NaN' },
]

/** 문제마다 거치는 네 단계 */
export const ROUTINE = [
  { no: '1', head: '완성본 눌러 보기', detail: '무엇을 누르면 무엇이 바뀌는지 말로 정리합니다' },
  { no: '2', head: '화면 설계표', detail: '칸마다 태그와 id를 정하고 HTML을 씁니다' },
  { no: '3', head: '동작 만들기', detail: '이벤트마다 한글 순서를 보고 먼저 쳐 본 다음, 단계마다 코드를 엽니다' },
  { no: '4', head: '작은 경우로 확인', detail: '경계 값을 넣어 보고 자주 하는 실수를 점검합니다' },
]

/** 파일 하나의 뼈대. 문제마다 제목과 가운데만 바뀐다 */
export const FILE_SKELETON = [
  '<!DOCTYPE html>',
  '<html lang="ko">',
  '<head>',
  '  <meta charset="UTF-8">',
  '  <title>Practice4</title>',
  '</head>',
  '<body>',
  '  <h2>Practice4</h2>',
  '  <!-- 화면 설계표대로 칸을 놓는다 -->',
  '',
  '  <script>',
  '    // 이벤트마다 함수 하나',
  '  </script>',
  '</body>',
  '</html>',
]

/** index.html에 더하는 링크 */
export const INDEX_LINKS = [
  '<li>연습문제1',
  '  <ul>',
  '    <li><a href="practice1.html">책 카테고리 선택</a></li>',
  '    <li><a href="practice2.html">간단 계산</a></li>',
  '    <li><a href="practice3.html">회원가입</a></li>',
  '  </ul>',
  '</li>',
  '<li>연습문제2',
  '  <ul>',
  '    <li><a href="practice4.html">구매 정보</a></li>',
  '    <li><a href="practice5.html">검색 항목</a></li>',
  '  </ul>',
  '</li>',
]
