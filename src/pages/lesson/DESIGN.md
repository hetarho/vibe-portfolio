# 강의(lesson) 디자인 지침

`/lesson` 이하 모든 화면에 적용된다. 강의장 빔프로젝터에 띄워놓고 강사가 말로 진행하는
프레젠테이션형 화면이므로, "맨 뒷자리에서 읽히는가"가 모든 판단의 기준이다.

토큰 정의는 [src/app/styles/theme.css](../../app/styles/theme.css)의 `@theme` 블록에 있다.
(`@theme`은 유틸리티 클래스를 만들어내므로 전역 한 곳에 모아 둔다.)
화면 크기별로 덱 토큰을 다시 잡는 규칙은 [styles.css](./styles.css)에 있다.

---

## 1. 절대 규칙 — Tailwind 토큰만 사용

**임의값(arbitrary value)으로 색상·치수를 쓰지 않는다.** 예외는 없다.

```tsx
// ✗ 금지
<div className="bg-[#2b2724] p-[28px] rounded-[18px] text-[32px] shadow-[0_2px_8px_#000]" />
<div style={{ background: '#2b2724', padding: 28 }} />

// ✓ 허용
<div className="bg-surface-raised p-7 rounded-card text-deck-body shadow-raised" />
```

- 색상: `surface-*`, `content-*`, `line-*`, `accent-*`, `primary-*`, `positive/caution/critical/info` 토큰만.
  hex·rgb·hsl 리터럴을 컴포넌트에 직접 쓰지 않는다.
- 간격·크기: Tailwind 기본 spacing 스케일(`p-6`, `gap-10`, `size-16` …)만.
- 글자 크기: 덱 전용 스케일 `text-deck-meta / caption / body / lead / title / hero / numeric`만.
  본문은 `text-deck-body`(28px 이상)가 하한선이다. 그보다 작은 글자는 화면 크롬(파트명·페이지 번호)에만 쓴다.
- 라운드: `rounded-control / card / panel / stage / full`.
- 그림자: `shadow-raised / overlay / lifted`, 파인 면은 `inset-shadow-sunken`.
- 이징: `ease-deck` 하나. 지속시간은 `duration-200 / 300 / 500 / 700`만.
- 새로운 값이 필요하면 **컴포넌트에 임의값을 쓰지 말고 `@theme`에 토큰을 추가**한 뒤 그 토큰을 쓴다.

- 비대칭 레이아웃은 `grid-cols-[1.2fr_1fr]` 같은 임의 템플릿 대신
  `grid-cols-9` + `col-span-5` / `col-span-4` 조합으로 만든다.

> 뷰포트 단위(`h-dvh`, `w-screen`)와 `clamp()`는 토큰 정의(`@theme`) 안에서만 쓴다.
> 컴포넌트에서는 이미 정의된 유틸리티만 조합한다.

---

## 2. 체크리스트

새 화면을 만들거나 고칠 때 아래 3가지를 확인한다.

- [ ] **웬만하면 보더보다는 면을 사용해서 깊이감을 표현하고 공간을 분리한다**
  - 영역을 나눌 때 1순위는 `bg-surface-*` 층 전환, 2순위는 `shadow-*`, 선(`border`)은 최후의 수단이다.
  - 깊이 순서: `surface-sunken` → `surface-base` → `surface-raised` → `surface-overlay`.
    한 화면에서 인접한 두 면은 반드시 다른 층이어야 한다(같은 층끼리 맞대지 않는다).
  - 선을 꼭 써야 할 때는 `border-line-subtle` 수준으로 얇고 조용하게.
- [ ] **정돈된 애니메이션을 사용한다**
  - 이징은 `ease-deck` 하나로 통일하고, 등장은 `animate-rise` / `animate-rise-1~5`로 순서를 만든다.
  - 한 화면에서 동시에 움직이는 요소는 최대 3종류. 무한 반복 모션은 강조 1곳에만(`animate-breathe`).
  - 슬라이드 전환은 위치 이동이 아니라 페이드 + 살짝 떠오르기. 발표 흐름을 방해하지 않는 게 목적이다.
  - `prefers-reduced-motion`을 존중한다(전역 처리되어 있음).
- [ ] **부드러운 곡선으로 처리한다(radius)**
  - 직각 모서리를 쓰지 않는다. 카드 `rounded-card`, 큰 패널 `rounded-panel`, 무대 `rounded-stage`,
    버튼·칩 `rounded-control` 또는 `rounded-full`.
  - 중첩된 요소는 바깥보다 안쪽 반경을 한 단계 작게 잡는다.

---

## 3. 화면 공통 구조

| 영역 | 내용 |
|---|---|
| 상단 | 좌측 파트명(`PART 1 · 개념`), 우측 진행률 바 |
| 본문 | 헤드라인 1줄 + 핵심 3줄 이내. 나머지는 강사가 말로 채운다 |
| 하단 | 이전/다음 버튼, 현재 화면 번호(`6 / 22`) |
| 조작 | `←` `→` `Space`(무선 프리젠터), `P` 프롬프트 공식, `O` 전체 화면 목록, `F` 전체화면 |

포인트 컬러(`accent`)는 한 화면에 한 덩어리만. 키워드 강조 외의 용도로 쓰지 않는다.

> `accent` 면 위에 `Mark`를 얹지 않는다 — `Mark`는 `text-accent`라서 글자가 배경에 먹혀 사라진다.
> 강조가 필요한 문장을 띠로 두려면 `SlideNote tone="quiet"`를 쓴다.

> `flex-col` 패널 안에 `Chip`을 바로 넣으면 `items-stretch`를 물려받아 폭을 다 먹는다.
> `<div className="flex">`로 한 겹 감싼다.

> 코드를 그대로 보여주는 화면은 담는 면에 `overflow-x-auto`, 줄에 `whitespace-pre`를 준다.
> 줄에 배경(선택 상태, diff의 `+`/`-`)이 있으면 `w-fit min-w-full`까지 붙인다 —
> `items-stretch` 폭에 맞춰 잘려서, 가로로 스크롤하면 배경 없는 글자만 남는다.

---

## 4. 덱 사이에 공유하는 자산

두 개 이상의 덱이 **똑같은 것**을 보여줘야 하면 `content/shared/`에 두고 양쪽에서 가져다 쓴다.
사본을 만들면 한쪽만 고쳐지는 순간 수업에서 다른 걸 나눠주게 된다.

- 학습 튜터 프롬프트: `content/shared/model/tutor-prompt.md` — **본문은 이 파일 하나뿐이다.**
  `vibe-coding-first-app`과 `career-and-ai-study`가 이걸 함께 쓴다.
- 복사 버튼: `content/shared/ui/PromptCopyButton.tsx` — **버튼 구현은 이것 하나뿐이다.**
  `label`로 이름을, `text`로 본문을 바꿔 끼운다. `text`를 안 주면 위 튜터 프롬프트가 나간다.
- 덱 하나만 쓰는 것은 그 덱 폴더(`ui/`, `model/`)에 둔다. 프롬프트도 마찬가지다 —
  `code-reading-for-pm/model/coach-prompt.md`처럼 덱 안에 두고 `text`로 넘긴다.
  버튼을 복사해서 새로 만들지 않는다.
- 여러 덱이 함께 쓰는 것은 `content/shared/`, 플레이어와 프리미티브는 `deck/`이 공개한다.

---

## 5. 노트북(세로가 짧은 화면) 대응

`@theme`의 덱 타이포는 **폭(vw)만 보고** 커진다. 그래서 1440x780, 1728x1040처럼
가로는 넉넉하고 세로가 모자란 노트북에서는 글자가 빔프로젝터 크기 그대로 와서
슬라이드마다 스크롤이 생긴다. 대응은 [styles.css](./styles.css)의
`@media (min-width: 64rem) and (max-height: 66rem)` 블록 **한 곳**에서만 한다.

- **타이포**는 `--text-deck-*`를 세로(`vh`) 기준 clamp로 다시 잡는다.
  창이 낮아질수록 매끄럽게 줄어들고, 1080p 풀스크린(세로 1080px)은 이 구간에 들어오지
  않아 강의장 배율이 그대로 유지된다.
- **간격**은 덱 루트(`[data-deck]`)에서 `--spacing`을 `0.25rem → 0.175rem`으로 내린다.
  Tailwind spacing 유틸리티는 전부 `calc(var(--spacing) * n)`이라
  기준값 하나로 `p-*` `gap-*` `size-*`가 한꺼번에 좁아진다. **컴포넌트는 손대지 않는다.**
- **아이콘**은 모바일과 같은 이유로 `[data-deck] svg`에 상한(2rem)을 둔다.
- 이 구간을 더 좁혀야 하면 컴포넌트에 `pt-6` 같은 임의 오프셋을 넣는 대신
  위 두 토큰을 조정하거나, 그 화면의 `Panel pad`를 한 단계 낮춘다.

> 세로 가운데 정렬은 `SlideLayout`의 `grow` + `DeckShell` 래퍼의 `flex min-h-full flex-col`
> 조합으로 산다. `min-h-full`만 걸면 부모 높이가 auto로 풀리는 구간에서 0이 되어
> `justify-center`가 죽고, 내용이 화면 위쪽에 붙는다.

---

## 6. 모바일 대응

강의장 빔프로젝터가 1순위지만, 수강생이 자기 폰으로 같은 주소를 여는 경우가 있다.
`@theme`의 덱 타이포는 "본문 28px 이상" 기준이라 폰에 그대로 오면 한 줄에 대여섯 글자만
들어가서 헤드라인이 5줄이 된다. 그래서 대응은 **토큰 값 재정의 + 크롬 레이아웃 전환** 두 곳에서만 한다.

- **글자 크기는 컴포넌트에서 건드리지 않는다.**
  [styles.css](./styles.css)에 폭별 블록이 있다.
  모바일(`max-width: 47.9375rem`)과 태블릿(`48rem ~ 63.9375rem`)에서 `--text-deck-*`를 다시 잡는다.
  새 화면을 만들 때는 그냥 `text-deck-body` 같은 토큰만 쓰면 세 구간이 자동으로 맞는다.
- **간격은 `모바일값 md:데스크톱값` 쌍으로 쓴다.** 예) `p-5 md:p-10`, `gap-5 md:gap-8`.
  기준선은 `md`(48rem) 하나뿐이다. 2단 → 1단 전환은 기존대로 `lg`(64rem)를 쓴다.
- **lucide 아이콘**은 `size={44}`처럼 픽셀이 박혀 토큰으로 안 잡힌다.
  덱 루트(`data-deck`) 안에서는 모바일일 때 CSS로 상한(1.75rem)을 둔다.
  새로 넣는 아이콘은 가능하면 `size` prop 대신 `className="size-5 md:size-6"`을 쓴다.
- **좁은 화면에서 가로로 삐져나오지 않게**:
  - 인풋은 `w-0 flex-1`. `min-w-0`만으로는 인풋 기본 폭(size 속성)이 min-content로 남아
    부모 칸을 화면 밖으로 밀어낸다.
  - 좌우로 붙인 텍스트 두 덩어리는 `flex-col ... md:flex-row md:justify-between`으로 쌓는다.
  - 헤더 파트명처럼 길이를 예측할 수 없는 한 줄은 `min-w-0` + `truncate`.
- **세로는 잘리지 않고 스크롤되게**: `SlideLayout`은 `h-full`이 아니라 `grow`다.
  `h-full` + `justify-center`는 내용이 화면보다 길 때 위쪽이 스크롤로 닿지 않는 곳으로 밀려난다.
  `grow`는 짧은 화면에서는 남는 높이를 채워 가운데 정렬을 살리고, 내용이 길어지면 그대로 늘어난다.
