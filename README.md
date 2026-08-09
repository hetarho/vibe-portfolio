# VIBE Portfolio

회사 소개, 라이프스타일 쇼핑몰, 성향 퀴즈를 하나의 포트폴리오에서 보여주는 Vite + React 프로젝트입니다. 데이터는 모두 프론트엔드 목데이터로 구성되어 있습니다.

## 실행

```bash
pnpm install
pnpm dev
```

프로덕션 빌드는 `pnpm build`, 타입 검사는 `pnpm lint`로 확인할 수 있습니다.

## 구조

```text
src/
├── app/                  # 앱 진입점, 글로벌 Tailwind 스타일
├── pages/                # studio, shop, quiz 페이지 조합
├── widgets/              # 포트폴리오 공통 헤더
├── features/             # 장바구니, 성향 테스트
├── entities/             # 상품 타입, 목데이터, UI
└── shared/               # 공통 내비게이션 모델
```

FSD의 상위 레이어가 하위 레이어를 참조하는 의존 방향을 따릅니다. 각 세그먼트의 `index.ts`를 public API로 사용합니다.

## 포함된 인터랙션

- 해시 기반 프로젝트 전환 및 반응형 모바일 메뉴
- 회사 소개 프로젝트 스크롤, 문의 모달
- 쇼핑몰 카테고리/검색/찜/장바구니 담기와 삭제
- 4문항 성향 테스트, 결과 분기, 재시작과 링크 복사

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
