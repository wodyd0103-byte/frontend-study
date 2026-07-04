# 📘 LECTURE_04 — CSS 인터랙션

> transition · transform · hover 상태 변화 · 드롭다운 메뉴 · Day 04/13

## 🎯 학습 목표
1. `transition`으로 상태 변화(hover 등)를 부드럽게 만들 수 있다 — `property · duration · easing`
2. `transform`으로 요소를 이동·확대·회전시킬 수 있다 — `translate · scale · rotate`
3. `opacity`와 `visibility`를 조합해 드롭다운 메뉴를 만들 수 있다
4. `::before`/`::after`와 CSS 변수(`:root`)를 활용해 장식 요소와 공통 값을 관리할 수 있다
5. 이미지 오버레이 카드(hover zoom)와 뱃지/아이콘 배치를 구현할 수 있다

> 3강까지: Flexbox·Grid·position으로 **레이아웃**을 잡았다 → 4강은 그 위에서 **상태가 바뀔 때의 움직임**을 다룬다

---

## PART_01 · transition — 부드러운 상태 변화

### 핵심 개념
`transition`이 없으면 `hover` 등으로 값이 바뀔 때 **즉시 뚝** 바뀐다. `transition`을 추가하면 지정한 시간 동안 **서서히** 변한다.

```css
/* transition 없음 → 색이 바로 툭 바뀜 (딱딱한 느낌) */
.button:hover {
  background: darkblue;
}
```

```css
/* transition 추가 → 0.3초에 걸쳐 부드럽게 전환 */
.button {
  transition: background 0.3s;
}
```

### 문법
```css
transition: 속성 지속시간 [이징함수] [지연시간];
```

| 요소 | 예시 | 설명 |
|------|------|------|
| 속성(property) | `background`, `transform`, `all` | 어떤 속성 변화에 애니메이션을 걸지 |
| 지속시간(duration) | `0.2s`, `0.3s` | 변화에 걸리는 시간 |
| 이징(easing) | `ease-out`, `linear` | 속도 곡선 (`ease-out`: 빠르게 시작해서 천천히 멈춤) |
| 지연시간(delay) | 생략 가능 | 시작 전 대기 시간 |

### 실전 예시 — 버튼 배경 전환
```css
.btn {
  background-color: var(--color-primary);
  border-radius: var(--radius-card);
  transition: background 0.2s;
}
.btn:hover {
  background-color: var(--color-hover);
}
```

### 실전 예시 — 카드 그림자 강화 (hover 시 입체감)
```css
/* 카드 그림자 전환 */
.card {
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
  transition: box-shadow 0.2s;
}
.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,.18);
}
```

> 그림자를 진하게·크게 바꾸는 것만으로 카드가 "떠오르는" 느낌을 줄 수 있다. `transform: translateY(-4px)`와 함께 쓰면 효과가 배가된다 (PART_02 참고).

### 여러 속성 동시 전환 (콤마로 구분)
```css
.skill-card {
  transition: transform 0.2s ease-out,
              box-shadow 0.2s;
}
.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
}
```

---

## PART_02 · transform — 이동·확대·회전

`transform`은 요소를 문서 흐름에 영향을 주지 않으면서(레이아웃 재계산 없이) 이동/확대/회전시킨다. 그래서 `transition`과 함께 쓰면 성능이 좋고 자연스럽다.

### translate — 이동
```css
transform: translateX(20px);   /* 가로 이동 */
transform: translateY(-4px);   /* 세로 이동 (음수 = 위로) */
transform: translate(10px, 5px); /* 가로, 세로 동시 지정 */
```

### scale — 크기
```css
transform: scale(1.05);   /* 가로·세로 동시 확대 (1.05배) */
transform: scaleX(2);     /* 가로만 2배 */

/* 이미지 확대 hover — 부모는 overflow: hidden으로 잘라내기 */
.img-wrap { overflow: hidden; }
.img-wrap:hover img {
  transform: scale(1.08);
}
```

### rotate — 회전
```css
transform: rotate(45deg);
transform: rotate(-90deg);

/* 아이콘 회전 바퀴 */
.icon:hover {
  transform: rotate(360deg);
}
```

### ⚠️ 자주 하는 실수 — transform은 값을 하나만 적용됨

```css
/* ❌ 잘못 — 마지막만 적용 */
transform: translateY(-4px);
transform: scale(1.02);   /* 위 줄을 덮어써서 translateY가 사라짐 */
```

```css
/* ✅ 올바름 — 둘 다 적용 (공백으로 나열) */
transform: translateY(-4px) scale(1.02);
```

> `transform`은 CSS의 다른 속성처럼 나중에 선언한 게 이전 걸 **완전히 대체**한다. 이동과 확대를 동시에 적용하려면 **한 줄에 공백으로 이어서** 써야 한다.

---

## PART_03 · opacity·visibility — 드롭다운 메뉴의 핵심 패턴

`display: none`은 트랜지션이 걸리지 않는다(즉시 사라짐/나타남). 그래서 **부드럽게 나타나고 사라지는** 메뉴·툴팁은 `opacity` + `visibility` 조합을 쓴다.

### 기본 원리
```css
.sub {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s;
}
.menu li:hover .sub {
  opacity: 1;
  visibility: visible;
}
```

| 속성 | 역할 |
|------|------|
| `opacity: 0` | 투명하게(안 보이게) — 하지만 공간은 차지하고 **클릭도 가능** |
| `visibility: hidden` | 클릭·마우스 이벤트까지 완전히 차단 |
| 둘을 함께 사용 | 평소엔 안 보이고 클릭도 안 되다가, hover 시 `opacity`가 서서히 올라가며 자연스럽게 나타남 |

> `opacity`만 0으로 두면 화면엔 안 보여도 그 자리에 있는 투명한 요소가 클릭을 가로챌 수 있다 — 반드시 `visibility: hidden`을 같이 써야 한다.

### 실전 예시 — 드롭다운 네비게이션

**dropdown.html**
```html
<nav class="navbar">
  <ul class="menu">
    <li><a href="#">홈</a></li>
    <li>
      <a href="#">제품</a>
      <ul class="sub"> <!-- 하위 메뉴 -->
        <li><a href="#">노트북</a></li>
        <li><a href="#">태블릿</a></li>
        <li><a href="#">스마트폰</a></li>
      </ul>
    </li>
    <li><a href="#">회사소개</a></li>
    <li><a href="#">문의</a></li>
  </ul>
</nav>
```

**dropdown.css**
```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; }
.navbar { background: #2c3e50; }
.menu { list-style: none; display: flex; }
.menu > li {
  position: relative; /* 기준점 */
}
.menu > li > a {
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 16px 20px;
}
.menu > li:hover > a { background: #34495e; }

.sub {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
  opacity: 0;               /* 평소 투명 */
  visibility: hidden;       /* 평소 숨김 */
  transition: opacity 0.2s;
}
.menu li:hover .sub {
  opacity: 1;
  visibility: visible;
}
.sub li a:hover { background: #f0f3f7; }
```

렌더링하면 다크 네이비 배경의 상단 내비게이션(홈/제품/회사소개/문의)이 나오고, **제품**에 마우스를 올리면 흰 배경의 하위 메뉴(노트북/태블릿/스마트폰)가 부드럽게 나타난다.

### 드롭다운 만들 때 핵심 체크포인트
- 부모 `<li>`(또는 `.menu > li`)에 반드시 `position: relative` — 하위 메뉴의 위치 기준
- 하위 메뉴 `<ul class="sub">`엔 `position: absolute; top: 100%;` — 부모 바로 아래 붙임
- `opacity` + `visibility`를 항상 짝으로 사용
- `transition`은 `visibility`가 아니라 **`opacity`에만** 걸어야 자연스럽다 (`visibility`는 transition을 걸어도 즉시 전환됨)

### 페이드 효과 응용 — 툴팁
```css
.tooltip {
  opacity: 0;
  transition: opacity 0.2s;
}
.parent:hover .tooltip { opacity: 1; }
```

---

## PART_04 · @keyframes — 애니메이션

`transition`은 "상태 A → 상태 B" 한 번의 변화만 다룬다. 여러 단계를 자동으로 반복·재생하려면 `@keyframes` + `animation`을 쓴다.

### 기본 구조 (from → to)
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; }
}
.card { animation: fadeIn 0.4s; }
```

### 퍼센트 단계 (여러 중간 지점)
```css
@keyframes bounce {
  0%   { translateY(0); }
  50%  { translateY(-20px); }
  100% { translateY(0); }
}
```

### 무한 반복 — 회전 스피너
```css
.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

| animation 옵션 | 의미 |
|------|------|
| 지속시간 (`1s`) | 한 사이클 시간 |
| 이징 (`linear`) | 속도 변화 없이 일정 |
| 반복 (`infinite`) | 무한 반복 (숫자 지정 시 그 횟수만큼) |

> `from`/`to`는 `0%`/`100%`와 같은 표현. 중간 단계를 세밀하게 조절하고 싶으면 퍼센트(%) 문법을 쓴다.

---

## PART_05 · ::before / ::after — 가상 요소로 장식하기

콘텐츠에 없는 장식(밑줄, 별표, 뱃지 점)을 실제 HTML 태그 추가 없이 CSS만으로 만들 수 있다.

```css
.el::before {
  content: "★";       /* 텍스트 삽입 */
}
.el::after {
  content: "";         /* 도형용 — 빈 문자열 */
  display: block;
  width: 40px; height: 2px;
}
```

### 실전 예시 — 제목 밑줄 장식선
```css
h2 {
  position: relative;
  display: inline-block;
}
h2::after {
  content: "";
  position: absolute;
  bottom: -4px; left: 0;
  width: 100%; height: 2px;
  background-color: #4a90e2;
}
```
제목 텍스트 바로 아래에 포인트 컬러의 짧은 밑줄이 생긴다.

### 실전 예시 — 알림 뱃지(빨간 점)
```css
.icon { position: relative; }
.icon::after {
  content: "3";
  position: absolute;
  top: -6px; right: -6px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 16px; height: 16px;
}
```
아이콘 우측 상단에 숫자가 들어간 작은 원형 뱃지가 겹쳐 보인다. `position: relative`(부모) + `position: absolute`(뱃지)는 3강에서 배운 패턴 그대로 응용된 것.

> `::before`/`::after`를 쓰려면 부모가 `position: relative`여야 원하는 자리에 배치할 수 있다 — 항상 짝으로 기억할 것.

---

## PART_06 · CSS 변수(Custom Properties) — `:root`

### 변수를 쓰는 이유
> 색을 5군데서 썼는데, 바꿔야 할 때 — `:root` 값 하나만 수정하면 전체가 한 번에 바뀐다.

같은 색상·반지름·간격 값을 여러 곳에 반복해서 적으면, 나중에 디자인을 바꿀 때 전부 찾아 고쳐야 한다. `:root`에 변수로 선언해두면 **한 곳만 고쳐도 전체 반영**된다.

### 선언과 사용
```css
:root {
  --color-primary: #4a90e2;
  --color-hover: #2266cc;
  --radius-card: 12px;
  --gap: 16px;
}

.btn {
  background-color: var(--color-primary);
  border-radius: var(--radius-card);
}
.btn:hover {
  background-color: var(--color-hover);
}
.skill-card {
  border-radius: var(--radius-card);
}
nav {
  background-color: var(--color-primary);
}
```

| 문법 | 설명 |
|------|------|
| `--변수명: 값;` | `:root`(문서 전체 스코프) 안에서 선언 |
| `var(--변수명)` | 선언한 값을 어디서든 불러와 사용 |

> 색상 팔레트, 카드 radius, 공통 gap 값처럼 **여러 컴포넌트가 공유하는 값**을 변수로 뽑아두면 유지보수가 압도적으로 쉬워진다.

---

## PART_07 · 이미지 오버레이 카드 (hover zoom)

썸네일에 마우스를 올리면 이미지가 살짝 확대되면서 반투명 오버레이(및 텍스트)가 떠오르는, 갤러리·제품 카드에 자주 쓰이는 패턴.

```css
.img-card {
  position: relative;
  overflow: hidden;      /* 확대된 이미지가 카드 밖으로 넘치지 않게 자름 */
}
.img-card img {
  transition: transform 0.3s;
}
.overlay {
  position: absolute;
  inset: 0;              /* top/right/bottom/left: 0 축약 */
  background: rgba(0,0,0,0.55);
  opacity: 0;
  transition: opacity 0.3s;
}
.img-card:hover img {
  transform: scale(1.08);
}
.img-card:hover .overlay {
  opacity: 1;
}
```

### 구조 이해
| 부분 | 역할 |
|------|------|
| `.img-card` (부모) | `position: relative` + `overflow: hidden` — 오버레이 기준점이자 확대 이미지를 잘라내는 액자 |
| `img` | 평소엔 원래 크기, hover 시 `scale(1.08)`로 살짝 확대 |
| `.overlay` | `inset: 0`으로 카드 전체를 덮는 반투명 레이어, 평소엔 `opacity: 0`이다가 hover 시 `opacity: 1` |

> `overflow: hidden`을 빼먹으면 이미지가 확대될 때 카드 테두리를 넘어가 버린다 — 이 패턴에서 가장 흔한 실수.

---

## PART_08 · 아이콘 라이브러리 (Font Awesome)

코드로 아이콘을 그리는 대신, CDN으로 아이콘 폰트/SVG 라이브러리를 붙여와 `<i>` 태그 클래스만으로 아이콘을 쓸 수 있다.

**index.html**
```html
<head>
  <script src="https://kit.fontawesome.com/KIT_CODE.js" crossorigin="anonymous"></script>
</head>
```

**아이콘 사용**
```html
<i class="fa-solid fa-house"></i>
<i class="fa-regular fa-envelope"></i>
```

```css
/* 크기·색은 CSS로 */
.icon { font-size: 24px; color: #4a90e2; }
```

| 접두사 | 의미 |
|------|------|
| `fa-solid` | 채워진(굵은) 스타일 |
| `fa-regular` | 얇은 외곽선 스타일 |

> `.icon:hover { transform: rotate(360deg); }` 처럼 PART_02의 `transform`과 결합하면 아이콘 hover 애니메이션도 쉽게 만들 수 있다.

---

## 🛠 실습 — portfolio.html / portfolio.css

3강에서 만든 반응형 포트폴리오에 이번 강의에서 배운 인터랙션을 추가한다.

### 01 · 카드 호버
```css
.skill-card {
  transition: transform 0.2s ease-out,
              box-shadow 0.2s;
}
.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
}
```

### 02 · nav 링크 호버
```css
nav a {
  color: white;
  transition: background-color 0.2s;
}
nav a:hover {
  background-color: rgba(255,255,255,.15);
}
```

### 03 · 제목 장식선
```css
.section-title {
  position: relative;
  display: inline-block;
}
.section-title::after {
  content: "";
  position: absolute;
  bottom: -4px; left: 0;
  width: 100%; height: 2px;
}
```

### 04 · 이미지 카드에 오버레이 적용 (PART_07 패턴 그대로 적용)

### ✅ 결과 점검 체크리스트
- 카드 크기와 간격은 어느 정도인가?
- 오버레이 텍스트는 어디에 배치됐나?
- 내가 원하는 것과 어떻게 다른가?

---

## ⚠️ 자주 하는 실수

### transition · transform
- `transform`을 여러 줄로 나눠 쓰면 마지막 줄만 적용됨 → 반드시 한 줄에 공백으로 이어서 (`translateY(-4px) scale(1.02)`)
- `transition`을 hover 상태(`:hover`)에만 걸면 **되돌아올 때** 뚝 끊김 → 원래 상태(기본 선택자)에 걸어야 양방향 모두 부드러움
- `transition: all`은 편하지만 성능이 나쁠 수 있음 → 실제 바뀌는 속성만 지정 권장

### 드롭다운(opacity·visibility)
- `opacity`만 쓰고 `visibility`를 빼먹으면, 안 보이는 메뉴가 화면 위에서 클릭을 가로챔
- 하위 메뉴 부모에 `position: relative`가 없으면 `.sub`가 엉뚱한 위치(문서 전체 기준)로 튀어나감
- `visibility`에까지 `transition`을 걸면 즉시 전환돼 버림 → `opacity`에만 transition 지정

### 이미지 오버레이
- 부모 `.img-card`에 `overflow: hidden`을 빼먹으면 확대된 이미지가 카드 밖으로 삐져나옴

---

## ✅ 4강 정리
- `transition`으로 hover 등 상태 변화를 부드럽게 만든다
- `transform`(translate·scale·rotate)은 한 줄에 공백으로 이어 써야 모두 적용된다
- `opacity` + `visibility` 조합으로 자연스러운 드롭다운 메뉴를 만든다
- `@keyframes` + `animation`으로 반복되는 애니메이션(스피너 등)을 만든다
- `::before`/`::after`와 `:root` 변수로 장식과 공통 값을 관리한다
- 이미지 오버레이 카드(hover zoom)와 Font Awesome 아이콘으로 인터랙션을 완성한다

> **다음 → 5강**
