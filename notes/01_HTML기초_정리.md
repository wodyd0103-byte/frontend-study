# 📘 LECTURE_01 — HTML 기초

> 개발 환경 세팅 → 시맨틱 마크업까지 · Day 01/13

## 🎯 학습 목표
1. 개발 환경을 직접 세팅할 수 있다 — `VSCode · Live Server · Node.js · yarn`
2. HTML 문서의 기본 구조를 작성할 수 있다 — `DOCTYPE · html · head · body`
3. 기본 태그로 간단한 페이지를 만들 수 있다 — `h · p · a · img · div · span`
4. 시맨틱 태그로 의미 있는 구조를 만들 수 있다 — `header · main · section`
5. 웹의 구조와 UI·UX 개념을 이해할 수 있다

---

## PART_01 · 웹과 환경의 이해

### 프론트엔드 vs 백엔드
| 구분 | 역할 |
|------|------|
| **프론트엔드** | 사용자가 직접 보고 만지는 부분 (화면·버튼·이미지·메뉴) → **이 강의에서 만드는 것** |
| **백엔드** | 눈에 보이지 않는 곳에서 데이터를 처리 (서버·DB) |

### 클라이언트와 전체 흐름
클라이언트 = 사용자가 직접 다루는 프로그램 (웹 브라우저, 모바일 앱)
1. 클라이언트가 화면에서 동작을 일으킨다
2. 프론트엔드가 요청을 백엔드로 전달한다
3. 백엔드가 요청을 처리하고 결과를 돌려준다
4. 프론트엔드가 결과를 화면에 보여준다

### UI와 UX
- **UI** (User Interface) = 보이는 화면 자체 (버튼·폰트·아이콘·색상·레이아웃)
- **UX** (User Experience) = 그 화면을 쓰며 느끼는 경험 전체
- 좋은 UI가 쌓이면 좋은 UX로 이어진다

---

## PART_02 · 개발 환경 세팅

### 설치할 도구
| 도구 | 역할 | 비고 |
|------|------|------|
| VSCode | 코드 편집기 | 오늘 설치 |
| Korean Language Pack | VSCode 확장 · 한국어 | 오늘 설치 |
| Live Server | VSCode 확장 · 로컬 서버 | 오늘 설치 |
| Prettier | VSCode 확장 · 포맷터 | 오늘 설치 |
| Chrome DevTools | 브라우저 내장 | 설치 불필요 |
| Node.js | JavaScript 런타임 | 오늘 설치 |
| yarn | 패키지 매니저 | 오늘 설치 |

### 핵심 개념
- **런타임** = 소스 코드가 실행 파일로 변환돼 메모리에 올라가 동작하는 시간·상태
- **런타임 환경** = 오류 없이 실행되도록 메모리를 관리하고 라이브러리를 제공하는 도구들의 집합
- **Node.js** = JavaScript의 런타임 환경 → 브라우저 없이도 JS 실행 가능
  - 1995: 넷스케이프가 JavaScript를 만듦
  - 2009: Ryan Dahl이 크롬 V8 엔진을 떼어내 Node.js 제작
- **패키지 매니저** = 개발 도구·라이브러리를 설치·관리하는 프로그램
  - **npm** = Node.js 설치 시 자동 포함
  - **yarn** = Meta가 npm 단점을 보완 (더 빠르고 버전 관리 일관) → 이 강의의 기본 매니저

### 설치 & 설정 요약
- **VSCode**: `code.visualstudio.com` → 설치 시 **"PATH에 추가"** 체크
- **확장 3종**: Korean Pack / Live Server / Prettier
- **한국어 설정**: `Ctrl+Shift+P` → Configure Display Language → 한국어(ko) → 재시작
- **Prettier**: 기본 포맷터로 지정 + **Format on Save** 체크 → 이후 `Ctrl+S`로 자동 정렬
- **yarn 설치**: `npm install -g yarn` (`-g` = 전역 설치)

### 동작 확인 명령어
```
$ node -v          → v22.x.x   (Node.js)
$ npm -v           → 10.x.x    (npm)
$ yarn --version   → 1.x.x     (yarn)
```
> 명령어를 인식하지 못하면 터미널을 완전히 닫고 새로 연다.

---

## PART_03 · HTML 문서의 구조

### 웹을 만드는 3가지 언어
| STRUCTURE | STYLE | BEHAVIOR |
|-----------|-------|----------|
| **HTML** (구조) | **CSS** (스타일) | **JS** (동작) |

HTML로 뼈대를 만들고, CSS로 꾸미고, JavaScript로 움직이게 한다.

### 기본 구조 (boilerplate)
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="..." />
    <title>페이지 제목</title>
</head>
<body>
    <!-- 여기에 화면 내용 작성 -->
</body>
</html>
```

### 핵심 요소
- **`<!DOCTYPE html>`** — 태그가 아니라 **선언(Declaration)**. 없으면 쿼크 모드로 실행돼 CSS 레이아웃이 깨질 수 있음
- **`<html lang="ko">`** — 최상위(루트) 태그. `lang`으로 문서 주 언어 지정 (스크린 리더·번역·맞춤법 검사에 영향)
- **`<head>`** — 화면에 안 보이는 설정 정보 (`meta charset`·`viewport`·`title`·`link`·`script`·`meta description`)
- **`<body>`** — 화면에 실제 표시되는 모든 내용
- **인코딩** = 어떤 문자를 어떤 숫자로 저장할지 정한 규칙
  - **`<meta charset="UTF-8">`** — 전 세계 문자 표현 가능, 웹사이트 98% 이상 사용 (한글 깨짐 방지)
- **`<meta name="viewport">`** — `width=device-width`, `initial-scale=1` (모바일 반응형 필수)
- **`<title>`** — 브라우저 탭 이름 · 북마크 · 검색 결과 링크 텍스트 (SEO 중요)
- **파비콘** — 탭에 표시되는 작은 아이콘 (`<link rel="icon" href="./favicon.ico">`, 16×16)

---

## PART_04 · HTML 기본 태그

| 태그 | 설명 |
|------|------|
| `h1`~`h6` | 제목. 숫자가 클수록 작음 → 크기가 아닌 **계층 구조** 표현 |
| `p` | 단락. 위아래 여백(margin) 자동 생성 |
| `strong` / `em` | 강조 (굵게 / 기울임). **의미**를 담는 태그 (스크린 리더 인식) |
| `a` | 링크. `href`(이동 주소) · `target="_blank"`(새 탭) |
| `img` | 이미지. `src`(경로) · `alt`(설명 텍스트) · 닫는 태그 없는 **void element** |
| `div` / `span` | 컨테이너. `div`=블록 단위 / `span`=인라인 단위로 묶음 (시각 효과 없이 그룹핑만) |

### Block vs Inline
| Block 요소 | Inline 요소 |
|-----------|-------------|
| 가로 전체 차지, 다음 요소는 아래 줄 | 내용 너비만 차지, 다음 요소는 같은 줄 |
| `div · p · h1~h6` | `span · a · strong · img` |

### 중첩 규칙
- Block 안에 Inline ✅ / Block 안에 Block ✅ / Inline 안에 Inline ✅
- Inline 안에 Block ❌
- (CSS `display` 속성으로 기본 동작 변경 가능)

---

## PART_05 · 구조 · 경로 · 선택자

### 프로젝트 폴더 구조 (파일 유형 기준)
```
my-project/
└─ src/
   ├─ index.html   ← 처음 열리는 메인(허브) 페이지
   ├─ html/        ← 실습 파일들
   ├─ css/
   └─ js/
```

### Live Server 설정 (`.vscode/settings.json`)
```json
{
  "liveServer.settings.root": "/src",
  "liveServer.settings.ignoreFiles": [".vscode/**", "**/*.scss", "**/*.sass", "**/*.ts"]
}
```
> root를 `/src`로 두면 `src/index.html` → `http://localhost:5500/`

### 경로 (Path)
- **상대 경로** — 현재 파일 위치 기준 (`images/photo.jpg`, `../index.html`)
- **절대 경로** — 전체 URL (`https://example.com/photo.jpg`) → 다른 서버 리소스용
- **흔한 실수**: `src="C:/Users/.../photo.jpg"` ❌ → 내 컴퓨터에서만 보임. **상대 경로** 사용 ✅
  - 이미지 안 보일 때: ① 경로 ② 대소문자(`photo.jpg ≠ Photo.jpg`) ③ 실제 파일 존재 확인

### 선택자 (class / id)
| `.class` | `#id` |
|----------|-------|
| 같은 스타일을 **여러 요소**에 적용 | 페이지 내 **고유한 특정 영역** 지정 |
| 여러 번 사용 가능 | 한 페이지에 한 번만 (앵커 링크 `href="#about"`에 활용) |
| `.highlight { color: red; }` | `#about { background: blue; }` |

---

## PART_06 · 시맨틱 마크업

**시맨틱 태그** = 태그 이름 자체가 의미를 가지는 태그 → 개발자·브라우저·검색 엔진이 구조를 이해

### 주요 시맨틱 태그
| 태그 | 역할 |
|------|------|
| `<header>` | 상단 헤더 영역 (로고·제목·주요 내비) |
| `<nav>` | 내비게이션 메뉴 |
| `<main>` | 주요 콘텐츠 (페이지당 **1개**) |
| `<section>` | 주제별 콘텐츠 구역 (제목 h2~h6 포함 권장) |
| `<article>` | 독립적으로 완결된 콘텐츠 (블로그·뉴스·댓글·상품 카드) |
| `<aside>` | 부가 정보 사이드바 (광고·관련 글·작가 소개) |
| `<footer>` | 하단 푸터 (저작권·연락처·사이트맵) |

### 페이지 구조 다이어그램
```
┌─────────── <header> ───────────┐
├─────────── <nav> ──────────────┤
│ ┌──── <main> ────┐  ┌────────┐ │
│ │ <article>      │  │ <aside>│ │
│ │ <section>      │  │        │ │
│ └────────────────┘  └────────┘ │
├─────────── <footer> ───────────┤
└────────────────────────────────┘
```

### 나쁜 예 vs 좋은 예
- ❌ `div`만 사용 → class 이름을 봐야만 의미 파악 가능
- ✅ 시맨틱 태그 → 태그 이름만으로 구조 파악

### 시맨틱 태그를 쓰는 이유
1. **가독성** — 코드를 처음 보는 사람도 구조 파악
2. **SEO** — 검색 엔진이 중요 내용 구분 → 노출 가능성↑
3. **접근성** — 스크린 리더가 올바르게 읽음

---

## 🛠 실습

### 실습① — 자기소개 카드
- 목표: `h1 · p · a · img · strong · div`로 자기소개 카드 제작
- `img`(placeholder 이미지) → `h1`(이름) → `p`(한 줄 소개 + `strong`/`em`) → `a`(링크)
- `picsum.photos`로 placeholder 이미지 사용, `target="_blank"`로 새 탭 열기
- F12 → Elements 탭으로 구조 확인

### 실습② — 시맨틱 포트폴리오
- 목표: 시맨틱 태그로 포트폴리오 페이지 구조 작성
- `header`(이름+직함) → `nav`(소개/기술/연락처 링크) → `main`(`section` 자기소개 + `section` 기술) → `footer`(저작권)
- `id` 속성 + `href="#id"` 앵커 링크 연결
- Live Server·DevTools로 결과 및 구조 확인

---

## ✅ 1강 정리
- 개발 환경을 직접 세팅했다 (VSCode·확장·Node.js·yarn)
- HTML 문서 구조와 기본 태그로 페이지를 만들었다
- 시맨틱 태그로 의미 있는 구조를 표현했다

> **다음 → 2강 · CSS — 스타일의 언어**
