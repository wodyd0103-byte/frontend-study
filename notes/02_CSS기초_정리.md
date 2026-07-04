# 📗 LECTURE_02 — CSS 기초

> 선택자 · 박스 모델로 페이지 꾸미기 · Day 02/13

## 🎯 학습 목표
1. 목록 태그로 내용을 정리할 수 있다 — `ul · ol · li`
2. CSS를 연결하고 기본 문법으로 스타일을 지정할 수 있다 — `선택자 · 속성 · 값 · class · id`
3. 박스 모델을 이해하고 레이아웃을 조절할 수 있다 — `width · padding · border · margin`
4. `display` 속성으로 요소의 배치 방식을 바꿀 수 있다 — `block · inline · inline-block · none`

> 1강(HTML)에서 만든 구조 **위에** CSS로 스타일을 입힌다. 스타일 연결 지점 3곳: `<head>`(`<link>`) · `<body>`(HTML 구조) · `class/id`(선택 대상)

---

## PART_01 · 콘텐츠 마크업

### 목록 (List)
| `<ul>` Unordered List | `<ol>` Ordered List |
|------|------|
| 순서 없는 목록 · 불릿 • | 순서 있는 목록 · 1. 2. 3. |
| 내비게이션·기능 목록 | 설치 단계·레시피·랭킹 |

- 둘 다 자식은 반드시 `<li>` (List Item)
- **중첩**: `<li>` 안에 또 `<ul>`·`<ol>`을 넣어 계층 구조 생성
- nav 표준 패턴: `<nav>` + `<ul>` + `<li>` + `<a>` (스크린 리더가 "N개 항목 목록" 안내)

### 폼 (Form)
- **`<form action="..." method="...">`** — 입력을 받는 컨테이너
  - `action`: 데이터 보낼 URL / `method`: `get`(URL에 노출·검색) vs `post`(숨겨서 전송·로그인)
- **`<input type="...">`** — 한 줄 입력, 닫는 태그 없음

| type | 용도 |
|------|------|
| `text` / `email` / `password` / `number` | 텍스트·이메일·비밀번호·숫자 |
| `checkbox` | 동의 등 다중 선택 |
| `radio` | 같은 `name`끼리 묶어 하나만 선택 |

- `placeholder` = 입력 전 흐릿하게 보이는 힌트
- **`<label for="id">`** — 입력 칸의 이름표 (클릭 시 입력 칸 활성화, 접근성↑)
- **`<textarea rows cols>`** — 여러 줄 입력
- **`<select>` + `<option>`** — 드롭다운 선택
- **`<button type="...">`** — `submit`(폼 제출·기본값) / `button`(JS 연결) / `reset`(초기화)

### 표 (Table)
```html
<table>
  <thead><tr><th>이름</th><th>나이</th></tr></thead>
  <tbody><tr><td>홍길동</td><td>25</td></tr></tbody>
  <tfoot>...</tfoot>
</table>
```
- `<tr>` 행 / `<th>` 제목 셀(굵게·가운데) / `<td>` 일반 셀
- 구조화: `thead`·`tbody`·`tfoot` (의미적 구분, CSS로 배경색 자주 활용)
- 셀 병합: `colspan="2"`(가로) · `rowspan="2"`(세로)

---

## PART_02 · CSS 기초와 선택자

**CSS** = Cascading Style Sheets. HTML 요소를 *어떻게 표시할지* 지정하는 언어
> **Cascading**(폭포처럼 흐른다) — 여러 규칙이 있을 때 우선순위에 따라 최종 스타일이 결정됨

### CSS 연결 3가지 방법
| 방법 | 작성 위치 | 평가 |
|------|----------|------|
| 인라인 스타일 | 태그 `style="..."` | 가독성 ↓, 권장 안 함 |
| 내부 스타일시트 | `<head>` 안 `<style>` | 단일 페이지 테스트용 |
| **외부 스타일시트** | `.css` 파일 + `<link>` | ⭐ **실무 표준** |

```html
<!-- 외부 연결 -->
<head>
  <link rel="stylesheet" href="style.css" />
</head>
```

### 기본 문법 & 주석
```css
선택자 {
  속성: 값;   /* 선택자=어떤 요소 · 속성=무엇을 · 값=어떻게 */
}
/* 주석은 반드시 이 형태 (HTML 주석과 다름) */
```

### 선택자 종류
| 선택자 | 예시 | 설명 |
|--------|------|------|
| 요소 | `p { }` | 태그 이름 → 해당 태그 전체 |
| **class** | `.highlight { }` | `class="highlight"` 모두 (여러 번 재사용) |
| **id** | `#about { }` | 고유 영역 1곳 (실무는 주로 JS용, 스타일은 class) |
| 그룹 | `h1, h2 { }` | 콤마로 묶어 한 번에 |
| 하위(자손) | `div p` | div 하위 **모든** p (공백) |
| 자식 | `div > p` | div의 **직계** 자식 p |
| 인접 형제 | `div + p` | div 바로 뒤 p 하나 |
| 형제 | `div ~ p` | div 이후 같은 계층 모든 p |

> 공백(하위) ⊃ `>`(직계 자식) — 한 단계 차이

### 우선순위 (Specificity)
1. `!important` (최후 수단)
2. 인라인 스타일 `style="..."`
3. id 선택자 `#name`
4. class 선택자 `.name`
5. 요소 선택자 `p, h1, div`

> `!important`는 외부 라이브러리를 강제로 덮어쓸 때만. 평소엔 선택자 구조를 잘 설계하는 게 낫다.

---

## PART_03 · 텍스트와 색상

### 색상 표현
| 방식 | 예시 | 특징 |
|------|------|------|
| 키워드 | `color: red;` | 140여 개 이름, 빠른 테스트용 |
| HEX | `#ff0000` | `#RRGGBB`, 16진수 (`#FFF`=`#FFFFFF` 축약) |
| RGB | `rgb(255,0,0)` | 각 채널 0~255 |
| RGBA | `rgba(0,0,0,0.5)` | `alpha` 0.0(투명)~1.0 — 반투명 배경·오버레이 |

- `color` = 텍스트 색 / `background-color` = 배경 색 (padding 영역까지, border 제외)

### 폰트
- **`font-size`** — 기본 16px(=1rem). 권장: 본문 16~18px · 보조 14px · 제목 28~40px
- **`font-family`** — 우선순위 순으로 나열, 마지막은 일반 범주
  ```css
  body { font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif; }
  ```
  - 범주: `sans-serif`(고딕) · `serif`(명조) · `monospace`(고정폭)
- **웹폰트 적용** — ① Google Fonts CDN(`<link>`로 임베드, 권장) ② `@font-face`(폰트 파일 직접)
- **`font-weight`** — `300`(Light) · `400`(Normal) · `700`(Bold)
- **`font-style`** — `italic`(기울임)

### 텍스트 정렬·장식
- **`text-align`** — `left`(기본) · `center` · `right` · `justify`(양쪽 정렬, 영문 권장)
- **`text-decoration`** — `none`(밑줄 제거) · `underline` · `line-through`
- **`line-height`** — 줄 간격. 본문 가독성 위해 `1.5~1.8` 권장
- **`list-style`** — 불릿/번호 제어. nav에서 `list-style: none; padding: 0;` 자주 사용

---

## PART_04 · 단위와 뷰포트

### CSS 단위
| 단위 | 기준 | 용도 |
|------|------|------|
| `px` | 화면의 점 1개 | 정확한 크기 (테두리·고정 컴포넌트) |
| `%` | 부모 요소 크기 | 반응형 레이아웃 컨테이너 |
| `em` | 현재 요소 `font-size` | (상속으로 예측 어려울 수 있음) |
| `rem` | 루트(`<html>`) `font-size` (16px) | ⭐ 폰트 크기 권장 (접근성↑) |
| `vw` / `vh` | 뷰포트 너비/높이의 1% | 전체 화면 요소 (`100vw`·`100vh`) |

> `1rem = 16px` · `1.5rem = 24px` · `0.875rem = 14px`

### 뷰포트 (Viewport)
- 브라우저 창에서 **스크롤 없이 보이는 영역** (창 크기·개발자 도구로 변함)
- 기기별 너비: 데스크톱 1200~1920 / 태블릿 768~1024 / 스마트폰 360~430
- **모바일 문제**: meta 설정 없으면 약 980px로 그린 뒤 축소 → 글자·버튼이 작아짐
- **해결**:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```
  - `width=device-width`(실제 화면 너비) · `initial-scale=1`(1:1 배율)
  - VS Code `! + Enter`(Emmet) 기본 구조에 이미 포함

### 단위, 언제 쓸까
| 상황 | 권장 단위 |
|------|----------|
| font-size | `rem` |
| padding · margin | `px` · `rem` |
| width (레이아웃) | `%` |
| width (고정 컴포넌트) · border · shadow | `px` |
| 이미지·전체 화면 | `%` · `vw/vh` |

---

## PART_05 · 박스 모델과 display

### 박스 모델
모든 요소는 **content → padding → border → margin** 순서의 사각형 박스
| 영역 | 의미 |
|------|------|
| content | 실제 내용 (텍스트·이미지) |
| **padding** | 내용과 테두리 사이 *내부* 여백 |
| **border** | 테두리 |
| **margin** | 요소 *바깥* 여백 (다른 요소와 거리) |

### 크기·여백 속성
- **`width` / `height`** — 블록은 width 기본 부모 100%, height는 내용 크기 / `max-width`·`min-width`로 제한
- **`padding`** — `16px`(4방향) · `16px 24px`(상하|좌우) · `10px 20px 10px 20px`(상우하좌) · `padding-top` 등 개별
- **`border`** — `border: 1px solid #ccc;` · 스타일 `solid`/`dashed`/`dotted` · `border-radius: 8px`(둥근 모서리, `50%`=원형)
- **`box-shadow`** — `오른쪽 아래쪽 흐림 번짐 색상;` (`inset` 안쪽 그림자, 콤마로 여러 개)
- **`margin`** — `margin: 0 auto;` → width 지정 시 블록 가로 가운데 정렬

### margin collapse (마진 병합) ⚠️
- 위아래 인접 블록의 margin은 더해지지 않고 **큰 쪽 하나만** 적용 (예: 20+30 → 50이 아닌 30)
- 항상 **상하(수직)**에서만 발생 (좌우는 병합 안 됨)
- 부모-자식: 사이에 border/padding 없으면 자식 `margin-top`이 부모 바깥으로 삐져나옴
- **막는 법**: `padding-top: 1px` · `border: 1px solid transparent` · `overflow: hidden` · **`display: flex/grid`(가장 깔끔)**

### box-sizing (중요!)
```css
* { box-sizing: border-box; }  /* 모든 프로젝트 기본 권장 */
```
- `content-box`(기본값): `width` = content만 → 실제 = width+padding+border
- **`border-box`**: `width`가 padding+border 포함 → 실제 = width 그대로 (예측 쉬움)

### overflow
| 값 | 동작 |
|----|------|
| `visible` | 기본값, 넘친 내용 밖으로 표시 |
| `hidden` | 넘친 내용 숨김 |
| `scroll` | 항상 스크롤바 |
| `auto` | 넘칠 때만 스크롤바 (권장) |

### display
| 값 | 특징 | width/height | 대표 태그 |
|----|------|--------------|----------|
| `block` | 가로 전체 차지, 다음 요소 아래 줄 | 지정 가능 | `div p h1~h6 section` |
| `inline` | 내용 크기만, 옆으로 이어짐 | ❌ 무시 | `span a strong em label` |
| `inline-block` | 옆으로 이어지며 크기 지정 가능 | ✅ 가능 | 버튼·뱃지 |

- `display: none` — 완전히 사라짐, 공간 차지 안 함 (아래 요소가 위로)
- `visibility: hidden` — 안 보이지만 **공간은 유지**

---

## PART_06 · 실습

### 실습② — 자기소개 카드 (CSS 추가)
- `* { box-sizing: border-box; margin: 0; padding: 0; }` 리셋
- 카드: 흰 배경 · `border-radius` 둥근 모서리 · `box-shadow` 그림자
- 이미지: `border-radius: 50%`(원형) · `object-fit: cover`
- 카드 가운데: `margin: 0 auto` (width 지정 필수)
- `object-fit`: `cover`(채움·잘림) / `contain`(전체 표시·빈 공간) / `fill`(비율 무시)

### 실습③ — 포트폴리오
- `header`(진한 배경+흰 텍스트) · `nav`(수평 메뉴, `list-style` 제거) · `main`(최대 너비·가운데) · `section`(카드) · `footer`(중앙 저작권)
- **`.container` 패턴**: `max-width: 900px; margin: 0 auto;`로 내용 너비 묶고 가운데 정렬

### 실습④ — 문의하기 폼
- `form · input · label · textarea · select · button` 직접 구성
- input·textarea·select에 `padding`·`border-radius`, 버튼에 `background-color`·`color`·`cursor`

### 실습⑤ — KBO 순위표
- `thead`/`tbody` 구조, `th`(빼곡선+흰 텍스트), `td`에 padding
- `tr:nth-child(even)`로 줄무늬(zebra) 효과

### 자주 하는 CSS 실수
1. `<link>` 연결 경로 (파일 이름·위치·대소문자)
2. 선택자 오류 (`.myClass` ↔ HTML `class="myClass"` 일치?)
3. 오타 (`backgroud-collor`, `color: red`에 세미콜론 누락)
4. 우선순위에 밀림 → DevTools Styles 패널에서 취소선 확인
5. width/height 적용 안 됨 → inline 요소 → `display: block/inline-block`
6. `margin: auto` 가운데 정렬 안 됨 → **width 명시 필요**

### CSS 작성 순서 가이드 (가독성)
1. `display` · `position`
2. `width` · `height`
3. `margin` · `padding`
4. `border` · `border-radius`
5. `background`
6. `font` · `color` · `text`

---

## ✅ 2강 정리
- 목록·폼·표로 콘텐츠를 구조화했다
- CSS를 연결하고 선택자로 요소를 골라 스타일을 줬다
- 박스 모델(content·padding·border·margin)로 레이아웃을 잡았다
- `display`로 요소의 배치 방식을 바꿨다

> **다음 → 3강 · CSS 심화 (position · flex · grid)**
