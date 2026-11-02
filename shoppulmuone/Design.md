# Shop Pulmuone Renewal — Design System

> 기준: `bsw080902/firstclass` 저장소 `main/shoppulmuone`의 기존 메인페이지(2026-11-02 확인). 서브페이지 제작을 위한 **현재 구현 기반** 가이드이며 메인페이지 변경 지시가 아니다.
>
> 확인 파일: [index.html](./index.html), [css/variables.css](./css/variables.css), [css/main.css](./css/main.css), `img/` 에셋. JS는 별도 폴더가 아니라 `index.html` 내부 `<script>`에 존재한다. 공통 초기화 스타일과 Pretendard, Swiper는 한 단계 위 폴더의 `../css/default.css`, `../font/css/pretendardvariable.css`, `../npm/swiper/`를 참조한다.
>
> **근거 표시:** **[확인]** 코드·콘텐츠에서 직접 확인한 내용 / **[해석]** 구성에 기반한 디자인 의도 / **[서브페이지 적용]** 앞으로 사용할 규칙. 브라우저 실기기 렌더링 및 모든 동작 검증을 완료했다는 의미는 아니다. CSS는 중복 선언이 있어 **파일 후반 규칙 및 미디어쿼리 우선순위**를 함께 확인해야 한다.

## 1. Project Overview — 사이트 목적 및 디자인 방향

- **[확인]** 문서 제목은 `샵풀무원리뉴얼포트폴리오`. 메인페이지는 HERO 배너 → 6개 빠른 메뉴 → PULMUONE'S PICK 추천상품 → BEST → NEW → 일일배달 → BENEFITS → BRAND → Footer 순으로 구성된다.
- **[해석]** 상품 탐색·혜택 확인·브랜드별 탐색 및 장바구니 이동을 돕는 쇼핑몰형 리뉴얼. 브랜드의 자연·신선 이미지를 녹색 계열, 식품 사진, 부드러운 모서리로 전달한다.
- **[서브페이지 적용]** 공통 헤더/푸터·색·타이포·카드·액션 상태를 유지하면서 페이지별 목적(상품 목록, 상세, 혜택 등)을 명확히 표현한다. 메인에만 필요한 대형 HERO 또는 섹션별 배너를 모든 서브페이지에 강제로 복제하지 않는다.
- **링크 정책:** 기존 브랜드 운영 사이트로 이동시키지 않는다. 홈은 현재와 같이 프로젝트 내부 `index.html`로 이동한다. 서브페이지는 나중에 만드는 **프로젝트 내부 상대경로**로 연결하고 목적지가 아직 없으면 `#`를 임시로 사용하되 기능이 완성된 링크처럼 소개하지 않는다. 기존 `href="#"`는 연결 기능이 완성되었다는 뜻이 아니다.

## 2. Brand Identity — 브랜드 특성과 시각적 정체성

- **[확인]** `img/pulmuone_logo.svg`를 헤더·푸터에 사용하고, Pretendard Variable을 본문 글꼴로 사용한다.
- **[확인]** 짙은 녹흑색 텍스트와 브랜드 그린, 라임색 활성 표시, 흰색 및 연한 녹색 면을 조합한다. 상품 사진과 이벤트 이미지가 시각적 중심이다.
- **[해석]** 친근하면서 신뢰도 높은 식품 커머스 분위기. 자연스러운 녹색 톤과 라운드 UI가 일관성을 만드는 핵심이다.
- **[서브페이지 적용]** 로고 파일과 실제 사용된 녹색 팔레트를 유지한다. 제품·카테고리 정보는 이미지보다 읽기 어렵게 만들지 말고 가격·구매 행동은 구분한다.

## 3. Design Principles — 설계 의도 및 핵심 원칙

1. **정보 우선순위:** 섹션별 작은 녹색 eyebrow → 굵은 제목 → 상품·이벤트 내용 → 더보기/CTA. 서브페이지에서는 제목과 현재 위치, 핵심 조작을 먼저 제공한다.
2. **일관된 탐색:** 공통 헤더 검색·카테고리·GNB·액션 아이콘과 모바일 하단 메뉴 유지.
3. **사진 중심 카드:** 정사각형 상품 이미지, 아래에 브랜드명·상품명·배송·가격, 필요한 곳에 찜·장바구니.
4. **선택과 피드백:** hover만 아니라 `:focus-within`, `:focus-visible`, `.is-active`, `aria-pressed`를 활용한다.
5. **반응형 적응:** PC의 가로 배열/슬라이더를 작은 화면에서 축소·스크롤 또는 세로 적층으로 변형한다.
6. **움직임 배려:** `prefers-reduced-motion: reduce` 대응을 이어간다.
7. **범위 구분:** 이 문서는 기존 디자인의 관찰 결과다. 아직 없는 컴포넌트나 임의 숫자를 '기존 규칙'이라고 정의하지 않는다.

## 4. Color System — 실제 컬러 코드 및 용도

### 4.1 CSS Primitive Tokens — `css/variables.css`에 정의됨

| 변수명 | 실제 HEX | 적용 의미 |
|---|---|---|
| `--brand-green` | `#009333` | 핵심 브랜드 컬러, 링크/제목 강조, 선택 상태 |
| `--brand-lime` | `#80c342` | 보조 브랜드 라임 |
| `--neutral-white` | `#ffffff` | 기본 흰색 면 |
| `--neutral-soft-green` | `#f5f8f3` | 연녹색 배경 |
| `--neutral-dark-green-black` | `#202820` | 주요 텍스트 |
| `--neutral-muted-gray` | `#68756a` | 보조 설명 텍스트 |
| `--green-pale-green` | `#e8f4df` | 일일배달 등 연녹색 강조 면 |
| `--neutral-light-gray-green` | `#dde5dc` | 테두리 |

### 4.2 Semantic Aliases — CSS에 정의된 실제 매핑

- `--bg-default: var(--neutral-white)` — 기본 페이지 배경.
- `--bg-surface: var(--neutral-soft-green)` — 구분된 연한 면.
- `--bg-accent: var(--neutral-soft-green)` — 빠른 메뉴의 아이콘 배경.
- `--action-primary: var(--brand-green)` — CTA 테두리·문자·활성 배경.
- `--brand-secondary: var(--brand-lime)` — 보조 브랜드 색.
- `--text-primary: var(--neutral-dark-green-black)` — 제목·본문.
- `--text-secondary: var(--neutral-muted-gray)` — 보조 설명.
- `--border-default: var(--neutral-light-gray-green)` — 기본 선.

**[서브페이지 적용]** 새로 CSS를 작성할 때는 의미 기반 alias를 우선 사용한다. 현재 메인 CSS에는 같은 계열의 **직접 지정 색상**도 다수 남아 있으므로, 이 값들을 변수와 완전히 동일하다고 단정하거나 기존 파일을 일괄 치환하지 않는다.

### 4.3 메인 CSS·인라인 JS의 추가 실사용 색상(변수 미정의)

| 실제 값 | 사용 예 |
|---|---|
| `#80c441` | 브랜드 탭 활성 배경, 푸터 상단 바 — 토큰 `#80c342`와 **다름** |
| `#f04452` | 추천/BEST 할인율 표시 |
| `#dce8dc` | BEST 페이지 표시 점의 기본색 |
| `#009b3a` | BEST 자동재생 페이지 표시 진행색(JS) — 브랜드 그린과 **다름** |
| `#f7faf5` | 푸터 본문 배경 |
| `#e0e8df` | 카테고리 메뉴 테두리 |
| `#858585`, `#888` | 상품 브랜드·배송 보조 문구 |
| `#f6f6f6`, `#f7f7f7` | 상품 이미지 배경 |
| `#e85b4c` | BENEFITS 일부 프로모션 카드 배경 |

**주의:** 위 색상은 해당 컴포넌트에서 발견된 실제 값이며 **새로운 전역 브랜드 토큰이 아니다**. 프로모션 이미지/행사별 배색은 메인페이지의 표현이므로 모든 서브페이지에 반복하지 않는다.

## 5. Typography — 글꼴, 크기, 굵기, 행간

- **[확인]** 기본 `body { font-family: "Pretendard Variable", sans-serif; color: var(--text-primary); }`. 폰트 CSS 로드 경로는 `../font/css/pretendardvariable.css`. 부모 디렉터리 구조를 보존하거나 실제 서브페이지 위치에서 올바른 상대경로를 계산한다.
- **[확인]** 모든 글자가 동일한 크기의 단일 스케일로 관리되지는 않는다. 아래는 **사용처별 실제 선언**이다.

| 맥락/셀렉터 | 크기 | 굵기 | 행간 |
|---|---|---|---|
| `.header-nav a` PC | 15px | 600 | 별도 선언 없음 |
| `.header-search input` | 14px | 상속 | 별도 선언 없음 |
| `.quick-menu-list a` | 16px (PC 기본), 화면에 따라 clamp | 600 | 1.4 |
| `.recommend-eyebrow` | 14px | 700 | 별도 선언 없음 |
| `.recommend-heading h2` | 28px (≤1024px: 23px) | 700 | 1.35 |
| `.recommend-brand` | 13px | 별도 선언 없음 | 별도 선언 없음 |
| `.recommend-name` | 16px | 600 | 1.4 |
| `.recommend-delivery` | 12px | 별도 선언 없음 | 별도 선언 없음 |
| `.recommend-price` | 18px | 금액 strong 700 | 별도 선언 없음 |
| `.best-heading h2` | 26px (≤767px: 23px) | 700 | 별도 선언 없음 |
| `.best-info h3` | 16px | 600 | 1.35 |
| `.daily-content h2` | `clamp(28px, 2.2vw, 40px)` (≤600px: 27px) | 700 | 1.25 |
| `.daily-description` | 17px (≤900px: 14px) | 별도 선언 없음 | 1.55 |
| `.benefits-heading h2` | 28px | 700 | 별도 선언 없음 |
| `.benefit-card-copy h3` | 22px | 700 | 1.4 |
| `.brand-heading h2` | 24px | 상속/별도 선언 확인 필요 | 1.35 |
| `.site-footer` | 14px | 상속 | 1.6 |
| `.footer-nav-inner a` | 16px | 500 | 1 |

**[서브페이지 적용]** 섹션 타이틀은 기존 24–28px 범위의 **해당 맥락에 맞는** 선언을 재사용하고, 상품명은 16px/600 계열, 보조설명은 12–14px 계열을 먼저 검토한다. 이것은 새 전역 디자인 토큰 선언이 아니다. '별도 선언 없음'은 브라우저 기본/상속 결과가 적용됨을 뜻하므로 값을 발명하지 않는다.

## 6. Layout & Spacing — 컨테이너, 정렬과 간격

| 영역 | 확인된 핵심 규칙 | 언제 적용하는가 |
|---|---|---|
| Header | `.header-inner` 최대 1920px, 좌우 100px, 높이 120px | 데스크톱 공통 상단 |
| 추천상품 | `.recommend-inner` 최대 1720px, 섹션 좌우 24px | 상품 추천형 섹션 |
| BEST | `.best-inner` 최대 1600px, 섹션 좌우 24px | 가운데 강조 슬라이드 |
| NEW | PC `.new-slider-shell` 최대 1420px, 카드 687×478px | PC 신상품 슬라이드 2장 중심 |
| 일일배달 | `.daily-banner` 최대 1720px, 높이 400px, `display:flex`, 간격 40px | 텍스트+이미지 프로모션 |
| 혜택 | `.benefits-inner` 최대 1720px; 카드 560×336px | 프로모션 슬라이드 |
| 브랜드 | `.brand-inner` 최대 1496px; 대표 이미지 500×500px, 상품 이미지 300×300px, gap 32px | 브랜드 상품 탐색 |
| Footer | `.footer-main-inner` 최대 1496px, 패딩 72px 76px 66px, flex | 회사정보+고객센터 |
| 빠른 메뉴 | 기본 `display:flex`, 6개 아이콘; 모바일 후반 규칙은 `grid-template-columns:repeat(6,minmax(0,1fr))` | HERO 바로가기 |

- **[확인]** 카드 배치는 flex·Swiper, 모바일 바로가기는 grid, 헤더 아이콘/검색은 flex를 주로 사용한다. 컨테이너별 최대폭이 **서로 다르며 단일 통합 최대 너비 변수는 없음**.
- **[확인]** 주요 섹션 세로 여백 예: 추천 하단 100px, BEST 상·하 72px/64px, 일일배달 80px/100px, 혜택 상·하 90px, 브랜드 95px/105px. 화면 크기에 따라 별도 축소 규칙이 있다.
- **[서브페이지 적용]** 콘텐츠 유형에 가장 가까운 기존 폭과 정렬 방식 재사용. 기존 페이지에 없는 '공식 8px spacing 시스템'을 만들어 기록하지 않는다. 같은 페이지의 제목 왼쪽 시작선과 카드 시작선을 일치시킨다.

## 7. Components — 공통 UI 구성과 사용

### Header / GNB / 검색 / 카테고리

- `.site-header`: sticky, `z-index:30`, 기본 120px 높이, 하단 선 `--border-default`. 스크롤 하강 시 JS가 `.is-hidden`을 토글하여 위로 숨기고 상승 시 나타낸다.
- `.header-logo`: `img/pulmuone_logo.svg`; 메인 링크는 `index.html`.
- `.header-center`: 검색 `.header-search`(PC 480×42px, 녹색 테두리·캡슐형) + GNB `.header-nav`.
- GNB: 카테고리 / 베스트 / 신상품 / 혜택 / 일일배달. 드롭다운 `.category-panel`, `.benefit-panel`, `.daily-panel`과 화살표 SVG 상태가 연동된다.
- `.header-actions`: 장바구니·마이페이지·로그인·고객센터. 하위 패널 `.header-action-panel`을 함께 확인한다.
- 카테고리 트리거는 `aria-expanded`와 `.is-active` / `.is-open` 동기화. 카테고리 버튼 `.is-selected` / `aria-pressed`로 상세 항목을 전환한다.
- **[서브페이지 적용]** 공통 헤더를 일관되게 유지하고, JS는 새로운 서브페이지에 존재하는 요소에만 이벤트가 붙도록 확인한다. 현재 인라인 JS는 메인 전용 Swiper 등 요소가 존재한다고 가정하므로 **그대로 모든 서브페이지에 붙이면 null 오류가 발생할 수 있다**.

### HERO / 빠른 메뉴

- `.hero-sec .visual`: Swiper 슬라이드, PC/모바일 각각 `.pc`, `.mo` 이미지 소스. PC 기본 높이 `clamp(320px,24vw,460px)`; 모바일(≤767px) 3:4 비율.
- `.visual-controls`, `.visual-stepper`, `.visual-autoplay`: 이전/다음, 페이지 카운트, 일시정지/재생. 버튼 `aria-pressed`를 JS로 갱신한다.
- `.quick-menu`: 6개의 원형 연녹색 아이콘과 아래 라벨. 모바일도 마지막 CSS 규칙에서 6열 grid.
- **[서브페이지 적용]** 메인 HERO 전체를 필수 공통 구성으로 취급하지 않는다.

### 상품 카드 / 슬라이더

- **추천:** `.recommend-card` 기본 폭 300px, 대표 카드 `.recommend-card-featured` 400px. `.recommend-image` 정사각형 300px/400px, 모서리 20px. `.recommend-brand` → `.recommend-name` → `.recommend-delivery` → `.recommend-price` 순서.
- **BEST:** `.best-card` 폭 300px, 활성 중앙 카드 이미지 `scale(1.1)`(모바일 1.06). `.best-pagination`에서 비활성 14px 원/활성 30px 캡슐로 구분. JS 진행 애니메이션을 쓴다.
- **NEW:** `.new-card`, `.new-card-top`, `.new-card-bottom`, `.new-product-actions` 사용. PC 1200px 이상 카드 687×478px.
- **브랜드:** `.brand-product` 기본 300px, `.brand-product-image` 300×300px, 대표 이미지 `.brand-ad` 500×500px. `.brand-tab.is-active`로 현재 선택 표시. 다른 브랜드는 현재 JS에서 '상품 콘텐츠 준비 중' 메시지가 표시된다.
- **상품 동작:** `.recommend-actions` / `.best-actions` / `.new-product-actions`에 SVG 찜·장바구니 버튼. CSS 후반의 공통 규칙으로 버튼/이미지 높이 32px(모바일 NEW 30px). 찜은 `aria-pressed`와 `Heart_button.svg` ↔ `Heart_button_active.svg`를 JS로 바꾸는 **화면 데모 상태**이며 서버 저장 기능은 아니다.
- **[서브페이지 적용]** 제품 리스트/추천 영역은 해당 카드의 정보 순서를 재사용한다. 상품 이미지에는 `object-fit:cover`와 동일한 모서리 처리, 상호작용은 버튼에 부여한다. 가격·할인색은 기존 해당 필드의 구분을 유지한다.

### 버튼 / 링크 / 프로모션

- 기본 CTA 중 `.daily-cta`: `--action-primary` 테두리·글자, 흰색 바탕, 999px pill, 14px/600; hover/focus 시 녹색 배경·흰색 글자로 반전.
- `.best-more`, `.brand-more`: 테두리가 있는 라운드 더보기 링크. `.recommend-more`, `.new-more` 등의 일부 버튼은 기존 SVG 이미지를 사용하므로 텍스트 버튼으로 일괄 교체하지 않는다.
- `.benefit-card`: 모서리 22px, 테두리 `--border-default`, 이미지+카피+하단 정보 구획. 이벤트별 배경색은 개별 표현.
- `.brand-tab`: 999px pill, 클릭 활성 `.is-active`로 연두색 배경.
- **[서브페이지 적용]** 같은 기능이면 기존 버튼 구조를 우선 재사용하고, 실제 기능 없는 CTA에 외부 공식 쇼핑몰 URL을 넣지 않는다.

### Footer

- `.site-footer`: 상단 녹색 `.footer-nav`의 회사소개/약관/문의 링크, 아래 `.footer-main`의 로고·회사정보·고객센터·인증 이미지.
- 푸터 본문은 데스크톱 flex 2영역, 모바일(≤767px) 세로 적층. 기존 사업자정보·전화번호 등은 **메인 코드에 적힌 표시 내용**이며 최신 운영 정보 검증을 뜻하지 않는다.
- **[서브페이지 적용]** 레이아웃, 표기 계층과 에셋을 그대로 유지하되 링크는 이 리뉴얼 프로젝트 내부로 연결한다.

## 8. Interaction — Hover / Focus / Active / Transition

| 요소/상태 | 현재 구현 | 서브페이지 사용 판단 |
|---|---|---|
| GNB hover / focus-visible / is-active | 글자 브랜드 그린, 아이콘 SVG 교체·필터, 약 0.25초 | 마우스·키보드에 같은 의미 제공 |
| 카테고리 열기 | 클릭으로 `.is-open`, `.is-active`, `aria-expanded` 전환; 바깥 클릭/Escape 닫기 | 새로운 메뉴에도 열림 상태와 접근성 속성 동기화 |
| 상품 카드 hover / focus-within | 이미지 확대와 액션 노출(상세 구현은 종류별 상이), 보통 0.2~0.5초 | 키보드 포커스에서도 액션 보이도록 |
| 비 hover 장치 | `@media(hover:none)`에서 상품 액션 상시 표시 | 터치에서 hover 전제 금지 |
| 찜 active | `aria-pressed` 상태·SVG 변환 | 실제 저장 기능 구현 전에는 데모로 표기 |
| 브랜드 탭 active | `.brand-tab.is-active` 라임 배경·흰 텍스트 | 선택값과 콘텐츠를 함께 갱신 |
| BEST pagination focus | `:focus-visible`에 2px `#006e2d` outline, offset 4px | 포커스 표시를 제거하지 않기 |
| 헤더 스크롤 | `.site-header.is-hidden` translateY(-100%), 0.3초 | 검색/카테고리 열림과 충돌 여부 테스트 |
| 스크롤 등장 | IntersectionObserver로 `.scroll-reveal-item.is-visible`, `--reveal-delay` 65ms 단위 | 콘텐츠를 숨긴 채 남겨두지 않도록 실패 대응 |
| 접근성 선호 | 여러 `prefers-reduced-motion: reduce` 분기 | 필수 움직임이 아닌 효과 생략 |

**확인할 점:** 일부 hover/focus는 색·밝기만 바꾸고, 일부는 transform을 사용한다. 동일한 0.2초 규칙을 모든 요소에 임의로 강제하지 말 것. 색 변화만으로 상태를 전달하지 않도록 `aria-pressed`, `aria-expanded`, 텍스트 등도 함께 관리한다.

## 9. Responsive Rules — 실제 반응형 기준

- **≤1280px:** 헤더 좌우 padding 100px → 30px, 검색창 너비 `min(38vw, 480px)`.
- **≤1199px:** 브랜드 대표 이미지/푸터 일부 폭과 패딩 변경; 섹션별 PC 레이아웃 축소.
- **≤1024px:** 헤더가 줄바꿈 구조로 전환되고 검색·GNB 너비가 조정됨; `.pc` 숨김 / `.mo` 표시; 추천 카드 폭 `min(70vw,300px)` 등. 단, **≤767px 후반 규칙이 모바일 헤더를 다시 재구성**한다.
- **≤900px / ≤600px:** 일일배달 영역이 단계적으로 압축되고, ≤600px에서 이미지·글이 세로 배치된다.
- **≤767px:** 모바일 상단 헤더 112px, GNB 축소, 검색 기본 숨김(모바일 검색 토글), 하단 고정 `.mobile-tabbar` 5열·높이 `68px + safe-area`; HERO 3:4, 빠른메뉴 6열 grid, 다수 카드 가로 스크롤/섹션 세로 배치, 푸터 세로 적층.
- **≥768px / ≥1025px / ≥1200px:** 일부 HERO/빠른메뉴/NEW PC 규칙 별도 정의. JS Swiper breakpoints에도 768px, 1200px이 사용됨.
- **모바일 카테고리:** JS가 패널을 `body` 자식으로 이동시킬 수 있고, CSS 후반의 `body > #category-panel` 규칙으로 상단 112px~하단 68px 탭바 사이를 차지한다. 새 페이지에서 이 구조를 이해하지 않고 마크업만 복사하면 위치가 어긋날 수 있다.
- **[서브페이지 적용]** 새 미디어쿼리를 발명하기보다 위 실제 기준을 먼저 재사용하고, 너비 320px대부터 모바일·태블릿·PC에서 overflow/텍스트 줄바꿈/고정 하단바 가림을 테스트한다. '320px'은 **테스트 제안**이지 기존 CSS breakpoint가 아니다.

## 10. Do & Don't — 지킬 규칙과 금기

| Do — 유지/재사용 | Don't — 피해야 할 것 |
|---|---|
| `variables.css`의 실제 semantic 토큰 활용 | 실제 없는 새 팔레트나 통합 토큰을 '기존 값'으로 기록하기 |
| Pretendard Variable과 제목·본문·가격의 정보 계층 유지 | 모든 크기·굵기를 임의로 하나로 통일하기 |
| 콘텐츠 종류에 맞는 1720/1600/1496/1420px 등의 기존 폭 참고 | 근거 없이 모든 컨테이너의 최대폭을 동일하게 강제하기 |
| 기존 공통 Header, GNB, Footer, 모바일 탭바 재사용 | 서브페이지별로 로고·메뉴 구조·고정 탭 UI를 제각각 만들기 |
| 기존 SVG 아이콘/찜 상태와 상품 카드 정보 순서 유지 | 기존 디자인을 바꾸려고 아이콘·카드 스타일을 무단 교체하기 |
| `:hover`, `:focus-visible`, `:focus-within`, 터치 상태 함께 검토 | hover에서만 버튼을 보여 모바일·키보드 사용자를 막기 |
| 라우팅은 프로젝트 내부 상대경로로 구성 | 원래 샵풀무원 운영 사이트로 링크 연결하기 |
| JS 사용 전 페이지별 DOM 존재 여부 확인 | 메인에서만 존재하는 Swiper/버튼에 무조건 이벤트 연결하기 |
| HTML의 현재 임시 링크와 미구현 데모 동작 구분 | `#` 또는 찜 데모를 실제 구매·저장 완료라고 주장하기 |
| 완료된 메인 UI 변경 없이 새로운 페이지에서 확장 | 메인 CSS를 리팩터링하면서 현재 화면을 변경하기 |

### 구현 전 체크리스트

- [ ] 서브페이지 기준으로 `../css/default.css`, 폰트, Swiper, `variables.css`, `main.css`의 상대경로를 점검했다.
- [ ] 공통 헤더·푸터와 SVG 이미지 경로를 확인했다.
- [ ] 새로운 UI에 쓰는 컬러·수치가 **기존 코드 근거**인지, 새 결정인지 구분했다.
- [ ] 링크는 프로젝트 내부 경로만 사용한다.
- [ ] 모든 버튼을 키보드/터치로 조작할 수 있고 선택 상태가 표시된다.
- [ ] 모바일 고정 탭바에 콘텐츠가 가려지지 않는다.
- [ ] 각 서브페이지가 실제로 가진 DOM에만 관련 JS를 초기화한다.
- [ ] 메인페이지 `index.html`, `css/main.css`, `css/variables.css`를 변경하지 않았다.

---
**유지보수 메모:** 메인 CSS에는 동일 선택자의 여러 선언과 더 구체적인 후반 덮어쓰기가 있다. 이 문서의 수치는 파일 전반의 **실제 코드 사례**이며 모든 화면에서 단 하나의 계산 스타일을 뜻하지 않는다. 신규 작업 전에 해당 요소의 최종 cascade를 개발자 도구로 확인한다. 외부 쇼핑몰로 향하는 링크는 새로 만들지 않는다.
