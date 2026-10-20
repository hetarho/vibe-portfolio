// 4시간 코스 공용 장치
// 문제 설명 · Step 이동 · 정답 보기 · 오류 알림 · 채점하기를 화면에 붙입니다.
// 학생이 고치는 html 파일에는 학생 코드만 남도록 이 파일로 따로 뺐습니다.
// 학생 코드와 이름이 겹치지 않게 전체를 함수 하나로 감쌌습니다.
(function () {
  const STEPS = {
    1: { name: '보고 똑같이 치기', rule: '아래 정답 코드를 보고 왼쪽 파일의 <script> 안에 한 글자씩 똑같이 칩니다. 복사는 막혀 있습니다. 다 치면 저장하고 「채점하기」를 누릅니다.' },
    2: { name: '값과 연산자만 바꾸기', rule: '뼈대는 다 있습니다. ___ 자리에 알맞은 값이나 연산자만 넣습니다. 문제 설명의 문장을 잘 보세요.' },
    3: { name: '주석 보고 껍데기 채우기', rule: '껍데기와 한국어 주석이 있습니다. "~면" 앞부분은 if 괄호 ( ) 안에, → 뒷부분은 중괄호 { } 안에 씁니다.' },
    4: { name: '주석으로 뼈대 세우기', rule: '한국어 주석만 있습니다. 위에서부터 치지 말고 function → if / else (→ for) 껍데기부터 칩니다. 그다음 주석을 껍데기 안으로 옮깁니다.' },
    5: { name: '완전 백지', rule: 'script 안이 비어 있습니다. 아래 체크리스트 순서대로 스스로 주석부터 씁니다.' }
  };
  const CHECKLIST = [
    '한국어 주석부터 쓰기 (한 줄에 동작 하나)',
    '껍데기 먼저 치기 (function, if / else, for를 속은 비운 채)',
    '주석 아래 빈칸 채우기'
  ];
  const PEEK_SECONDS = 5;

  const errors = [];
  const observers = [];
  let ready = false;

  // 학생 코드에서 난 오류를 모아 둡니다. Simple Browser에는 콘솔이 없어서 화면에 직접 띄웁니다.
  window.addEventListener('error', function (event) {
    errors.push({ message: event.message || '', line: event.lineno || 0 });
    if (errors.length > 3) {
      errors.shift();
    }
    if (ready) {
      showErrors();
    }
  });

  document.addEventListener('DOMContentLoaded', setup);

  function setup() {
    const id = document.body.dataset.problem;
    const step = document.body.dataset.step;
    const problem = window.DRILL_PROBLEMS[id];

    const stage = wrapStage();
    document.body.insertBefore(buildTop(id, problem, step), stage);
    document.body.appendChild(buildCheck(id, problem, step));
    watchOutputs();

    ready = true;
    showErrors();
  }

  // 학생이 만든 화면을 「실행 화면」 상자 하나로 묶습니다
  function wrapStage() {
    const stage = make('section', 'drill-stage');
    stage.appendChild(make('h2', 'drill-label', '실행 화면'));

    const nodes = [];
    for (let i = 0; i < document.body.childNodes.length; i++) {
      const node = document.body.childNodes[i];
      if (node.nodeName != 'SCRIPT') {
        nodes.push(node);
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      stage.appendChild(nodes[i]);
    }

    document.body.insertBefore(stage, document.body.firstChild);
    return stage;
  }

  function buildTop(id, problem, step) {
    const top = make('header', 'drill-top');

    // 목록 · 교시 · Step 이동
    const nav = make('nav', 'drill-nav');
    const back = make('a', 'drill-back', '← 목록');
    back.href = '../../index.html';
    nav.appendChild(back);
    nav.appendChild(make('span', 'drill-crumb', problem.period + ' · ' + problem.no + ' ' + problem.title));
    if (STEPS[step]) {
      const steps = make('span', 'drill-steps');
      for (let n = 1; n <= 5; n++) {
        const link = make('a', 'drill-step', String(n));
        link.href = 'step' + n + '.html';
        link.title = 'Step ' + n + ' · ' + STEPS[n].name;
        if (String(n) == step) {
          link.classList.add('is-now');
        }
        if (readStore('drill-pass:' + id + ':' + n) == '1') {
          link.classList.add('is-done');
        }
        steps.appendChild(link);
      }
      nav.appendChild(steps);
    }
    top.appendChild(nav);

    // 이번 Step의 규칙
    const rule = make('section', 'drill-rule');
    if (STEPS[step]) {
      rule.appendChild(make('b', '', 'Step ' + step + ' · ' + STEPS[step].name));
      rule.appendChild(make('p', '', STEPS[step].rule));
    } else {
      rule.appendChild(make('b', '', '조립 실습 · 빈칸 채우기'));
      rule.appendChild(make('p', '', '화면과 뼈대는 다 있습니다. 왼쪽 파일 주석의 조립 순서대로 빈칸을 하나씩 채우고, 채울 때마다 저장해서 실행해 봅니다.'));
    }
    top.appendChild(rule);

    // 문제 설명
    const desc = make('section', 'drill-problem');
    desc.appendChild(make('h1', '', problem.no + ' · ' + problem.title));
    for (let i = 0; i < problem.desc.length; i++) {
      desc.appendChild(make('p', '', problem.desc[i]));
    }
    top.appendChild(desc);

    // Step 1은 정답을 늘 보여 주고, Step 2~5는 막혔을 때만 잠깐 봅니다
    if (step == '1') {
      const box = make('section', 'drill-answer');
      box.appendChild(make('h2', 'drill-label', '정답 코드 · 보고 똑같이 치기 (복사 금지)'));
      box.appendChild(codeBlock(problem.answer));
      top.appendChild(box);
    } else if (problem.answer) {
      top.appendChild(buildPeek(problem));
    }

    const blanks = countBlanks();
    if (blanks > 0) {
      top.appendChild(make('p', 'drill-blanks', '남은 빈칸 ' + blanks + '개'));
    }

    if (step == '5') {
      top.appendChild(buildChecklist(id));
    }

    top.appendChild(make('section', 'drill-errors'));
    return top;
  }

  // 복사가 안 되는 코드 상자
  function codeBlock(text) {
    const pre = make('pre', 'drill-code no-copy', text);
    const blocked = ['copy', 'cut', 'contextmenu', 'selectstart', 'dragstart'];
    for (let i = 0; i < blocked.length; i++) {
      pre.addEventListener(blocked[i], function (event) {
        event.preventDefault();
      });
    }
    return pre;
  }

  function buildPeek(problem) {
    const box = make('section', 'drill-peek');
    const button = make('button', 'drill-button ghost', '막혔으면 · 정답 ' + PEEK_SECONDS + '초 보기');
    const code = codeBlock(problem.answer);
    code.hidden = true;
    button.type = 'button';
    button.addEventListener('click', function () {
      let left = PEEK_SECONDS;
      code.hidden = false;
      button.disabled = true;
      button.textContent = left + '초 뒤에 가려집니다';
      const timer = setInterval(function () {
        left -= 1;
        button.textContent = left + '초 뒤에 가려집니다';
        if (left <= 0) {
          clearInterval(timer);
          code.hidden = true;
          button.disabled = false;
          button.textContent = '막혔으면 · 정답 ' + PEEK_SECONDS + '초 보기';
        }
      }, 1000);
    });
    box.appendChild(button);
    box.appendChild(code);
    return box;
  }

  // Step 5 체크리스트 · 저장하면 화면이 새로 고쳐지므로 체크한 것을 기억해 둡니다
  function buildChecklist(id) {
    const box = make('section', 'drill-checklist');
    box.appendChild(make('h2', 'drill-label', '백지 3단계 체크리스트 · 순서대로'));
    const list = make('ol', '');
    const done = make('p', 'drill-checklist-done', '세 단계를 다 거쳤습니다. 이제 「채점하기」를 눌러 봅니다.');

    function update() {
      let all = true;
      for (let i = 0; i < list.children.length; i++) {
        if (!list.children[i].classList.contains('is-done')) {
          all = false;
        }
      }
      box.classList.toggle('is-all', all);
    }

    for (let i = 0; i < CHECKLIST.length; i++) {
      const key = 'drill-check:' + id + ':' + i;
      const item = make('li', '');
      const button = make('button', '', (i + 1) + '. ' + CHECKLIST[i]);
      button.type = 'button';
      if (readStore(key) == '1') {
        item.classList.add('is-done');
      }
      button.addEventListener('click', function () {
        item.classList.toggle('is-done');
        if (item.classList.contains('is-done')) {
          writeStore(key, '1');
        } else {
          writeStore(key, '');
        }
        update();
      });
      item.appendChild(button);
      list.appendChild(item);
    }

    box.appendChild(list);
    box.appendChild(done);
    update();
    return box;
  }

  // 학생 script와 버튼 onclick 안에 남은 ___ 와 빈칸_가 같은 빈칸을 셉니다
  function countBlanks() {
    let text = '';
    const scripts = document.querySelectorAll('script:not([src])');
    for (let i = 0; i < scripts.length; i++) {
      text += scripts[i].textContent;
    }
    const clicks = document.querySelectorAll('[onclick]');
    for (let i = 0; i < clicks.length; i++) {
      text += clicks[i].getAttribute('onclick');
    }
    const found = text.match(/___|빈칸_[가-힣]/g);
    if (found) {
      return found.length;
    }
    return 0;
  }

  function showErrors() {
    const box = document.querySelector('.drill-errors');
    if (!box) {
      return;
    }
    box.innerHTML = '';
    for (let i = 0; i < errors.length; i++) {
      const row = make('div', 'drill-error');
      let where = '';
      if (errors[i].line > 0) {
        where = errors[i].line + '번째 줄 · ';
      }
      row.appendChild(make('b', '', where + explain(errors[i].message)));
      row.appendChild(make('small', '', errors[i].message));
      box.appendChild(row);
    }
  }

  // 브라우저의 영어 오류 메시지를 학생이 바로 고칠 수 있는 말로 바꿉니다
  function explain(message) {
    const text = String(message).replace('Uncaught ', '');
    let found = text.match(/(___|빈칸_[가-힣]) is not defined/);
    if (found) {
      return '빈칸 ' + found[1] + ' 이(가) 아직 남아 있습니다. 알맞은 값으로 바꿔 주세요.';
    }
    found = text.match(/(\S+) is not defined/);
    if (found) {
      return '"' + found[1] + '"라는 이름을 찾을 수 없습니다. 철자(대소문자)를 확인하거나, 그 그릇이나 함수를 먼저 만들었는지 보세요.';
    }
    if (text.indexOf('Unexpected end of input') >= 0) {
      return '닫는 중괄호 } 가 모자랍니다. 여는 { 와 닫는 } 의 짝을 세어 보세요.';
    }
    if (text.indexOf('Invalid or unexpected token') >= 0) {
      return '따옴표 짝이 안 맞거나 이상한 글자가 들어 있습니다.';
    }
    if (text.indexOf('Unexpected token') >= 0 || text.indexOf('Unexpected identifier') >= 0) {
      return '문법 오류입니다. if 괄호 ( ) 안이 비어 있거나, 빈칸 ___ 이 남았거나, 괄호 짝이 맞지 않는지 보세요.';
    }
    if (text.indexOf('Cannot read properties of null') >= 0 || text.indexOf('Cannot set properties of null') >= 0) {
      return "getElementById('…') 따옴표 안의 id가 화면에 없습니다. id 철자를 확인하세요.";
    }
    if (text.indexOf('Assignment to constant') >= 0) {
      return 'const로 만든 그릇은 값을 바꿀 수 없습니다. 바뀌는 그릇은 let으로 만드세요.';
    }
    found = text.match(/Identifier '(\S+)' has already been declared/);
    if (found) {
      return '"' + found[1] + '" 그릇을 두 번 만들었습니다. 한 번만 만드세요.';
    }
    found = text.match(/(\S+) is not a function/);
    if (found) {
      return '"' + found[1] + '"는 함수가 아닙니다. 이름 철자와 괄호 ( ) 를 확인하세요.';
    }
    return '오류가 났습니다. 아래 영어 메시지를 선생님과 같이 읽어 봅니다.';
  }

  function buildCheck(id, problem, step) {
    const box = make('section', 'drill-check');
    const button = make('button', 'drill-button', '채점하기');
    const list = make('ol', 'drill-cases');
    const pass = make('div', 'drill-pass');
    button.type = 'button';
    pass.hidden = true;

    button.addEventListener('click', function () {
      const rows = grade(problem);
      let okCount = 0;
      list.innerHTML = '';
      for (let i = 0; i < rows.length; i++) {
        const item = make('li', '');
        if (rows[i].ok) {
          okCount += 1;
          item.className = 'is-ok';
          item.appendChild(make('b', '', '✔ ' + rows[i].label));
        } else {
          item.className = 'is-bad';
          item.appendChild(make('b', '', '✘ ' + rows[i].label));
          item.appendChild(make('small', '', rows[i].detail));
        }
        list.appendChild(item);
      }

      const allOk = rows.length > 0 && okCount == rows.length;
      document.body.classList.toggle('drill-all-pass', allOk);
      pass.hidden = !allOk;
      if (allOk) {
        writeStore('drill-pass:' + id + ':' + (step || 'project'), '1');
        const now = document.querySelector('.drill-step.is-now');
        if (now) {
          now.classList.add('is-done');
        }
        pass.innerHTML = '';
        pass.appendChild(make('b', '', '모두 통과! ' + okCount + '개 중 ' + okCount + '개'));
        pass.appendChild(nextLink(id, step));
      }
    });

    box.appendChild(button);
    box.appendChild(make('span', 'drill-check-how', '작은 경우 ' + problem.cases.length + '개를 차례로 넣어 봅니다'));
    box.appendChild(pass);
    box.appendChild(list);
    return box;
  }

  function nextLink(id, step) {
    const link = make('a', 'drill-next', '');
    const n = Number(step);
    if (n >= 1 && n < 5) {
      link.href = 'step' + (n + 1) + '.html';
      link.textContent = 'Step ' + (n + 1) + ' · ' + STEPS[n + 1].name + ' →';
      return link;
    }
    const order = window.DRILL_ORDER;
    const at = order.indexOf(id);
    if (at >= 0 && at < order.length - 1) {
      const next = window.DRILL_PROBLEMS[order[at + 1]];
      link.href = '../' + next.folder + '/' + (next.page || 'step1.html');
      link.textContent = '다음 문제 · ' + next.period + ' ' + next.no + ' ' + next.title + ' →';
      return link;
    }
    link.href = '../../index.html';
    link.textContent = '4교시까지 끝! 목록으로 →';
    return link;
  }

  // 작은 경우를 하나씩 넣어 보고, 끝나면 칸과 결과를 처음처럼 돌려 둡니다
  function grade(problem) {
    const rows = [];
    const realAlert = window.alert;
    let lastAlert = '';
    window.alert = function (message) {
      lastAlert = String(message);
    };

    const saved = saveInputs();
    let readyToRun = true;
    if (problem.reset) {
      try {
        problem.reset();
      } catch (error) {
        readyToRun = false;
        rows.push({ ok: false, label: '준비', detail: explain(error.message) + ' ' + (problem.resetHint || '') });
      }
    }

    for (let i = 0; readyToRun && i < problem.cases.length; i++) {
      const c = problem.cases[i];
      lastAlert = '';
      try {
        rows.push(runCase(problem, c, function () {
          return lastAlert;
        }));
      } catch (error) {
        rows.push({ ok: false, label: c.label, detail: explain(error.message) });
      }
    }

    window.alert = realAlert;
    restoreInputs(saved);
    clearOutputs();
    if (problem.reset) {
      try {
        problem.reset();
      } catch (error) {
        // 준비에서 이미 알렸습니다
      }
    }
    for (let i = 0; i < observers.length; i++) {
      observers[i].takeRecords();
    }
    rememberLists();

    if (errors.length > 0) {
      rows.unshift({ ok: false, label: '코드 오류', detail: '위 빨간 상자의 오류부터 고칩니다. 오류가 있으면 함수가 만들어지지 않습니다.' });
    }
    return rows;
  }

  function runCase(problem, c, getAlert) {
    if (c.attr) {
      const el = document.getElementById(c.attr.id);
      const value = el ? el.getAttribute(c.attr.name) || '' : '';
      if (squash(value).indexOf(squash(c.attr.has)) >= 0) {
        return { ok: true, label: c.label };
      }
      return { ok: false, label: c.label, detail: c.attr.name + '="' + c.attr.has + '" 가 있어야 합니다. 지금 : ' + (value || '(비어 있음)') };
    }

    for (const key in c.inputs || {}) {
      const input = document.getElementById(key);
      if (!input) {
        return { ok: false, label: c.label, detail: 'id가 ' + key + '인 칸이 화면에 없습니다.' };
      }
      input.value = c.inputs[key];
    }

    const name = c.call || problem.fn;
    if (typeof window[name] != 'function') {
      return { ok: false, label: c.label, detail: name + ' 함수가 아직 없습니다. function ' + name + '() { } 껍데기부터 칩니다.' };
    }
    window[name]();

    const problems = [];
    if (c.expectAlert !== undefined && squash(getAlert()) != squash(c.expectAlert)) {
      problems.push('알림창 · 기대 "' + c.expectAlert + '" / 실제 "' + (getAlert() || '안 뜸') + '"');
    }
    if (c.expect !== undefined) {
      const out = document.getElementById(c.target || 'result');
      const actual = out ? out.textContent : '';
      if (squash(actual) != squash(c.expect)) {
        problems.push('결과 · 기대 "' + c.expect + '" / 실제 "' + (actual.trim() || '비어 있음') + '"');
      }
    }
    if (c.expectLi) {
      const list = document.getElementById(c.expectLi.id);
      const n = list ? list.getElementsByTagName('li').length : 0;
      if (n != c.expectLi.n) {
        problems.push('li 개수 · 기대 ' + c.expectLi.n + '개 / 실제 ' + n + '개');
      }
    }

    if (problems.length > 0) {
      return { ok: false, label: c.label, detail: problems.join(' · ') };
    }
    return { ok: true, label: c.label };
  }

  function saveInputs() {
    const saved = [];
    const inputs = document.querySelectorAll('.drill-stage input, .drill-stage select, .drill-stage textarea');
    for (let i = 0; i < inputs.length; i++) {
      saved.push({ el: inputs[i], value: inputs[i].value });
    }
    return saved;
  }

  function restoreInputs(saved) {
    for (let i = 0; i < saved.length; i++) {
      saved[i].el.value = saved[i].value;
    }
  }

  function clearOutputs() {
    const ids = ['result', 'list'];
    for (let i = 0; i < ids.length; i++) {
      const el = document.getElementById(ids[i]);
      if (el) {
        el.innerHTML = '';
      }
    }
  }

  // 결과 칸이 바뀌면 반짝이고, 새로 생긴 li는 하나씩 쏙쏙 들어오게 합니다
  function watchOutputs() {
    const ids = ['result', 'list'];
    for (let i = 0; i < ids.length; i++) {
      const el = document.getElementById(ids[i]);
      if (!el) {
        continue;
      }
      const observer = new MutationObserver(function () {
        flash(el);
        popItems(el);
      });
      observer.observe(el, { childList: true, characterData: true, subtree: true });
      observers.push(observer);
    }
    rememberLists();
  }

  function flash(el) {
    el.classList.remove('drill-flash');
    void el.offsetWidth;
    el.classList.add('drill-flash');
  }

  function popItems(list) {
    const items = list.getElementsByTagName('li');
    const before = list.dataset.seen ? list.dataset.seen.split('\n') : [];

    // 뒤에 덧붙인 경우(장바구니)는 새 줄만, 통째로 바꾼 경우는 전부 다시 들어옵니다
    let start = 0;
    if (items.length > before.length) {
      let same = true;
      for (let i = 0; i < before.length; i++) {
        if (items[i].textContent != before[i]) {
          same = false;
        }
      }
      if (same) {
        start = before.length;
      }
    }

    const gap = Math.min(90, 1800 / Math.max(1, items.length - start));
    for (let i = start; i < items.length; i++) {
      items[i].classList.add('pop-in');
      items[i].style.animationDelay = Math.round((i - start) * gap) + 'ms';
    }
    remember(list);
  }

  function rememberLists() {
    const ids = ['result', 'list'];
    for (let i = 0; i < ids.length; i++) {
      const el = document.getElementById(ids[i]);
      if (el) {
        remember(el);
      }
    }
  }

  function remember(list) {
    const items = list.getElementsByTagName('li');
    const texts = [];
    for (let i = 0; i < items.length; i++) {
      texts.push(items[i].textContent);
    }
    list.dataset.seen = texts.join('\n');
  }

  function squash(text) {
    return String(text).replace(/\s+/g, '');
  }

  function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    if (text !== undefined) {
      el.textContent = text;
    }
    return el;
  }

  // 시크릿 창처럼 저장이 막힌 곳에서도 화면은 그대로 돌아가게 합니다
  function readStore(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStore(key, value) {
    try {
      if (value) {
        window.localStorage.setItem(key, value);
      } else {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      // 기억하지 못해도 이번 화면에서는 그대로 보입니다
    }
  }
})();
