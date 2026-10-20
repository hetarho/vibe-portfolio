// 4시간 코스 실습 화면
// 노트북 한 대, 화면 하나로 수업하도록 만든 화면입니다. VS Code도 화면 나누기도 필요 없습니다.
// 왼쪽 코드 칸에 치고 → 실행하면 오른쪽에 결과가 나오고 → 「채점하기」로 확인합니다.
//
// 학생 코드는 실행할 때마다 새 iframe 안에서 돌립니다.
// 같은 화면에서 다시 실행해도 let 그릇이 "이미 있다"는 오류 없이 처음부터 다시 시작하게 하려는 것입니다.
// 학생 코드와 이름이 겹치지 않게 전체를 함수 하나로 감쌌습니다.
(function () {
  const STEPS = {
    1: { name: '보고 똑같이 치기', rule: '왼쪽 위 정답 코드를 보고, 아래 코드 칸에 한 글자씩 똑같이 칩니다. 복사는 막혀 있습니다.' },
    2: { name: '값과 연산자만 바꾸기', rule: '코드 칸에 뼈대가 다 있습니다. 노란 ___ 자리만 알맞은 값이나 기호로 바꿉니다.' },
    3: { name: '주석 보고 껍데기 채우기', rule: '껍데기와 한국어 주석이 있습니다. "~면" 앞부분은 if 괄호 ( ) 안에, → 뒷부분은 { } 안 주석 아래에 씁니다.' },
    4: { name: '주석으로 뼈대 세우기', rule: '한국어 주석만 있습니다. 위에서부터 치지 말고 function → if / else (→ for) 껍데기부터 치고, 주석을 그 안으로 옮깁니다.' },
    5: { name: '완전 백지', rule: '코드 칸이 비어 있습니다. 아래 세 단계를 순서대로 눌러 가며 스스로 씁니다.' }
  };
  const PLACEHOLDER = {
    1: '위 정답 코드를 보고 여기에 똑같이 칩니다.\n다 치면 Ctrl + Enter (또는 ▶ 실행)',
    5: '1) 한국어 주석부터 씁니다  // 1. ...\n2) 껍데기를 칩니다  function 이름() { }  if () { } else { }\n3) 주석 아래 빈칸을 채웁니다'
  };
  const CHECKLIST = ['한국어 주석부터', '껍데기 먼저', '빈칸 채우기'];
  const PEEK_SECONDS = 5;
  const HELP = [
    ['맨 위 검은 상자', '이번 Step에서 할 일입니다. 막히면 소리 내어 읽어 봅니다.'],
    ['왼쪽 「내 코드」 칸', '여기에 코드를 칩니다. Tab은 두 칸 들여쓰기, Enter는 들여쓰기를 이어 줍니다.'],
    ['▶ 실행 · Ctrl + Enter', '오른쪽 「실행 화면」이 새로 만들어집니다. 칸에 값을 넣고 버튼을 직접 눌러 봅니다.'],
    ['빨간 상자', '틀린 곳의 줄 번호와 고칠 방법이 나옵니다. 누르면 그 줄로 커서가 갑니다.'],
    ['채점하기', '작은 경우를 차례로 넣어 봅니다. 다 맞으면 화면이 초록색이 되고 다음 Step 버튼이 나옵니다.'],
    ['막혔을 때', '「정답 5초 보기」를 누르거나, 위 동그라미에서 한 Step 아래로 내려갔다 옵니다.'],
    ['저장', '친 코드는 저절로 저장됩니다. 창을 닫아도 남아 있고, 「처음 코드로」를 누르면 지워집니다.']
  ];

  const scriptSrc = document.currentScript.src;
  const STAGE_CSS = new URL('stage.css', scriptSrc).href;
  // iframe 안에서 난 오류와 알림창을 바깥 화면으로 넘깁니다. 줄 번호를 맞추려고 한 줄로 씁니다
  const BRIDGE =
    "window.addEventListener('error',function(e){var f=window.frameElement;if(f&&f.drillError){f.drillError(e.message,e.lineno);}});" +
    "window.alert=function(m){var f=window.frameElement;if(f&&f.drillAlert){f.drillAlert(String(m));}};";

  let page = null;
  let editor = null;
  let gutter = null;
  let stageBox = null;
  let errorBox = null;
  let blanksBadge = null;
  let errors = [];

  setup();

  function setup() {
    const body = document.body;
    const id = body.dataset.problem;
    const step = body.dataset.step;
    const stage = document.getElementById('stage');
    const starter = document.getElementById('starter');

    page = {
      id: id,
      step: step,
      problem: window.DRILL_PROBLEMS[id],
      mode: body.dataset.edit == 'html' ? 'html' : 'script',
      stage: stage ? dedent(stage.innerHTML) : '',
      starter: starter ? dedent(starter.tagName == 'TEMPLATE' ? starter.innerHTML : starter.textContent) : '',
      key: 'drill-code:' + id + ':' + step
    };

    body.appendChild(buildTop());
    body.appendChild(buildHelp());
    body.appendChild(buildMain());
    body.appendChild(make('div', 'd-toasts'));

    const saved = readStore(page.key);
    editor.value = saved === null ? page.starter : saved;
    drawGutter();
    countBlanks();
    run();

    if (readStore('drill-help-seen') != '1') {
      toggleHelp(true);
      writeStore('drill-help-seen', '1');
    }
  }

  // ───── 화면 만들기 ─────

  function buildTop() {
    const top = make('header', 'd-top');
    const home = make('a', 'd-home', '← 코스 목록');
    home.href = '../index.html';
    top.appendChild(home);
    top.appendChild(make('span', 'd-crumb', page.problem.period + ' · ' + page.problem.no + ' ' + page.problem.title));

    if (STEPS[page.step]) {
      const steps = make('nav', 'd-steps');
      for (let n = 1; n <= 5; n++) {
        const link = make('a', 'd-step', String(n));
        link.href = 'step' + n + '.html';
        link.title = 'Step ' + n + ' · ' + STEPS[n].name;
        if (String(n) == page.step) {
          link.classList.add('is-now');
        }
        if (readStore('drill-pass:' + page.id + ':' + n) == '1') {
          link.classList.add('is-done');
        }
        steps.appendChild(link);
      }
      top.appendChild(steps);
    }

    const help = make('button', 'd-help-button', '사용법');
    help.type = 'button';
    help.addEventListener('click', function () {
      toggleHelp();
    });
    top.appendChild(help);
    return top;
  }

  function buildHelp() {
    const box = make('section', 'd-help');
    box.hidden = true;
    box.appendChild(make('h2', '', '이 화면 쓰는 법'));
    const list = make('ol', '');
    for (let i = 0; i < HELP.length; i++) {
      const item = make('li', '');
      item.appendChild(make('b', '', HELP[i][0]));
      item.appendChild(make('span', '', HELP[i][1]));
      list.appendChild(item);
    }
    box.appendChild(list);
    const close = make('button', 'd-button', '알겠어요, 시작하기');
    close.type = 'button';
    close.addEventListener('click', function () {
      toggleHelp(false);
      editor.focus();
    });
    box.appendChild(close);
    return box;
  }

  function toggleHelp(open) {
    const box = document.querySelector('.d-help');
    box.hidden = open === undefined ? !box.hidden : !open;
  }

  function buildMain() {
    const main = make('main', 'd-main');
    const left = make('section', 'd-left');
    const right = make('section', 'd-right');

    // 이번 Step 규칙
    const rule = make('div', 'd-rule');
    if (STEPS[page.step]) {
      rule.appendChild(make('b', '', 'Step ' + page.step + ' · ' + STEPS[page.step].name));
      rule.appendChild(make('p', '', STEPS[page.step].rule));
    } else {
      rule.appendChild(make('b', '', '조립 실습 · 빈칸 채우기'));
      rule.appendChild(make('p', '', '코드 칸에 화면(HTML)과 script가 다 있습니다. 노란 빈칸을 아래 문제의 조립 순서대로 하나씩 채우고, 채울 때마다 실행해 봅니다.'));
    }
    left.appendChild(rule);

    if (page.step == '1') {
      const answer = make('div', 'd-answer');
      answer.appendChild(make('p', 'd-label', '정답 코드 · 보고 똑같이 치기 (복사 금지)'));
      answer.appendChild(codeBlock(page.problem.answer));
      left.appendChild(answer);
    }
    if (page.step == '5') {
      left.appendChild(buildChecklist());
    }

    // 코드 칸
    const head = make('div', 'd-editor-head');
    head.appendChild(make('p', 'd-label', page.mode == 'html' ? '내 코드 · 화면(HTML)과 script' : '내 코드'));
    blanksBadge = make('span', 'd-blanks', '');
    head.appendChild(blanksBadge);
    left.appendChild(head);
    left.appendChild(buildEditor());

    // 버튼 줄
    const tools = make('div', 'd-tools');
    tools.appendChild(button('▶ 실행  Ctrl + Enter', 'd-button primary', run));
    tools.appendChild(button('채점하기', 'd-button', grade));
    let peekCode = null;
    if (page.step != '1' && page.problem.answer) {
      peekCode = codeBlock(page.problem.answer);
      peekCode.hidden = true;
      tools.appendChild(peekButton(peekCode));
    }
    tools.appendChild(button('처음 코드로', 'd-button ghost', resetCode));
    left.appendChild(tools);
    if (peekCode) {
      left.appendChild(peekCode);
    }

    errorBox = make('div', 'd-errors');
    left.appendChild(errorBox);

    // 오른쪽 · 문제, 실행 화면, 채점 결과
    const problem = make('div', 'd-problem');
    problem.appendChild(make('h1', '', page.problem.no + ' · ' + page.problem.title));
    for (let i = 0; i < page.problem.desc.length; i++) {
      problem.appendChild(make('p', '', page.problem.desc[i]));
    }
    right.appendChild(problem);

    const stage = make('div', 'd-stage');
    stage.appendChild(make('p', 'd-label', '실행 화면 · 직접 눌러 보세요'));
    stageBox = make('div', 'd-frame-box');
    stage.appendChild(stageBox);
    right.appendChild(stage);

    const check = make('div', 'd-check');
    check.appendChild(make('p', 'd-check-how', '「채점하기」를 누르면 작은 경우 ' + page.problem.cases.length + '개를 차례로 넣어 봅니다.'));
    right.appendChild(check);

    main.appendChild(left);
    main.appendChild(right);
    return main;
  }

  function button(text, className, onClick) {
    const el = make('button', className, text);
    el.type = 'button';
    el.addEventListener('click', onClick);
    return el;
  }

  // 복사가 안 되는 코드 상자
  function codeBlock(text) {
    const pre = make('pre', 'd-code no-copy', text);
    const blocked = ['copy', 'cut', 'contextmenu', 'selectstart', 'dragstart'];
    for (let i = 0; i < blocked.length; i++) {
      pre.addEventListener(blocked[i], function (event) {
        event.preventDefault();
      });
    }
    return pre;
  }

  function peekButton(code) {
    const label = '정답 ' + PEEK_SECONDS + '초 보기';
    const el = button(label, 'd-button ghost', function () {
      let left = PEEK_SECONDS;
      code.hidden = false;
      el.disabled = true;
      el.textContent = left + '초 뒤에 가려집니다';
      const timer = setInterval(function () {
        left -= 1;
        el.textContent = left + '초 뒤에 가려집니다';
        if (left <= 0) {
          clearInterval(timer);
          code.hidden = true;
          el.disabled = false;
          el.textContent = label;
        }
      }, 1000);
    });
    return el;
  }

  // Step 5 체크리스트 · 순서대로 눌러 가며 씁니다
  function buildChecklist() {
    const box = make('div', 'd-checklist');
    for (let i = 0; i < CHECKLIST.length; i++) {
      const key = 'drill-check:' + page.id + ':' + i;
      const item = button(i + 1 + '. ' + CHECKLIST[i], 'd-check-item', function () {
        item.classList.toggle('is-done');
        writeStore(key, item.classList.contains('is-done') ? '1' : '');
      });
      if (readStore(key) == '1') {
        item.classList.add('is-done');
      }
      box.appendChild(item);
    }
    return box;
  }

  // ───── 코드 칸 ─────

  function buildEditor() {
    const box = make('div', 'd-editor');
    gutter = make('pre', 'd-gutter', '1');
    gutter.setAttribute('aria-hidden', 'true');
    editor = make('textarea', 'd-textarea');
    editor.spellcheck = false;
    editor.setAttribute('autocomplete', 'off');
    editor.setAttribute('autocapitalize', 'off');
    editor.setAttribute('aria-label', '내 코드');
    editor.placeholder = PLACEHOLDER[page.step] || '';
    if (page.step == '1') {
      box.classList.add('is-short');
    }

    editor.addEventListener('input', function () {
      writeStore(page.key, editor.value);
      drawGutter();
      countBlanks();
    });
    editor.addEventListener('scroll', function () {
      gutter.scrollTop = editor.scrollTop;
    });
    editor.addEventListener('keydown', onKey);

    box.appendChild(gutter);
    box.appendChild(editor);
    return box;
  }

  function onKey(event) {
    // 한글을 조합하는 중에는 키를 가로채지 않습니다
    if (event.isComposing || event.keyCode == 229) {
      return;
    }
    const withCtrl = event.ctrlKey || event.metaKey;
    if (withCtrl && (event.key == 'Enter' || event.key == 's' || event.key == 'S')) {
      event.preventDefault();
      run();
      return;
    }
    if (withCtrl || event.altKey) {
      return;
    }

    const at = editor.selectionStart;
    const lineStart = editor.value.lastIndexOf('\n', at - 1) + 1;
    const before = editor.value.slice(lineStart, at);

    if (event.key == 'Tab') {
      event.preventDefault();
      insert('  ');
    } else if (event.key == 'Enter') {
      // 윗줄 들여쓰기를 이어 주고, { 로 끝났으면 두 칸 더 들어갑니다
      event.preventDefault();
      let indent = before.match(/^ */)[0];
      if (before.trim().slice(-1) == '{') {
        indent += '  ';
      }
      insert('\n' + indent);
    } else if (event.key == '}' && before.length >= 2 && before.trim() == '' && editor.selectionEnd == at) {
      // 빈 줄에서 } 를 치면 한 단계 밖으로 나옵니다
      event.preventDefault();
      editor.setSelectionRange(at - 2, at);
      insert('}');
    }
  }

  // execCommand로 넣어야 Ctrl + Z로 되돌릴 수 있습니다
  function insert(text) {
    if (!document.execCommand('insertText', false, text)) {
      editor.setRangeText(text, editor.selectionStart, editor.selectionEnd, 'end');
      editor.dispatchEvent(new Event('input'));
    }
  }

  function drawGutter() {
    const count = editor.value.split('\n').length;
    let text = '';
    for (let i = 1; i <= count; i++) {
      text += i + '\n';
    }
    gutter.textContent = text;
    gutter.scrollTop = editor.scrollTop;
  }

  function countBlanks() {
    const found = editor.value.match(/___|빈칸_[가-힣]/g);
    blanksBadge.textContent = found ? '남은 빈칸 ' + found.length + '개' : '';
    blanksBadge.hidden = !found;
  }

  function goToLine(line) {
    const lines = editor.value.split('\n');
    let start = 0;
    for (let i = 0; i < line - 1 && i < lines.length; i++) {
      start += lines[i].length + 1;
    }
    const end = start + (lines[line - 1] || '').length;
    editor.focus();
    editor.setSelectionRange(start, end);
    // 고른 줄이 칸 가운데쯤 오게 스크롤합니다
    const lineHeight = parseFloat(getComputedStyle(editor).lineHeight) || 24;
    editor.scrollTop = Math.max(0, (line - 4) * lineHeight);
  }

  function resetCode() {
    if (!window.confirm('지금 친 코드를 지우고 처음 코드로 돌아갈까요?')) {
      return;
    }
    editor.value = page.starter;
    writeStore(page.key, '');
    drawGutter();
    countBlanks();
    run();
    editor.focus();
  }

  // ───── 실행 ─────

  // 실행 화면 문서를 만듭니다. offset은 학생 코드 첫 줄 앞에 있는 줄 수입니다
  function buildDoc(code) {
    let before =
      '<!DOCTYPE html>\n<html lang="ko">\n<head>\n<meta charset="UTF-8">\n' +
      '<link rel="stylesheet" href="' + STAGE_CSS + '">\n' +
      '<script>' + BRIDGE + '<\/script>\n</head>\n<body>\n' +
      page.stage + '\n';
    let after = '\n</body>\n</html>';
    if (page.mode == 'script') {
      before += '<script>\n';
      after = '\n<\/script>' + after;
    }
    return { html: before + code + after, offset: before.split('\n').length - 1 };
  }

  function makeFrame(code, onError, onAlert) {
    const built = buildDoc(code);
    const frame = make('iframe', 'd-frame');
    frame.title = '실행 화면';
    frame.drillError = function (message, line) {
      onError(message, line - built.offset);
    };
    frame.drillAlert = onAlert;
    frame.srcdoc = built.html;
    return frame;
  }

  function run() {
    errors = [];
    showErrors();
    const frame = makeFrame(
      editor.value,
      function (message, line) {
        errors.push({ message: message, line: line });
        if (errors.length > 3) {
          errors.shift();
        }
        showErrors();
      },
      toast
    );
    frame.addEventListener('load', function () {
      watchOutputs(frame);
      fit(frame);
    });
    stageBox.innerHTML = '';
    stageBox.appendChild(frame);
  }

  function fit(frame) {
    const doc = frame.contentDocument;
    if (doc && doc.documentElement) {
      frame.style.height = Math.max(150, doc.documentElement.scrollHeight + 4) + 'px';
    }
  }

  function showErrors() {
    errorBox.innerHTML = '';
    for (let i = 0; i < errors.length; i++) {
      const line = errors[i].line;
      const row = make('button', 'd-error');
      row.type = 'button';
      row.appendChild(make('b', '', (line > 0 ? line + '번째 줄 · ' : '') + explain(errors[i].message)));
      row.appendChild(make('small', '', errors[i].message));
      if (line > 0) {
        row.addEventListener('click', function () {
          goToLine(line);
        });
      }
      errorBox.appendChild(row);
    }
  }

  function toast(message) {
    const box = document.querySelector('.d-toasts');
    const item = make('div', 'd-toast');
    item.appendChild(make('small', '', '알림창'));
    item.appendChild(make('b', '', message));
    box.appendChild(item);
    setTimeout(function () {
      item.remove();
    }, 3500);
  }

  // 결과 칸이 바뀌면 반짝이고, 새로 생긴 li는 하나씩 쏙쏙 들어오게 합니다
  function watchOutputs(frame) {
    const doc = frame.contentDocument;
    const ids = ['result', 'list'];
    for (let i = 0; i < ids.length; i++) {
      const el = doc.getElementById(ids[i]);
      if (!el) {
        continue;
      }
      remember(el);
      const observer = new MutationObserver(function () {
        flash(el);
        popItems(el);
        fit(frame);
      });
      observer.observe(el, { childList: true, characterData: true, subtree: true });
    }
  }

  function flash(el) {
    el.classList.remove('d-flash');
    void el.offsetWidth;
    el.classList.add('d-flash');
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

  function remember(list) {
    const items = list.getElementsByTagName('li');
    const texts = [];
    for (let i = 0; i < items.length; i++) {
      texts.push(items[i].textContent);
    }
    list.dataset.seen = texts.join('\n');
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

  // ───── 채점 ─────

  // 보이지 않는 새 실행 화면을 하나 더 만들어 작은 경우를 넣어 봅니다. 학생이 보는 화면은 건드리지 않습니다
  function grade() {
    run();
    const loadErrors = [];
    let lastAlert = '';
    const frame = makeFrame(
      editor.value,
      function (message, line) {
        loadErrors.push((line > 0 ? line + '번째 줄 · ' : '') + explain(message));
      },
      function (message) {
        lastAlert = message;
      }
    );
    frame.classList.add('is-hidden');
    frame.addEventListener('load', function () {
      const rows = [];
      if (loadErrors.length > 0) {
        rows.push({ ok: false, label: '코드 오류', detail: loadErrors[0] + ' · 왼쪽 빨간 상자부터 고칩니다.' });
      }
      const more = runCases(frame.contentWindow, function () {
        return lastAlert;
      }, function () {
        lastAlert = '';
      });
      for (let i = 0; i < more.length; i++) {
        rows.push(more[i]);
      }
      frame.remove();
      showResult(rows);
    });
    document.body.appendChild(frame);
  }

  function runCases(win, getAlert, clearAlert) {
    const problem = page.problem;
    const rows = [];
    if (problem.reset) {
      try {
        win.eval('"use strict";' + problem.reset);
      } catch (error) {
        rows.push({ ok: false, label: '준비', detail: explain(error.message) + ' ' + (problem.resetHint || '') });
        return rows;
      }
    }
    for (let i = 0; i < problem.cases.length; i++) {
      const c = problem.cases[i];
      clearAlert();
      try {
        rows.push(runCase(win, c, getAlert));
      } catch (error) {
        rows.push({ ok: false, label: c.label, detail: explain(error.message) });
      }
    }
    return rows;
  }

  function runCase(win, c, getAlert) {
    const doc = win.document;
    if (c.attr) {
      const el = doc.getElementById(c.attr.id);
      const value = el ? el.getAttribute(c.attr.name) || '' : '';
      if (squash(value).indexOf(squash(c.attr.has)) >= 0) {
        return { ok: true, label: c.label };
      }
      return { ok: false, label: c.label, detail: c.attr.name + '="' + c.attr.has + '" 가 있어야 합니다. 지금 : ' + (value || '(비어 있음)') };
    }

    for (const key in c.inputs || {}) {
      const input = doc.getElementById(key);
      if (!input) {
        return { ok: false, label: c.label, detail: 'id가 ' + key + '인 칸이 화면에 없습니다.' };
      }
      input.value = c.inputs[key];
    }

    const name = c.call || page.problem.fn;
    if (typeof win[name] != 'function') {
      return { ok: false, label: c.label, detail: name + ' 함수가 아직 없습니다. function ' + name + '() { } 껍데기부터 칩니다.' };
    }
    win[name]();

    const problems = [];
    if (c.expectAlert !== undefined && squash(getAlert()) != squash(c.expectAlert)) {
      problems.push('알림창 · 기대 "' + c.expectAlert + '" / 실제 "' + (getAlert() || '안 뜸') + '"');
    }
    if (c.expect !== undefined) {
      const out = doc.getElementById(c.target || 'result');
      const actual = out ? out.textContent : '';
      if (squash(actual) != squash(c.expect)) {
        problems.push('결과 · 기대 "' + c.expect + '" / 실제 "' + (actual.trim() || '비어 있음') + '"');
      }
    }
    if (c.expectLi) {
      const list = doc.getElementById(c.expectLi.id);
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

  function showResult(rows) {
    const box = document.querySelector('.d-check');
    box.innerHTML = '';
    let okCount = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].ok) {
        okCount += 1;
      }
    }
    const allOk = rows.length > 0 && okCount == rows.length;
    document.body.classList.toggle('d-all-pass', allOk);

    if (allOk) {
      writeStore('drill-pass:' + page.id + ':' + (page.step || 'project'), '1');
      const now = document.querySelector('.d-step.is-now');
      if (now) {
        now.classList.add('is-done');
      }
      const pass = make('div', 'd-pass');
      pass.appendChild(make('b', '', '모두 통과! ' + okCount + '개 중 ' + okCount + '개'));
      pass.appendChild(nextLink());
      box.appendChild(pass);
    } else {
      box.appendChild(make('p', 'd-score', rows.length + '개 중 ' + okCount + '개 맞았습니다. ✘ 줄을 보고 고친 뒤 다시 채점합니다.'));
    }

    const list = make('ol', 'd-cases');
    for (let i = 0; i < rows.length; i++) {
      const item = make('li', rows[i].ok ? 'is-ok' : 'is-bad');
      item.appendChild(make('b', '', (rows[i].ok ? '✔ ' : '✘ ') + rows[i].label));
      if (!rows[i].ok) {
        item.appendChild(make('small', '', rows[i].detail));
      }
      list.appendChild(item);
    }
    box.appendChild(list);
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function nextLink() {
    const link = make('a', 'd-next', '');
    const n = Number(page.step);
    if (n >= 1 && n < 5) {
      link.href = 'step' + (n + 1) + '.html';
      link.textContent = 'Step ' + (n + 1) + ' · ' + STEPS[n + 1].name + ' →';
      return link;
    }
    const order = window.DRILL_ORDER;
    const at = order.indexOf(page.id);
    if (at >= 0 && at < order.length - 1) {
      const next = window.DRILL_PROBLEMS[order[at + 1]];
      link.href = '../' + next.folder + '/' + (next.page || 'step1.html');
      link.textContent = '다음 문제 · ' + next.period + ' ' + next.no + ' ' + next.title + ' →';
      return link;
    }
    link.href = '../index.html';
    link.textContent = '4교시까지 끝! 코스 목록으로 →';
    return link;
  }

  // ───── 도구 ─────

  // 파일 안에서 들여 쓴 만큼을 걷어 내고, 앞뒤 빈 줄을 뺍니다
  function dedent(text) {
    const lines = text.replace(/\t/g, '  ').split('\n');
    while (lines.length > 0 && lines[0].trim() == '') {
      lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() == '') {
      lines.pop();
    }
    let least = Infinity;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() != '') {
        least = Math.min(least, lines[i].match(/^ */)[0].length);
      }
    }
    if (least == Infinity) {
      return '';
    }
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      out.push(lines[i].slice(least).trimEnd());
    }
    return out.join('\n');
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
