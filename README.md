# VIBE Portfolio

회사 소개, 라이프스타일 쇼핑몰, 성향 퀴즈를 하나의 포트폴리오에서 보여주는 Vite + React 프로젝트입니다. 데이터는 모두 프론트엔드 목데이터로 구성되어 있습니다.
같은 사이트에 1대1 수업용 강의 발표 화면도 함께 들어 있습니다.

## 실행

```bash
pnpm install
pnpm dev
```

개발 서버와 `pnpm preview`는 모두 **3030** 포트로 고정되어 있습니다 (`vite.config.ts`).
프로덕션 빌드는 `pnpm build`, 타입 검사는 `pnpm lint`로 확인할 수 있습니다.

## 라우팅

TanStack Router(코드 기반 라우트, `src/app/router.tsx`)를 사용합니다.

| 경로 | 화면 |
|---|---|
| `/` | 첫 화면 — 포트폴리오 / 강의 갈림길 |
| `/vibe-portfolio` | 포트폴리오 3종 목록 |
| `/vibe-portfolio/studio` | 브랜드 스튜디오 |
| `/vibe-portfolio/shop` | 라이프 숍 |
| `/vibe-portfolio/quiz` | 취향 퀴즈 |
| `/lesson` | 강의 선택 |
| `/lesson/:lessonId?s=1` | 강의 발표 모드 |

`/lesson` 이하에는 `noindex, nofollow`가 붙어 검색엔진에 잡히지 않습니다.

예전 주소(`#/shop`, `/shop`, `/quiz`)로 들어오면 `src/main.tsx`가 지금 경로로 바꿔 줍니다.

> 정적 호스팅에 올릴 때는 모든 경로를 `index.html`로 되돌리는 SPA fallback 설정이 필요합니다.

## 구조

```text
src/
├── app/                  # 앱 진입점, 라우터, 글로벌 Tailwind 스타일
├── pages/                # home(첫 화면), portfolio-index(목록), studio, shop, quiz, lesson
│   └── lesson/           # DESIGN.md · 강의 목록 · 슬라이드 콘텐츠
├── widgets/              # 포트폴리오 공통 헤더
├── features/             # 장바구니, 성향 테스트, 슬라이드 덱 엔진
├── entities/             # 상품 타입, 목데이터, UI
└── shared/               # 공통 내비게이션 모델
```

FSD의 상위 레이어가 하위 레이어를 참조하는 의존 방향을 따릅니다. 각 세그먼트의 `index.ts`를 public API로 사용합니다.

## 강의 화면 (`/lesson`)

강사가 빔프로젝터에 띄워놓고 진행하는 프레젠테이션형 화면입니다.

- 조작: `←` `→` `Space` 이동, `P` 프롬프트 공식으로 점프, `O` 전체 목록, `F` 전체화면
- 현재 화면 번호가 `?s=` 로 주소에 남아 새로고침해도 위치를 유지합니다
- 디자인 규칙과 체크리스트: [src/pages/lesson/DESIGN.md](src/pages/lesson/DESIGN.md)
- 새 강의 추가: `src/pages/lesson/content/`에 덱을 만들고 `model/registry.ts`에 한 줄 추가

## 포함된 인터랙션

- TanStack Router 기반 프로젝트 전환 및 반응형 모바일 메뉴
- 회사 소개 프로젝트 스크롤, 문의 모달
- 쇼핑몰 카테고리/검색/찜/장바구니 담기와 삭제
- 4문항 성향 테스트, 결과 분기, 재시작과 링크 복사

## 글꼴

전역 기본 글꼴은 [Wanted Sans](https://github.com/wanteddev/wanted-sans) Variable입니다.
런타임 CDN 의존성이 없도록 웹폰트를 `public/fonts/wanted-sans/`에 내려두고
`index.html`에서 서브셋 CSS를 불러옵니다. Tailwind의 `--font-sans` 토큰이 이 글꼴을 가리키므로,
`font-sans`를 쓰는 모든 화면이 자동으로 적용받습니다.

- 라이선스: SIL Open Font License 1.1 (`public/fonts/wanted-sans/LICENSE.txt`)
- 유니코드 범위별로 92개 서브셋으로 쪼개져 있어, 화면에 실제로 쓰인 글자에 해당하는 파일만 내려받습니다
- `font-display: swap` + 라틴 서브셋 `preload`로 첫 화면에서 글자가 늦게 뜨는 구간을 줄였습니다

브랜드 스튜디오·라이프 숍의 압축 헤드라인만 예외로 `font-display`(Arial Narrow)를 그대로 씁니다.

## 이미지 출처

모든 사진은 상업·비상업 용도로 무료 사용 가능한 [Unsplash License](https://unsplash.com/license) 이미지이며, 런타임 네트워크 의존성이 없도록 `public/images`에 저장했습니다.

- 히어로 세라믹 — [Tom Crew](https://unsplash.com/photos/two-white-ceramic-bowls-and-bottle-on-white-table-NLcLjLNUJbY)
- 플로어 램프 — [mk. s](https://unsplash.com/photos/a-lamp-sitting-next-to-a-couch-in-a-room-3LdrBCdUqVA)
- 세라믹 화병 — [WARION Taipei](https://unsplash.com/photos/minimalist-photography-of-two-white-ceramic-vases-8QIAj5tHDdc)
- 라운지 체어 — [Fujiphilm](https://unsplash.com/photos/green-chair-in-a-colorful-room-with-plants-8HEGITOFEuw)
- 머그 세트 — [Mary Potoplyak](https://unsplash.com/photos/Iy5snvY2ZfA)
- 우드 트레이 — [Adil Murshed](https://unsplash.com/photos/decorations-on-a-wooden-tray-with-a-candle-and-plant-2DBvJvSEhiE)
- 니트 블랭킷 — [Lori B](https://unsplash.com/photos/a-chair-with-a-blanket-on-top-of-it-2ZE8REkSCaE)
- 브랜드 스토리 화병 — [Anh Lam](https://unsplash.com/photos/white-ceramic-vase-with-flowers-ogqEE42qdK0)
# vibe-portfolio
