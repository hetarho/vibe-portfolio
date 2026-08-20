# 코드베이스 구조 리팩터링 계획

## 1. 결론

현재 구조는 FSD의 **의존 방향을 어긴 상태는 아니다.** `app → pages → widgets/features → entities → shared` 방향은 대체로 지켜지고 있다. 문제는 실제 사용 범위와 레이어의 이름이 맞지 않는다는 점이다.

- `product`, `cart`, `mood-test`는 각각 한 작품 페이지에서만 쓰이는데 전역 도메인처럼 분리돼 있다.
- 반대로 강의의 핵심인 덱 타입, 플레이어, 키보드 제어, 슬라이드 UI가 `features/slide-deck`이라는 범용 레이어에 나가 있다.
- 작품별 스타일도 `app/styles/index.css` 한 파일에 모여 있어 페이지를 열지 않아도 각 작품의 구현 세부사항이 전역 진입점에 노출된다.

따라서 이번 리팩터링의 목표는 FSD 폴더를 더 많이 만드는 것이 아니라 **변경 이유가 같은 코드를 한곳에 모으는 것**이다.

1. 단일 작품에서만 쓰는 데이터·상태·UI·스타일은 해당 `pages` 슬라이스로 되돌린다.
2. 강의 전용 플레이어와 디자인 요소는 `pages/lesson` 내부 모듈로 옮긴다.
3. 정말 여러 페이지가 함께 쓰는 포트폴리오 헤더와 앱 조립 코드는 유지한다.
4. 이동 과정에서는 화면과 동작을 바꾸지 않는다.

이 작업을 마치면 `entities/`와 `features/`는 비게 된다. 빈 레이어를 유지할 이유가 없으므로 디렉터리 자체를 제거한다. FSD는 모든 레이어를 반드시 갖춰야 하는 규칙이 아니다.

---

## 2. 현재 구조 진단

### 2.1 확인한 기준선

- 소스: TypeScript/TSX/CSS 약 7,187줄
- 전역 스타일: `src/app/styles/index.css` 863줄
- 현재 `pnpm lint` 통과
- 현재 `lint` 스크립트는 ESLint가 아니라 `tsc -b`, 즉 타입 검사만 수행
- 자동화된 테스트 스위트는 없음
- Git 작업 트리는 계획서 작성 전 깨끗한 상태

### 2.2 레이어별 판단

| 현재 위치 | 실제 사용 범위 | 판단 | 이유 |
|---|---|---|---|
| `entities/product` | `shop`과 그 장바구니만 사용 | `pages/shop`으로 이동 | 독립 도메인 수명주기나 두 번째 소비자가 없다. 현재 앱에서 상품은 쇼핑몰 작품을 구성하는 목데이터다. |
| `features/cart` | `ShopPage`만 사용 | `pages/shop/ui`로 이동 | 장바구니 상태도 `ShopPage`가 직접 소유한다. 별도 기능 슬라이스로 떼도 재사용이나 독립 흐름이 생기지 않는다. |
| `features/mood-test` | `QuizPage`만 사용 | `pages/quiz/model`로 이동 | 질문과 결과 타입은 퀴즈 작품의 콘텐츠이며 다른 페이지에서 사용하지 않는다. |
| `features/slide-deck` | 강의 관련 파일 23개에서만 사용 | `pages/lesson/deck`으로 이동 | 범용 사용자 기능이 아니라 강의 영역의 핵심 실행 기반이다. 여러 강의가 공유하더라도 `lesson` 밖에서 재사용하지 않는다. |
| `pages/lesson/content/shared` | 두 강의가 공동 사용 | 유지 | 공유 범위가 명확하다. 튜터 프롬프트 원본을 한 곳에서 관리한다는 현재 결정도 옳다. |
| `widgets/portfolio-header` | 작품 3개가 공동 사용 | 유지 | 실제로 여러 페이지가 공유하는 조합형 UI다. 위젯으로 둘 근거가 있다. |
| `app/PortfolioLayout.tsx` | 작품 3개 라우트의 공통 셸 | 유지 | 라우트 조립과 공통 레이아웃은 앱 레이어의 책임에 맞다. |
| `shared/model/navigation.ts` | 앱·목록·헤더·작품 라우팅에서 공동 사용 | 역할을 좁혀 `shared/config`으로 이동 | 재사용 근거는 있지만 `model/navigation`이라는 이름 아래 경로, 타입, 카드 표시 정보가 섞여 있다. |
| `app/styles/index.css` | 전역 토큰 + 헤더 + 작품 3종 + 강의 반응형 규칙 | 책임별 분리 | 앱 진입 스타일이 모든 페이지 구현을 소유하고 있어 페이지 단위 변경과 삭제가 어렵다. |

### 2.3 구조상 핵심 문제

#### A. 재사용되지 않는 추상화

`entities/product`, `features/cart`, `features/mood-test`에는 각각 사실상 한 소비자만 있다. 폴더와 public API가 추가됐지만 결합도는 낮아지지 않았고, 한 작품을 수정할 때 세 레이어를 오가게 됐다.

특히 `CartDrawer`는 `Product`와 `ProductArt`에 직접 의존하고 장바구니 상태는 `ShopPage`가 들고 있다. 현재 경계는 기능의 독립성을 만든 것이 아니라 한 페이지의 구현을 물리적으로 나눠 놓은 상태다.

#### B. 강의의 중심 코드가 강의 밖에 있음

`features/slide-deck`은 이름과 달리 앱 전체 기능이 아니다. 다음 요소가 모두 강의에만 종속돼 있다.

- `DeckDef`, `SlideDef`, `SlideProps`
- URL 인덱스와 연결되는 `DeckShell`
- 발표자 키보드·전체화면 조작
- 슬라이드 목록 오버레이
- `SlideLayout`, `Panel`, `Chip`, `Mark` 등 강의 디자인 프리미티브
- 강의용 체크리스트와 타이머

새 강의를 만들 때 `pages/lesson/content`와 전역 `features/slide-deck`을 함께 알아야 하므로 응집도가 떨어진다.

#### C. 전역 CSS가 페이지 경계를 무효화함

`app/styles/index.css` 안에는 다음이 한 파일에 이어져 있다.

- 전역 폰트·색·면·모션 토큰과 reset
- 강의 전용 타이포 및 `[data-deck]` 반응형 규칙
- 포트폴리오 헤더
- Studio 전용 스타일
- Shop 및 Cart 전용 스타일
- Quiz 전용 스타일
- 세 작품의 모바일 미디어 쿼리

TSX를 페이지에 모아도 스타일 수정은 계속 앱 레이어에서 해야 한다. 작품 하나를 제거할 때 관련 CSS를 찾아 수동으로 걷어내야 하는 구조다.

#### D. `shared`에 서로 다른 종류의 정보가 섞임

`shared/model/navigation.ts`는 라우트 경로뿐 아니라 목록 카드의 `summary`, `swatch`, `stack`까지 담는다. 경로와 공통 식별자는 여러 소비자가 쓰지만 카드 설명은 `portfolio-index`만 쓴다. 공통 설정과 화면 전용 표시 모델을 분리해야 한다.

#### E. 레이어 이름을 내부 폴더명으로 다시 사용함

`pages/lesson/content/vibe-coding-first-app/widgets/MenuRoulette.tsx`의 `widgets`는 FSD 최상위 레이어와 혼동된다. 이 컴포넌트는 한 강의에서만 쓰므로 해당 강의의 `ui`가 더 정확하다.

---

## 3. 목표 구조

아래 구조는 현재 규모에 맞춘 최종안이다. 핵심은 작품별 수직 응집과 `lesson` 내부의 명시적인 덱 모듈이다.

```text
src/
├── app/
│   ├── PortfolioLayout.tsx          # 공통 라우트 셸, 유지
│   ├── router.tsx                   # 라우트 선언과 페이지 조립만 담당
│   └── styles/
│       ├── index.css                # Tailwind 진입점
│       ├── theme.css                # 앱 공통 토큰
│       └── base.css                 # reset, 공통 접근성 규칙
├── pages/
│   ├── home/
│   ├── portfolio-index/
│   │   ├── model/projects.ts        # 목록에서만 쓰는 summary/swatch/stack
│   │   └── ui/PortfolioIndexPage.tsx
│   ├── studio/
│   │   ├── ui/StudioPage.tsx
│   │   └── styles.css
│   ├── shop/
│   │   ├── model/
│   │   │   ├── product.ts
│   │   │   └── products.ts
│   │   ├── ui/
│   │   │   ├── ShopPage.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── ProductArt.tsx
│   │   └── styles.css
│   ├── quiz/
│   │   ├── model/questions.ts
│   │   ├── ui/QuizPage.tsx
│   │   └── styles.css
│   └── lesson/
│       ├── index.ts                 # 라우터가 쓰는 페이지만 공개
│       ├── model/
│       │   └── registry.ts
│       ├── ui/
│       │   ├── LessonSelectPage.tsx
│       │   └── LessonDeckPage.tsx
│       ├── deck/                    # lesson 내부에서만 쓰는 플레이어 모듈
│       │   ├── index.ts             # 강의 콘텐츠용 내부 public API
│       │   ├── model/
│       │   │   ├── types.ts
│       │   │   └── useDeckKeyboard.ts
│       │   └── ui/
│       │       ├── DeckShell.tsx
│       │       ├── SlideOverview.tsx
│       │       ├── primitives.tsx
│       │       ├── CheckRow.tsx
│       │       └── CountdownTimer.tsx
│       ├── content/
│       │   ├── shared/              # 현재 튜터 프롬프트와 복사 UI 유지
│       │   ├── vibe-coding-first-app/
│       │   └── career-and-ai-study/
│       ├── styles.css               # 덱 타이포, data-deck, 덱 전용 모션
│       └── DESIGN.md
├── widgets/
│   └── portfolio-header/
│       ├── index.ts
│       ├── ui/PortfolioHeader.tsx
│       └── styles.css
└── shared/
    └── config/
        └── portfolio.ts             # 공통 id/label/number/path/order
```

`entities/`와 `features/`는 삭제한다. 이후 실제로 두 개 이상의 상위 소비자가 생기거나 독립적인 상태·API·수명주기가 생길 때만 다시 도입한다.

---

## 4. 목표 의존 규칙

1. `app`은 라우트와 레이아웃을 조립하고 `pages`, `widgets`, `shared`의 public API만 사용한다.
2. `pages/shop`은 상품·장바구니 구현을 모두 소유한다. 다른 작품 페이지는 이를 가져다 쓰지 않는다.
3. `pages/quiz`는 질문, 답 타입, 결과 계산에 필요한 모델을 소유한다.
4. `pages/lesson/content/**`는 `pages/lesson/deck/index.ts`가 공개한 강의 프리미티브만 사용한다.
5. `lesson` 바깥에서는 `lesson/deck`을 직접 import하지 않는다.
6. 같은 페이지 슬라이스 내부에서는 상대 경로 또는 슬라이스 내부 facade를 사용한다. 자기 자신을 `@/pages/...`로 우회 import하지 않는다.
7. 다른 슬라이스는 해당 슬라이스의 최상위 `index.ts`만 사용한다. 내부 `model`이나 `ui`로 deep import하지 않는다.
8. `shared`에는 특정 화면만 쓰는 문구·색상·카드 표현을 두지 않는다. 여러 라우트가 실제로 공유하는 식별자와 경로 설정만 둔다.
9. 타입이나 파일 이름에 명사가 등장한다는 이유만으로 `entities`를 만들지 않는다.

### 추출 기준

다음 중 하나가 확인될 때만 페이지 밖으로 추출한다.

- 서로 다른 페이지 슬라이스 두 곳 이상에서 실제 사용한다.
- 독립적인 서버 API, 캐시, 상태, 권한 또는 생명주기가 있다.
- 페이지 없이도 의미가 있는 사용자 행동 단위다.
- 조합형 UI가 여러 페이지에서 반복되고 자체 레이아웃 책임이 있다.

“나중에 쓸 수도 있음”은 추출 근거로 보지 않는다.

---

## 5. 파일 이동표

| 현재 | 목표 | 비고 |
|---|---|---|
| `entities/product/model/types.ts` | `pages/shop/model/product.ts` | `Product` 타입 유지 |
| `entities/product/model/mock.ts` | `pages/shop/model/products.ts` | `mock`보다 실제 역할이 드러나는 이름 사용 |
| `entities/product/ui/ProductArt.tsx` | `pages/shop/ui/ProductArt.tsx` | Shop 내부 상대 import로 변경 |
| `features/cart/ui/CartDrawer.tsx` | `pages/shop/ui/CartDrawer.tsx` | 상태 소유권은 계속 `ShopPage`에 둠 |
| `features/mood-test/model/questions.ts` | `pages/quiz/model/questions.ts` | `QuizValue`도 함께 이동 |
| `features/slide-deck/**` | `pages/lesson/deck/**` | 기능 변경 없이 기계적으로 이동 후 import 수정 |
| `content/vibe-coding-first-app/widgets/MenuRoulette.tsx` | `content/vibe-coding-first-app/ui/MenuRoulette.tsx` | 내부 `widgets` 명칭 제거 |
| `shared/model/navigation.ts` | `shared/config/portfolio.ts` + `pages/portfolio-index/model/projects.ts` | 공통 라우트 정보와 목록 전용 표시 정보 분리 |
| `app/styles/index.css`의 헤더 블록 | `widgets/portfolio-header/styles.css` | 위젯이 직접 import |
| `app/styles/index.css`의 Studio 블록 | `pages/studio/styles.css` | 해당 페이지가 직접 import |
| `app/styles/index.css`의 Shop/Cart 블록 | `pages/shop/styles.css` | 상품 이미지·드로어 스타일 포함 |
| `app/styles/index.css`의 Quiz 블록 | `pages/quiz/styles.css` | 퀴즈 반응형 규칙 포함 |
| 강의 전용 토큰·반응형·모션 | `pages/lesson/styles.css` | 공통 surface 토큰과 분리 |

---

## 6. 단계별 실행 계획

각 단계는 별도 커밋이 가능한 크기로 진행한다. 경로 이동과 동작 변경을 한 커밋에 섞지 않는다.

### 0단계 — 기준선 고정

- 현재 `pnpm lint`와 `pnpm build` 결과를 기록한다.
- 아래 8개 진입 URL을 데스크톱과 모바일 폭에서 캡처하거나 체크리스트로 남긴다.
  - `/`
  - `/vibe-portfolio`
  - `/vibe-portfolio/studio`
  - `/vibe-portfolio/shop`
  - `/vibe-portfolio/quiz`
  - `/lesson`
  - `/lesson/vibe-coding-first-app?s=1`
  - `/lesson/career-and-ai-study?s=1`
- 리팩터링 중 텍스트, 클래스명, 상태 구조, URL 계약을 바꾸지 않는 것을 원칙으로 정한다.

완료 조건: 현재 동작과 비교할 기준이 있고 타입 검사와 빌드가 통과한다.

### 1단계 — 단일 작품 전용 레이어를 페이지로 회수

#### Shop

1. 상품 타입과 목데이터를 `pages/shop/model`로 이동한다.
2. `ProductArt`, `CartDrawer`를 `pages/shop/ui`로 이동한다.
3. `ShopPage`와 `CartDrawer`의 import를 페이지 내부 상대 경로로 바꾼다.
4. `entities/product`, `features/cart`의 barrel export를 제거한다.

#### Quiz

1. 질문과 `QuizValue`를 `pages/quiz/model/questions.ts`로 이동한다.
2. `QuizPage`가 로컬 모델을 import하도록 바꾼다.
3. `features/mood-test`를 제거한다.

완료 조건: Shop과 Quiz가 `entities` 또는 `features`를 import하지 않고 기존 인터랙션이 동일하다.

### 2단계 — 강의 덱 엔진을 `lesson` 내부로 이동

1. `features/slide-deck`을 먼저 내용 변경 없이 `pages/lesson/deck`으로 이동한다.
2. `deck/index.ts`에 강의 콘텐츠가 필요한 타입과 UI만 export한다.
3. 강의 콘텐츠 23개 파일의 `@/features/slide-deck` import를 lesson 내부 facade로 교체한다.
4. `LessonDeckPage`와 `registry.ts`도 lesson 내부 덱 모듈을 사용하게 한다.
5. `MenuRoulette`를 해당 강의의 `ui`로 옮긴다.
6. 외부 라우터가 사용하는 `pages/lesson/index.ts`에서는 덱 내부 구현을 export하지 않는다.
7. 남은 `features/slide-deck` 폴더를 삭제한다.

완료 조건:

- `rg "@/features|@/entities" src` 결과가 0건이다.
- 강의 추가 작업이 `pages/lesson` 밖의 파일을 요구하지 않는다.
- 키보드 이동, 전체 목록, 전체화면, 단축키, URL의 `?s=` 동기화가 그대로 동작한다.

### 3단계 — 포트폴리오 설정의 책임 정리

1. `Page`를 의미가 분명한 `PortfolioPageId`로 이름을 바꾼다.
2. 여러 소비자가 쓰는 `id`, `label`, `number`, `path`, 순서, `portfolioRootPath`, 경로 판별 함수는 `shared/config/portfolio.ts`에 둔다.
3. 목록에서만 쓰는 `summary`, `swatch`, `stack`은 `pages/portfolio-index/model/projects.ts`로 옮긴다.
4. `StudioPage`는 범용 `onNavigate(page)` 대신 실제로 필요한 `onNext()`를 받게 해 공통 페이지 타입 의존을 제거한다.
5. `main.tsx`의 레거시 주소 변환은 새 공통 경로 설정을 사용한다.

완료 조건: `shared`에는 특정 카드에서만 쓰는 표현 정보가 없고, 라우트 문자열은 중복되지 않는다.

### 4단계 — CSS를 소유자 가까이 분리

안전하게 두 번에 나눠 진행한다.

#### 4-1. 작품·위젯 CSS 이동

1. 기존 셀렉터와 선언을 수정하지 않고 Header, Studio, Shop, Quiz 블록만 각각의 `styles.css`로 옮긴다.
2. 각 페이지 또는 위젯 진입 컴포넌트가 자기 스타일을 한 번만 import하게 한다.
3. `900px`, `600px` 미디어 쿼리 안에 섞인 규칙도 소유 페이지 파일로 함께 이동한다.
4. Tailwind v4의 `@apply`가 분리된 CSS에서도 공통 테마를 보도록 필요하면 `@reference`를 사용한다.

#### 4-2. 전역 토큰과 강의 토큰 분리

1. 앱 공통 surface/content/accent/radius/shadow 토큰은 `app/styles/theme.css`에 둔다. Home과 포트폴리오 목록도 이 토큰을 사용하므로 강의 전용으로 이동하지 않는다.
2. `deck-*` 타이포, `[data-deck]` 화면 높이·폭 대응, 덱 전용 아이콘 상한은 `pages/lesson/styles.css`로 옮긴다.
3. `rise`처럼 Home/목록에서도 쓰는 모션은 공통에 남기고, 강의에서만 쓰는 모션만 lesson으로 이동한다.
4. `app/styles/index.css`는 Tailwind 진입 및 공통 파일 import 역할만 남긴다.

완료 조건: 작품 하나의 스타일을 수정하거나 제거할 때 `app/styles/index.css`를 열 필요가 없다.

### 5단계 — 문서와 경계 검증

1. `README.md`의 구조 설명을 새 구조에 맞춘다.
2. `src/pages/lesson/DESIGN.md`에서 덱 토큰 및 플레이어 경로를 갱신한다.
3. 새 강의 추가 절차를 “`pages/lesson` 안에서만 끝나는 작업”으로 다시 확인한다.
4. `rg` 기반 검사를 실행한다.

```bash
rg "@/entities|@/features" src
rg "@/pages/.+/(model|ui|deck)" src/app src/widgets src/shared
rg "shared/model/navigation" src
```

첫 번째와 세 번째 명령은 결과가 없어야 한다. 두 번째는 상위 레이어의 페이지 deep import를 찾기 위한 검사이며, 발견 시 페이지 public API로 바꾼다.

완료 조건: 문서와 실제 경로가 일치하고, 삭제된 레이어나 옛 경로를 가리키는 설명이 없다.

---

## 7. 회귀 검증표

### 자동 검증

- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] 이전 경로 import 검색 결과 0건
- [ ] 사용되지 않는 빈 `entities/`, `features/` 디렉터리 없음
- [ ] 각 외부 슬라이스 접근은 public API를 통함

현재 자동 테스트가 없으므로 구조 이동 PR에서 새 테스트 도구까지 동시에 도입하지 않는다. 아래 수동 검증을 우선 수행하고, 테스트 도구 도입은 별도 작업으로 분리한다.

### 공통 라우팅

- [ ] 첫 화면에서 포트폴리오와 강의로 각각 진입
- [ ] 포트폴리오 목록에서 작품 3개 진입
- [ ] 작품 공통 헤더의 active 상태와 모바일 메뉴
- [ ] `#/studio`, `#/shop`, `#/quiz`, `/shop`, `/quiz` 레거시 주소 이동
- [ ] 없는 경로의 404 화면
- [ ] `/lesson` 이하 `noindex, nofollow` 유지

### Studio

- [ ] 프로젝트 영역 스크롤
- [ ] 문의 모달 열기·닫기·백드롭 닫기
- [ ] NEXT PROJECT로 Shop 이동

### Shop

- [ ] 카테고리와 검색 조합 필터
- [ ] 찜 토글
- [ ] 장바구니 추가 시 드로어 열림
- [ ] 중복 상품, 항목 삭제, 총액 계산
- [ ] 모바일 1열 상품 목록과 드로어

### Quiz

- [ ] 시작, 4문항 선택, 이전 문항
- [ ] 두 결과 분기
- [ ] 다시 하기와 링크 복사
- [ ] 모바일 질문·결과 레이아웃

### Lesson

- [ ] `←`, `→`, `Space`, `PageUp`, `PageDown` 이동
- [ ] `O` 전체 목록, `F` 전체화면, 덱별 단축키
- [ ] 입력 요소 사용 중 키보드 이동이 발생하지 않음
- [ ] `?s=` 새로고침 복원과 범위 보정
- [ ] 잘못된 `lessonId` 안내 화면
- [ ] 튜터 프롬프트 복사
- [ ] 아이디어·적성검사 localStorage 상태
- [ ] 데스크톱, 낮은 노트북, 태블릿, 모바일 레이아웃

---

## 8. 위험 요소와 대응

| 위험 | 대응 |
|---|---|
| 대량 import 변경 중 누락 | 한 번에 전체 구조를 옮기지 않고 Shop/Quiz와 Lesson을 별도 단계로 나눈다. 각 단계마다 `pnpm lint`를 실행한다. |
| CSS 분리 후 Tailwind `@apply`가 토큰을 찾지 못함 | 구조 이동과 CSS 이동을 분리한다. 공통 테마를 `@reference`하고 프로덕션 빌드 결과를 확인한다. |
| CSS import 순서가 바뀌어 cascade가 달라짐 | 첫 CSS 이동에서는 셀렉터와 선언을 수정하지 않는다. 페이지별 시각 비교 후에만 정리한다. |
| `lesson/index.ts`와 콘텐츠 사이 순환 의존 | 라우터용 최상위 public API와 콘텐츠용 `lesson/deck/index.ts`를 분리한다. lesson 내부에서 자기 최상위 barrel을 import하지 않는다. |
| 라우트 문자열 이동 중 레거시 리다이렉트 손상 | 공통 경로 설정을 먼저 만든 뒤 router, layout, main 순서로 소비자를 교체한다. |
| 리팩터링 도중 기능 개선이 섞임 | 파일 이동 단계에서는 상태 모양, 컴포넌트 props, CSS 클래스, 문구를 유지한다. 개선은 후속 PR로 분리한다. |

---

## 9. 이번 작업에서 하지 않을 것

- Studio, Shop, Quiz의 디자인 통일
- 강의 슬라이드 콘텐츠나 순서 변경
- 상태 관리 라이브러리 도입
- 파일 기반 라우팅으로 전환
- 서버 API 또는 영속 저장소 도입
- 모든 컴포넌트를 작은 파일로 쪼개기
- “FSD 모양을 맞추기 위한” 새 entity/feature 생성
- CSS Module 전환이나 클래스명 전면 변경
- 테스트 프레임워크 도입

이 항목들은 구조 이동의 회귀 범위를 키우므로 별도 필요가 생길 때 진행한다.

---

## 10. 최종 완료 기준

- [ ] 작품별 구현은 각 `pages/studio`, `pages/shop`, `pages/quiz` 안에서 찾을 수 있다.
- [ ] 상품·장바구니·퀴즈 때문에 `entities`나 `features`를 열 필요가 없다.
- [ ] 강의 목록, 플레이어, 슬라이드 프리미티브, 콘텐츠가 모두 `pages/lesson` 아래에 있다.
- [ ] 두 강의가 공유하는 튜터 프롬프트 원본은 계속 하나다.
- [ ] 공통 포트폴리오 헤더는 위젯으로 유지된다.
- [ ] 앱 레이어에는 라우팅·전역 테마·공통 조립만 남는다.
- [ ] `pnpm lint`와 `pnpm build`가 통과한다.
- [ ] 기존 URL, 인터랙션, 반응형 레이아웃에 회귀가 없다.
- [ ] README와 DESIGN 문서가 실제 구조를 설명한다.

이 기준을 만족하면 현재 프로젝트에는 **`app + pages + widgets + shared` 네 레이어만 남는 단순한 구조**가 된다. 지금 규모와 실제 재사용 관계에는 이 구성이 가장 적절하다.
