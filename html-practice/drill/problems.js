'use strict';
// 4시간 코스 문제 목록
// 화면 맨 위의 문제 설명, Step 1에 띄우는 정답 코드, 「채점하기」가 넣어 볼 값이 모두 여기 있습니다.
// 정답 코드를 고치면 같은 폴더 step2~4.html의 빈칸과 주석도 같이 맞춰 줍니다.
//
// reset : 채점 전에 실습 화면 안에서 실행할 코드 (함수 밖 그릇을 처음 값으로 되돌린다)
//
// cases 한 줄 = 작은 경우 하나
//   inputs      : 칸 id → 넣을 값
//   call        : 부를 함수 (없으면 fn)
//   expect      : 결과 칸(target, 없으면 result)에 나와야 할 글자. 띄어쓰기는 보지 않습니다
//   expectAlert : 떠야 할 알림창 글자
//   expectLi    : { id, n } 그 목록 안의 li 개수
//   attr        : { id, name, has } 태그 속성에 들어 있어야 할 글자
//
// kind: 'html' 문제는 함수 없이 화면만 만듭니다. cases 대신 checks로 학생이 쓴 HTML의 생김새를 봅니다
//   selector : 찾을 태그 (CSS 선택자)
//   count    : 정확히 몇 개여야 하는지 · min : 적어도 몇 개
//   index    : 여러 개 중 몇 번째를 볼지 (0부터)
//   text     : 그 태그 안의 글자. 띄어쓰기는 보지 않습니다
//   attrs    : 있어야 할 속성과 값

window.DRILL_ORDER = ['htmlMenu', 'htmlLogin', 'greeting', 'candy', 'login', 'stock', 'candyRow', 'scan', 'cart'];

window.DRILL_PROBLEMS = {
  htmlMenu: {
    no: 'H1',
    folder: 'h1-menu',
    page: 'practice.html',
    period: '0교시',
    kind: 'html',
    title: '분식집 메뉴판 (HTML)',
    desc: [
      '오른쪽 위 「완성된 모습」과 똑같은 화면을 HTML로 만듭니다. 정답 코드는 없습니다. 보고 어떤 태그인지 맞혀 봅니다.',
      '큰 제목은 h2, 문단은 p, 점이 찍힌 목록은 ul 안에 li, 굵은 글자는 strong입니다.'
    ],
    checks: [
      { label: '큰 제목 h2 「분식집 메뉴」', selector: 'h2', text: '분식집 메뉴' },
      { label: '문단 p 두 개', selector: 'p', count: 2 },
      { label: '목록 ul 안에 li 세 개', selector: 'ul > li', count: 3 },
      { label: '첫째 li 「떡볶이 4,000원」', selector: 'ul > li', index: 0, text: '떡볶이 4,000원' },
      { label: '둘째 li 「김밥 3,500원」', selector: 'ul > li', index: 1, text: '김밥 3,500원' },
      { label: '셋째 li 「라면 5,000원」', selector: 'ul > li', index: 2, text: '라면 5,000원' },
      { label: '굵은 글자 strong 「오늘의 추천」', selector: 'strong', text: '오늘의 추천' }
    ]
  },

  htmlLogin: {
    no: 'H2',
    folder: 'h2-login',
    page: 'practice.html',
    period: '0교시',
    kind: 'html',
    title: '로그인 화면 (HTML)',
    desc: [
      '오른쪽 위 「완성된 모습」과 똑같은 로그인 화면을 HTML로 만듭니다. 2교시 「03 로그인」 문제의 화면입니다.',
      '자바스크립트가 칸을 찾을 수 있게 id를 붙입니다. 아이디 칸은 userId, 비밀번호 칸은 pwd, 결과 네모(div)는 result',
      '비밀번호 칸은 글자가 ●로 가려지는 칸입니다. 줄을 바꾸려면 <br>을 씁니다.'
    ],
    checks: [
      { label: '큰 제목 h2 「로그인」', selector: 'h2', text: '로그인' },
      { label: '아이디 칸 · input id="userId" type="text"', selector: '#userId', attrs: { type: 'text' } },
      { label: '비밀번호 칸 · input id="pwd" type="password"', selector: '#pwd', attrs: { type: 'password' } },
      { label: '버튼 「로그인」', selector: 'button', text: '로그인' },
      { label: '결과 네모 · div id="result"', selector: 'div#result' }
    ]
  },

  greeting: {
    no: '01',
    folder: '01-greeting',
    period: '1교시',
    title: '인사하기',
    fn: 'greet',
    desc: [
      '이름 칸에 이름을 쓰고 「인사하기」를 누르면 결과 네모에 "OOO님, 반갑습니다!"를 보여줍니다.',
      '이름 칸이 비어 있으면 "이름을 넣어 주세요"를 보여줍니다.'
    ],
    answer: `function greet() {
  const name = document.getElementById('name').value;

  if (name == '') {
    document.getElementById('result').innerHTML = '이름을 넣어 주세요';
  } else {
    document.getElementById('result').innerHTML = name + '님, 반갑습니다!';
  }
}`,
    cases: [
      { label: '이름 박신우', inputs: { name: '박신우' }, expect: '박신우님, 반갑습니다!' },
      { label: '이름 비움', inputs: { name: '' }, expect: '이름을 넣어 주세요' },
      { label: '이름 하람', inputs: { name: '하람' }, expect: '하람님, 반갑습니다!' }
    ]
  },

  candy: {
    no: '02',
    folder: '02-candy',
    period: '1교시',
    title: '사탕 나누기',
    fn: 'share',
    desc: [
      '인원과 사탕 개수를 넣고 「나누기」를 누르면 "1인당 O개, 남은 사탕 O개"를 보여줍니다.',
      '인원이 1보다 적으면 "1명 이상 넣어 주세요"를 보여줍니다.',
      '몫은 Math.floor(사탕 / 인원), 나머지는 사탕 % 인원으로 구합니다.'
    ],
    answer: `function share() {
  const people = Number(document.getElementById('people').value);
  const candy = Number(document.getElementById('candy').value);

  if (people < 1) {
    document.getElementById('result').innerHTML = '1명 이상 넣어 주세요';
  } else {
    const each = Math.floor(candy / people);
    const left = candy % people;
    document.getElementById('result').innerHTML = '1인당 ' + each + '개, 남은 사탕 ' + left + '개';
  }
}`,
    cases: [
      { label: '인원 4 · 사탕 13', inputs: { people: '4', candy: '13' }, expect: '1인당 3개, 남은 사탕 1개' },
      { label: '인원 5 · 사탕 3', inputs: { people: '5', candy: '3' }, expect: '1인당 0개, 남은 사탕 3개' },
      { label: '인원 0 · 사탕 10', inputs: { people: '0', candy: '10' }, expect: '1명 이상 넣어 주세요' }
    ]
  },

  login: {
    no: '03',
    folder: '03-login',
    period: '2교시',
    title: '로그인',
    fn: 'login',
    desc: [
      '「로그인」을 누르면 위에서부터 차례로 확인해 결과 네모에 한 문장을 보여줍니다.',
      '아이디가 비었으면 "아이디를 입력해주세요", 비밀번호가 비었으면 "비밀번호를 입력해주세요"',
      '아이디가 admin이고 비밀번호가 1234이면 "admin님, 환영합니다"',
      '그 밖에는 "아이디 또는 비밀번호가 틀렸습니다"'
    ],
    answer: `function login() {
  const id = document.getElementById('userId').value;
  const pwd = document.getElementById('pwd').value;

  if (id == '') {
    document.getElementById('result').innerHTML = '아이디를 입력해주세요';
  } else if (pwd == '') {
    document.getElementById('result').innerHTML = '비밀번호를 입력해주세요';
  } else if (id == 'admin' && pwd == '1234') {
    document.getElementById('result').innerHTML = id + '님, 환영합니다';
  } else {
    document.getElementById('result').innerHTML = '아이디 또는 비밀번호가 틀렸습니다';
  }
}`,
    cases: [
      { label: '둘 다 비움', inputs: { userId: '', pwd: '' }, expect: '아이디를 입력해주세요' },
      { label: 'admin · 비밀번호 비움', inputs: { userId: 'admin', pwd: '' }, expect: '비밀번호를 입력해주세요' },
      { label: 'admin · 1111', inputs: { userId: 'admin', pwd: '1111' }, expect: '아이디 또는 비밀번호가 틀렸습니다' },
      { label: 'guest · 1234', inputs: { userId: 'guest', pwd: '1234' }, expect: '아이디 또는 비밀번호가 틀렸습니다' },
      { label: 'admin · 1234', inputs: { userId: 'admin', pwd: '1234' }, expect: 'admin님, 환영합니다' }
    ]
  },

  stock: {
    no: '04',
    folder: '04-stock',
    period: '2교시',
    title: '재고 주문',
    fn: 'order',
    desc: [
      '떡볶이 재고가 7개 있습니다. 주문 수량을 넣고 「주문」을 누를 때마다 재고가 줄고 "남은 재고 O개"를 보여줍니다.',
      '1개보다 적게 주문하면 "1개 이상 주문해 주세요"를 보여줍니다.',
      '재고보다 많이 주문하면 "재고가 부족합니다"를 보여주고 재고는 그대로 둡니다.',
      '재고 그릇은 버튼을 누를 때마다 남아 있어야 하므로 함수 밖에 둡니다.'
    ],
    answer: `let stock = 7;

function order() {
  const count = Number(document.getElementById('count').value);

  if (count < 1) {
    document.getElementById('result').innerHTML = '1개 이상 주문해 주세요';
  } else if (count > stock) {
    document.getElementById('result').innerHTML = '재고가 부족합니다';
  } else {
    stock = stock - count;
    document.getElementById('result').innerHTML = '남은 재고 ' + stock + '개';
  }
}`,
    reset: 'stock = 7;',
    resetHint: '함수 밖에 let stock = 7; 이 있어야 합니다.',
    cases: [
      { label: '재고 7개일 때 8개', inputs: { count: '8' }, expect: '재고가 부족합니다' },
      { label: '0개', inputs: { count: '0' }, expect: '1개 이상 주문해 주세요' },
      { label: '3개', inputs: { count: '3' }, expect: '남은 재고 4개' },
      { label: '다시 3개', inputs: { count: '3' }, expect: '남은 재고 1개' },
      { label: '1개 남았을 때 3개', inputs: { count: '3' }, expect: '재고가 부족합니다' },
      { label: '1개', inputs: { count: '1' }, expect: '남은 재고 0개' }
    ]
  },

  candyRow: {
    no: '05',
    folder: '05-candy-row',
    period: '3교시',
    title: '사탕 쏙쏙',
    fn: 'drop',
    desc: [
      '사탕 개수를 넣고 「사탕 놓기」를 누르면 그 개수만큼 사탕이 하나씩 쏙쏙 들어옵니다.',
      '사탕 하나는 \'<li>사탕</li>\' 한 줄입니다. 반복하면서 html 그릇에 붙인 다음 한 번에 넣습니다.',
      '1개보다 적으면 "1개 이상 넣어 주세요"를 보여줍니다.',
      '도전 : \'<li>사탕</li>\' 대신 \'<li>\' + i + \'</li>\'를 붙이면 숫자가 몇부터 나오나요?'
    ],
    answer: `function drop() {
  const count = Number(document.getElementById('count').value);

  if (count < 1) {
    document.getElementById('result').innerHTML = '1개 이상 넣어 주세요';
  } else {
    let html = '';
    for (let i = 0; i < count; i++) {
      html += '<li>사탕</li>';
    }
    document.getElementById('result').innerHTML = html;
  }
}`,
    cases: [
      { label: '5개', inputs: { count: '5' }, expectLi: { id: 'result', n: 5 } },
      { label: '1개', inputs: { count: '1' }, expectLi: { id: 'result', n: 1 } },
      { label: '12개', inputs: { count: '12' }, expectLi: { id: 'result', n: 12 } },
      { label: '0개', inputs: { count: '0' }, expect: '1개 이상 넣어 주세요' }
    ]
  },

  scan: {
    no: '06',
    folder: '06-scan',
    period: '3교시',
    title: '스캔 기록',
    fn: 'findScan',
    desc: [
      'QR 스캔 기록은 A01, B02, A01, C03, B02 다섯 개입니다. 코드 안에 목록으로 둡니다.',
      '찾을 학번을 넣고 「찾기」를 누르면 기록 다섯 개를 li로 하나씩 보여주고, 찾는 학번은 노랗게 칠합니다.',
      '아래 결과 네모에는 "OOO 학생은 O번 찍혔습니다"를 보여줍니다.',
      '노랗게 칠하는 li는 \'<li class="hit">\' + scans[i] + \'</li>\'입니다.'
    ],
    answer: `function findScan() {
  const target = document.getElementById('target').value;
  const scans = ['A01', 'B02', 'A01', 'C03', 'B02'];
  let html = '';
  let count = 0;

  for (let i = 0; i < scans.length; i++) {
    if (scans[i] == target) {
      html += '<li class="hit">' + scans[i] + '</li>';
      count += 1;
    } else {
      html += '<li>' + scans[i] + '</li>';
    }
  }

  document.getElementById('list').innerHTML = html;
  document.getElementById('result').innerHTML = target + ' 학생은 ' + count + '번 찍혔습니다';
}`,
    cases: [
      { label: 'A01', inputs: { target: 'A01' }, expect: 'A01 학생은 2번 찍혔습니다', expectLi: { id: 'list', n: 5 } },
      { label: 'C03', inputs: { target: 'C03' }, expect: 'C03 학생은 1번 찍혔습니다' },
      { label: 'Z99 (없는 학번)', inputs: { target: 'Z99' }, expect: 'Z99 학생은 0번 찍혔습니다', expectLi: { id: 'list', n: 5 } }
    ]
  },

  cart: {
    no: '07',
    folder: '07-cart',
    page: 'cart.html',
    period: '4교시',
    title: '장바구니 (미니 프로젝트)',
    fn: 'addItem',
    desc: [
      '메뉴와 수량을 고르고 「담기」를 누르면 목록에 한 줄이 쏙 추가되고 총액이 늘어납니다.',
      '수량이 1보다 적으면 "1개 이상 담아 주세요" 알림창을 띄우고 아무것도 담지 않습니다.',
      '총액이 20000원 이상이면 뒤에 " · 배달비 무료!"를 붙입니다.',
      '「비우기」를 누르면 목록이 비고 "총액 0원"으로 돌아갑니다.',
      '가격 : 떡볶이 4000원 · 김밥 3500원 · 라면 5000원 · 튀김 2500원'
    ],
    reset: "total = 0; document.getElementById('list').innerHTML = ''; document.getElementById('result').innerHTML = '총액 0원';",
    resetHint: '함수 밖에 let total = 0; 이 있어야 합니다.',
    cases: [
      { label: '「담기」 버튼에 addItem() 연결', attr: { id: 'addBtn', name: 'onclick', has: 'addItem()' } },
      { label: '「비우기」 버튼에 clearCart() 연결', attr: { id: 'clearBtn', name: 'onclick', has: 'clearCart()' } },
      { label: '떡볶이 2개', inputs: { menu: '떡볶이', qty: '2' }, expect: '총액 8000원', expectLi: { id: 'list', n: 1 } },
      { label: '김밥 1개', inputs: { menu: '김밥', qty: '1' }, expect: '총액 11500원', expectLi: { id: 'list', n: 2 } },
      { label: '라면 0개 (거절)', inputs: { menu: '라면', qty: '0' }, expectAlert: '1개 이상 담아 주세요', expect: '총액 11500원', expectLi: { id: 'list', n: 2 } },
      { label: '라면 2개 (20000원 넘김)', inputs: { menu: '라면', qty: '2' }, expect: '총액 21500원 · 배달비 무료!' },
      { label: '비우기', call: 'clearCart', expect: '총액 0원', expectLi: { id: 'list', n: 0 } },
      { label: '튀김 1개', inputs: { menu: '튀김', qty: '1' }, expect: '총액 2500원' }
    ]
  }
};
