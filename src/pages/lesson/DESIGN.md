# 강의(lesson) 디자인 지침

`/lesson` 이하 모든 화면에 적용된다. 강의장 빔프로젝터에 띄워놓고 강사가 말로 진행하는
프레젠테이션형 화면이므로, "맨 뒷자리에서 읽히는가"가 모든 판단의 기준이다.

토큰 정의는 [src/app/styles/index.css](../../app/styles/index.css)의 `@theme` 블록에 있다.

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

---

## 4. 모바일 대응

강의장 빔프로젝터가 1순위지만, 수강생이 자기 폰으로 같은 주소를 여는 경우가 있다.
`@theme`의 덱 타이포는 "본문 28px 이상" 기준이라 폰에 그대로 오면 한 줄에 대여섯 글자만
들어가서 헤드라인이 5줄이 된다. 그래서 대응은 **토큰 값 재정의 + 크롬 레이아웃 전환** 두 곳에서만 한다.

- **글자 크기는 컴포넌트에서 건드리지 않는다.**
  [index.css](../../app/styles/index.css)의 `@theme` 아래에 폭별 블록이 있다.
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
- **세로는 잘리지 않고 스크롤되게**: `SlideLayout`은 `h-full`이 아니라 `min-h-full`이다.
  `h-full` + `justify-center`는 내용이 화면보다 길 때 위쪽이 스크롤로 닿지 않는 곳으로 밀려난다.
