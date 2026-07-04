# 📙 LECTURE_03 — CSS 심화

> Flexbox · Grid · Position · 반응형 디자인 · Day 03/13

## 🎯 학습 목표
1. Flexbox로 1차원 레이아웃을 만들 수 있다 — `flex-direction · justify · align · gap`
2. CSS Grid로 2차원 레이아웃을 만들 수 있다 — `grid-template-columns · fr · repeat`
3. `position` 속성으로 요소를 자유롭게 배치할 수 있다 — `relative · absolute · fixed · z-index`
4. 미디어 쿼리로 화면 크기에 반응하는 페이지를 만들 수 있다 — `모바일 · 태블릿 · 데스크톱`

> 2강까지: 선택자 · 박스 모델 · box-sizing → 만든 박스들을 **어떻게 배치할지** 다룬다

---

## PART_01 · Flexbox

> **한 방향(1차원)**으로 배치·정렬하는 레이아웃. 한 줄/한 방향 배치라면 Flexbox.

### 핵심 개념
- `display: flex`를 적용한 요소 = **컨테이너**, 그 직계 자식 = **아이템**
- 배치·정렬 규칙 → 컨테이너에 `justify-content`·`align-items`
- 크기 비율 규칙 → 아이템에 `flex`

### 컨테이너 속성
| 속성 | 역할 | 값 |
|------|------|-----|
| `flex-direction` | 배치 방향(주축) | `row`(기본·가로) · `column`(세로) · `*-reverse` |
| `justify-content` | **주축** 정렬 | `flex-start` · `flex-end` · `center` · `space-between` · `space-around` · `space-evenly` |
| `align-items` | **교차축**(수직) 정렬 | `stretch`(기본) · `flex-start` · `center` · `flex-end` |
| `flex-wrap` | 줄바꿈 여부 | `nowrap`(기본) · `wrap`(넘치면 다음 줄) |
| `gap` | 아이템 사이 간격 | `16px` · `16px 24px`(행·열) ⭐ margin보다 깔끔 |
| `align-content` | 여러 줄일 때 줄 사이 정렬 | (`wrap`일 때만 의미) |
| `flex-flow` | `direction` + `wrap` 단축 | `row wrap` |

> **완전 가운데 정렬**: `display: flex; justify-content: center; align-items: center;`

### 아이템 속성
| 속성 | 역할 |
|------|------|
| `flex: 1` | 남은 공간을 비율로 분배 (`flex:2`+`flex:1` → 2:1) |
| `flex: 0 0 200px` | 고정 크기 (안 줄고 안 늘어남) |
| `order` | 화면에 보이는 순서 변경 (코드 순서 그대로) |
| `align-self` | 이 아이템만 교차축 개별 정렬 |

> `flex` 값은 "고정 크기"가 아니라 **"비율"** — 컨테이너 크기가 바뀌어도 비율 유지

### 자주 쓰는 패턴
- 수평 가운데: `justify-content: center;`
- 수직+수평 완전 가운데: `justify-content: center; align-items: center;`
- 양 끝 + 세로 가운데(nav): `justify-content: space-between; align-items: center;`
- 사이드바 + 콘텐츠: `.sidebar { width: 200px; }` · `.main { flex: 1; }`

> 🎮 연습: **Flexbox Froggy** — flexboxfroggy.com/#ko

---

## PART_02 · CSS Grid

> **행과 열을 동시에** 다루는 2차원 레이아웃. 행과 열이 모두 있으면 Grid.

### 기본 용어
- `display: grid` 요소 = 컨테이너, 직계 자식 = 아이템
- **라인**(트랙을 나누는 선, 1번부터) · **트랙**(라인 사이 공간=한 행/열) · **셀** · **영역**

### 컬럼·행 정의
| 속성 | 예시 | 설명 |
|------|------|------|
| `grid-template-columns` | `200px 200px 200px` | 열 개수·크기 (세로 선) |
| | `200px 1fr` | 고정 + 나머지 |
| | `1fr 1fr 1fr` | 균등 3열 |
| `grid-template-rows` | `60px 1fr 40px` | 행 높이 |

- **`fr` 단위** = fraction(비율). 사용 가능한 공간을 비율로 나눔 (`1fr 2fr` → 1:2)
- **`repeat()`** — `repeat(3, 1fr)` = `1fr 1fr 1fr` (반복 단축)
- **`gap`** — Flexbox와 동일 문법 (`gap: 24px`)

### 아이템 배치
- **선 번호 지정**: `grid-column: 1 / 3;` (1번 라인부터 3번까지 = 2칸)
- **span(칸 병합)**: `grid-column: span 2;` (현재 자리에서 2칸 차지)
- **`grid-template-areas`** — 영역에 이름 붙여 시각적 배치
  ```css
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  ```

### 반응형 Grid (미디어 쿼리 없이!)
```css
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```
- `minmax(200px, 1fr)` — 최소 200px, 최대 1fr
- `auto-fill`(빈 열 자리 유지) vs `auto-fit`(빈 열 없이 채움) → 대부분 `auto-fill`
- 화면 너비에 맞춰 열 개수가 자동으로 늘고 줆 (예: 1200px→4열, 768px→3열, 480px→2열, 320px→1열)

---

## PART_03 · position

> 문서 흐름(normal flow)에서 벗어나 요소를 원하는 자리에 배치

| 값 | 기준 | 특징 |
|----|------|------|
| `static` | 기본값 | 문서 흐름 그대로 |
| `relative` | **원래 위치** | 이동해도 원래 공간 유지 |
| `absolute` | 가까운 **positioned 조상** | 흐름에서 제거됨 |
| `fixed` | **뷰포트(화면)** | 스크롤해도 고정 |
| `sticky` | 스크롤 위치 | `relative`처럼 흐르다 지정 위치에서 `fixed`처럼 고정 |

- 위치 지정: `top` · `right` · `bottom` · `left` (`static`에는 적용 안 됨)

### relative
```css
.box { position: relative; top: 10px; left: 20px; }
```
원래 자리는 비어 있는 채로 유지 · 주 용도 → `absolute` 자식의 **기준점**

### absolute ⚠️
- 기준 = `position`이 `static`이 아닌 가장 가까운 조상 (없으면 페이지 전체)
- **흔한 실수**: 부모에 `position: relative` 없으면 엉뚱한 위치 → 기준 부모에 `relative` 추가
- absolute 요소는 width가 내용 크기로 줄 수 있음 → `width: 100%` 등 명시

### fixed
```css
header { position: fixed; top: 0; left: 0; width: 100%; z-index: 100; }
body { padding-top: 60px; }  /* fixed 헤더가 본문 가리지 않게 */
```

### sticky
```css
.section-title { position: sticky; top: 60px; background-color: white; }
```
긴 페이지 제목·표 헤더 고정에 활용 · 부모 `height`·`overflow: hidden` 주의

### z-index (쌓임 순서)
- 요소 겹칠 때 **앞쪽** 표시 결정. 기본은 나중에 나온 요소가 위
- **필수 조건**: `position`이 `static`이 아니어야 함 (단, flex/grid 자식은 position 없어도 동작)
- 실전 값 관리: 헤더 100 · 드롭다운 200 · 모달 배경 300 · 모달 팝업 400 (100 단위 여유)

### calc()
```css
.sidebar { width: calc(100% - 240px); }
.content { height: calc(100vh - var(--header-height)); }
```
CSS 안에서 단위가 다른 값 직접 계산

### position 실전 패턴
- 카드 뱃지: `.card { position: relative; }` + `.badge { position: absolute; top·right }`
- 오버레이: `.overlay { position: absolute; inset: 0; }` (`inset:0` = top/right/bottom/left:0)
- 고정 헤더: `fixed` + `body { padding-top }`
- 플로팅 버튼(FAB): `position: fixed; bottom; right;`

---

## PART_04 · 반응형 디자인

> 같은 HTML을 화면 크기(모바일·태블릿·데스크톱)에 따라 다른 레이아웃으로 표시

- **반응형(Responsive)**: 하나의 레이아웃이 자동으로 변형 (⭐ 이 강의 방식)
- **적응형(Adaptive)**: 기기별 미리 만들어 둔 레이아웃 중 선택

### 브레이크포인트 (전환되는 화면 너비 기준점)
| 기기 | 너비 |
|------|------|
| 모바일 | ~767px |
| 태블릿 | 768px~ |
| 데스크톱 | 1024px~ |

> 기기 종류가 아니라 **콘텐츠가 깨지는 지점**을 기준으로 설정

### @media 기본 문법
```css
@media (min-width: 768px) {  /* 768px 이상 = 태블릿+ */
  .card-list { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {  /* 데스크톱 */
  .card-list { grid-template-columns: repeat(3, 1fr); }
}
```
- `min-width`(이 너비 이상) · `max-width`(이 너비 이하)
- 미디어 쿼리는 CSS 파일 **가장 아래**에 모아 쓰는 게 일반적

### 모바일 퍼스트 (권장)
기본 스타일을 **모바일 기준**으로 쓰고, 화면이 커질수록 `min-width`로 추가 → 성능·유지보수 유리

- **+ Flexbox**: `flex-direction: column` → 커지면 `row`
- **+ Grid**: `grid-template-columns: 1fr` → 커지면 `repeat(2/3, 1fr)`, 또는 `grid-template-areas` 전체 전환

### DevTools 반응형 모드
- `Ctrl+Shift+M` (또는 상단 툴바 아이콘) → 진입/해제
- 너비 직접 입력, iPhone·iPad 등 프리셋, 브레이크포인트 확인

---

## PART_05 · 실습

### 💡 AI로 레이아웃 설계 (워크플로우)
1. 설계: Open Design · Claude Design으로 프로토타입 생성 → 레이아웃·톤·색상 확인
2. 구현: 프로토타입 기준으로 HTML·CSS 작성

### 실습① — 반응형 포트폴리오
1. 고정 헤더 (`position: fixed`) + `body { padding-top }`
2. 기술 목록을 Grid 카드로 변환
3. 카드 스타일링 (`box-shadow` · `border-radius`)
4. 미디어 쿼리로 레이아웃 전환
- header 내부 Flexbox: `justify-content: space-between; align-items: center;` (이름 왼쪽, nav 오른쪽)
- 기술 섹션 Grid: `repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;`
- 미디어 쿼리: 모바일 `flex-wrap: wrap; gap: 4px` → 768px `header h1 22px`, `section padding 32px 40px` → 1024px `.skill-grid repeat(3, 1fr)`

#### ✅ 결과 점검 체크리스트
- 스크롤해도 헤더 고정?
- 헤더 내부 좌우 분리 (이름 왼쪽, nav 오른쪽)?
- 기술 카드가 그리드로 배치?
- 모바일(360px) 레이아웃 안 무너짐?
- 데스크톱(1024px+) 카드 3열?
- nav 링크 클릭 시 해당 섹션 이동? (고정 헤더 높이 확인)

### 실습② — 한 페이지 사이트
주제(좋아하는 것 소개 / 추천 장소 / 관심 인물·팀) 중 하나 → AI 설계 후 직접 구현
- 구성: 헤더 · 카드 섹션(3개, Grid) · 푸터 · 모바일/데스크톱 반응형

---

## ⚠️ 자주 하는 실수

### position
- absolute 요소가 엉뚱한 위치 → 부모에 `position: relative` 확인
- fixed 헤더 아래 내용 가려짐 → `body` 또는 첫 섹션에 `padding-top`
- z-index 안 먹힘 → `static`이면 무효, `position: relative` 추가
- sticky 작동 안 함 → 부모 `overflow: hidden` 또는 `top` 누락

### 미디어 쿼리
- 적용했는데 변화 없음 → `<meta name="viewport">` 확인 (없으면 무효)
- 모바일에서 PC처럼 보임 → viewport meta 누락
- 브레이크포인트 이상함 → `Ctrl+Shift+M`으로 정확한 너비 확인 · min/max 혼용 시 우선순위 주의
- 💡 tip: 모바일 퍼스트(`min-width`) 하나로 통일하면 방향 혼동 ↓

---

## ✅ 3강 정리
- Flexbox로 1차원(한 방향) 배치와 정렬을 한다
- CSS Grid로 행과 열을 동시에 다루는 2차원 레이아웃을 만든다
- `position`과 z-index로 요소를 흐름에서 벗어나 배치한다
- 미디어 쿼리로 화면 크기에 반응하는 페이지를 만든다

> **다음 → 4강 · 전환과 애니메이션 (transition · transform)**
