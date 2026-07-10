# 📙 LECTURE_07 — 배열 객체 · 달력 · json-server

> 배열 메서드(map·filter·find) · Date 객체 · 달력 만들기 · json-server · Day 07/13

## 🎯 학습 목표
1. `forEach · map · filter · find`로 배열을 순회·가공·선별할 수 있다
2. `filter().map()` **체이닝**으로 객체 배열에서 원하는 값만 뽑아낼 수 있다
3. `Date` 객체로 연·월·일·요일을 읽고 (`getFullYear · getMonth · getDate · getDay`) 이번 달 달력을 그릴 수 있다
4. `json-server`로 `db.json` 기반 가짜 REST API 서버를 띄우고 Live Server와 역할을 구분할 수 있다

> 6강까지: DOM 조작·이벤트 위임·웹 컴포넌트 → 이번 강의는 **데이터(배열·날짜)를 다루는 법과 로컬 데이터 서버**를 다룬다

---

## PART_01 · 배열 메서드

> 5강의 for문으로도 되지만, 배열 메서드를 쓰면 "무엇을 할지"만 콜백으로 넘기면 된다.

### for문(5강 방식) vs map
```js
// for문 - 5강 방식
const numbers = [1, 2, 3];
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
// [2, 4, 6]

// map - 배열 메서드
const doubled2 = numbers.map(function(n) {
  return n * 2;
});
// [2, 4, 6]
```

### forEach — forEach.js
```js
const fruits = ["사과", "바나나", "딸기"];
fruits.forEach(function(fruit) {
  console.log(fruit);
});
// 사과 / 바나나 / 딸기
```

### map — map.js
```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(function(n) {
  return n * 2;
});
// [2, 4, 6, 8]

// 문자열 가공
const names = ["kim", "lee", "park"];
const upper = names.map(function(name) {
  return name.toUpperCase();
});
// ["KIM", "LEE", "PARK"]
```

### filter — filter.js
```js
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(function(n) {
  return n % 2 === 0;
});
// [2, 4, 6]

// 점수 거르기
const scores = [85, 42, 90, 33, 70];
const passed = scores.filter(function(score) {
  return score >= 60;
});
// [85, 90, 70]
```

### find — find.js
```js
const numbers = [10, 25, 30, 45];
const found = numbers.find(function(n) {
  return n > 20;
});
// 25  ← 조건에 맞는 "첫 번째 값 하나"
```

### 체이닝 — chain.js
```js
const numbers = [1, 2, 3, 4, 5, 6];
const result = numbers
  .filter(function(n) { return n % 2 === 0; })  // [2, 4, 6]
  .map(function(n) { return n * 10; });         // [20, 40, 60]
// [20, 40, 60]
```

| 메서드 | 반환 | 용도 |
|--------|------|------|
| `forEach` | 없음 | 하나씩 꺼내 실행만 |
| `map` | **새 배열** (같은 길이) | 모든 요소를 가공 |
| `filter` | **새 배열** (조건 통과만) | 조건으로 거르기 |
| `find` | **값 하나** (첫 매치) | 하나만 찾기 |

---

## PART_02 · 객체 배열 다루기 — products

> 실전 데이터는 대부분 "객체가 담긴 배열". 메서드 조합이 그대로 통한다.

### 데이터
```js
const products = [
  { id: 1, name: "노트북", price: 1200000, inStock: true },
  { id: 2, name: "마우스", price: 30000, inStock: false },
  { id: 3, name: "키보드", price: 50000, inStock: true },
];
```

### 속성만 뽑기 / 조건으로 거르기
```js
// 이름만 뽑기
const names = products.map(function(product) {
  return product.name;
});
// ["노트북", "마우스", "키보드"]

// 가격만 뽑기
const prices = products.map(function(product) {
  return product.price;
});
// [1200000, 30000, 50000]

// 재고 있는 객체만
const available = products.filter(function(p) {
  return p.inStock;
});
// 재고 있는 객체들만
```

### 체이닝 — 재고 있는 상품의 이름만
```js
const availableNames = products
  .filter(function(p) { return p.inStock; })
  .map(function(p) { return p.name; });
// ["노트북", "키보드"]
```

---

## PART_03 · Date 객체

### 만들기 — date.js
```js
const now = new Date();   // 지금 이 순간
console.log(now);         // Fri Jun 19 2026 ...

const d = new Date(2026, 0, 1);  // 2026년 1월 1일
// 0 = 1월, 1 = 2월 ... 11 = 12월
```

### 읽기 — 2026년 6월 19일 예시
```js
const d = new Date(2026, 5, 19);

d.getFullYear()  // 2026  연도
d.getMonth()     // 5     월 (0부터!)
d.getDate()      // 19    일
d.getDay()       // 5     요일 (0=일 ~ 6=토)
```

### 표준 형식 문자열
```js
const d = new Date();
d.toISOString()  // "2026-06-20T01:23:45.678Z"
d.toUTCString()  // "Sat, 20 Jun 2026 01:23:45 GMT"
```

### 날짜 조합 예시 — YYYY-MM-DD
```js
const d = new Date();
const mm = String(d.getMonth() + 1).padStart(2, "0");
const dd = String(d.getDate()).padStart(2, "0");
`${d.getFullYear()}-${mm}-${dd}`  // "2026-06-20"
```
- `padStart(2, "0")` — 두 자리가 안 되면 앞을 `0`으로 채운다 (`6` → `"06"`)

---

## PART_04 · 달력 만들기

### 원리 — 두 가지 숫자만 알면 된다
```js
// 그 달 1일의 요일 (0~6)
const firstDay = new Date(year, month, 1).getDay();
// 그 달의 마지막 날짜
const lastDate = new Date(year, month + 1, 0).getDate();
```
> 1일이 목요일(`getDay() = 4`)이면 앞의 일·월·화·수 칸을 비운다 — **firstDay만큼 빈 칸을 먼저 넣는다** ⭐

```text
일  월  화  수  목  금  토
                 1   2   3
 4   5   6   7   8   9  10
```

### 실습 파일
```text
src/html/calendar.html
src/css/calendar.css
src/js/calendar.js
```

### calendar.html
```html
<body>
  <div class="calendar">
    <h1 id="title">달력</h1>
    <div class="weekdays">
      <span>일</span><span>월</span><span>화</span>
      <span>수</span><span>목</span><span>금</span><span>토</span>
    </div>
    <div id="days" class="days"></div>
  </div>
  <script src="../js/calendar.js"></script>
</body>
```

### calendar.css
```css
/* 레이아웃 */
body { display: flex;
  justify-content: center;
  padding: 40px 16px;
  background-color: #f0f2f5; }
.calendar { background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 360px;
  box-shadow: 0 4px 24px rgba(0,0,0,.1); }

/* 격자 */
.weekdays, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  text-align: center; }
.days div { padding: 10px 0;
  border-radius: 8px; }
.days div:hover {
  background-color: #eef3fb; }
```

### calendar.js
```js
const today = new Date();
const year  = today.getFullYear();
const month = today.getMonth();  // 0부터

// 그 달 1일의 요일 (0~6)
const firstDay = new Date(year, month, 1).getDay();
// 그 달의 마지막 날짜
const lastDate = new Date(year, month + 1, 0).getDate();

// 제목 표시 (month는 0부터이므로 +1)
document.querySelector("#title").textContent =
  `${year}년 ${month + 1}월`;

const days = document.querySelector("#days");

// 1일 요일만큼 빈 칸을 먼저 넣는다
for (let i = 0; i < firstDay; i++) {
  const blank = document.createElement("div");
  days.appendChild(blank);
}

// 1일부터 마지막 날까지 숫자 칸을 채운다
for (let date = 1; date <= lastDate; date++) {
  const cell = document.createElement("div");
  cell.textContent = date;
  days.appendChild(cell);
}
```

---

## PART_05 · json-server

> 이제부터 서버가 **두 개** 돈다. 역할이 다르다.

| | Live Server | json-server |
|---|---|---|
| 역할 | **내 웹 페이지** 서버 | **데이터** 서버 |
| 주소 | `http://localhost:5500` | `http://localhost:3000` |
| 실행 | VSCode "Go Live"로 실행 | 터미널에서 `yarn start`로 실행 |

### 설치 — terminal
```bash
# 1. 새 터미널 열기 (Ctrl + `)
$ yarn init -y
  # package.json 생성 (-y: 기본값)
$ yarn add json-server@0.17.4
  # json-server 설치 (버전 고정)
```

### db.json — 데이터 파일
```json
{
  "users": [
    { "id": 1, "name": "김철수", "age": 30, "gender": "남" },
    { "id": 2, "name": "이영희", "age": 25, "gender": "여" },
    { "id": 3, "name": "박민수", "age": 35, "gender": "남" },
    { "id": 4, "name": "최지은", "age": 28, "gender": "여" }
  ]
}
```

### package.json — start 스크립트
```json
"scripts": {
  "start": "json-server --watch db.json"
}
```

### 실행 — yarn start
```text
$ yarn start

  \{^_^}/ hi!

  Resources
  http://localhost:3000/users

  Home
  http://localhost:3000
```
- 이 출력이 보이면 서버가 켜진 것이다 — `db.json`의 키(`users`)가 그대로 REST 엔드포인트(`/users`)가 된다

### .vscode/settings.json — Live Server가 db.json을 무시하게
```json
{
  "liveServer.settings.root": "/src",
  "liveServer.settings.ignoreFiles": [
    ".vscode/**",
    "**/*.scss",
    "**/*.sass",
    "**/*.ts",
    "**/db.json"
  ]
}
```
- `"**/db.json"` 추가 — db.json이 바뀔 때마다 Live Server가 페이지를 새로고침하지 않도록

---

## 🛠 실습

### 실습① — products 다섯 문제 (practice)
```html
<!-- src/html/practice.html -->
<body>
  <!-- 화면에 보일 내용 없음 -->
  <script src="../js/practice.js"></script>
</body>
```
```js
// src/js/practice.js
const products = [
  { id: 1, name: "노트북", price: 1200000, inStock: true },
  { id: 2, name: "마우스", price: 30000, inStock: false },
  { id: 3, name: "키보드", price: 50000, inStock: true },
];

// ① 모든 상품 이름
const names = products.map(function(product) {
  return product.name;
});
console.log(names);  // ["노트북", "마우스", "키보드"]

// ② 모든 상품 가격
const prices = products.map(function(product) {
  return product.price;
});
console.log(prices);  // [1200000, 30000, 50000]

// ③ 재고 있는 상품만 거르기
const available = products.filter(function(p) {
  return p.inStock;
});

// ④ 이름으로 상품 하나 찾기
const mouse = products.find(function(p) {
  return p.name === "마우스";
});

// ⑤ 재고 있는 상품의 이름만 (체이닝)
const availableNames = products
  .filter(function(p) { return p.inStock; })
  .map(function(p) { return p.name; });
```

### 챌린지 A — 배열 메서드 · movies
```js
const movies = [
  { id: 1, title: "인터스텔라", year: 2014, rating: 8.6 },
  { id: 2, title: "기생충",     year: 2019, rating: 8.5 },
  { id: 3, title: "라라랜드",   year: 2016, rating: 8.0 },
  { id: 4, title: "올드보이",   year: 2003, rating: 8.4 },
];
```
1. 모든 영화 제목만 담은 배열 만들기
2. 평점(rating) 8.5 이상인 영화만 거르기
3. 2010년 이후 개봉작의 제목만 추출 (filter + map)
4. 제목이 "기생충"인 영화 찾기

### 챌린지 B — db.json 확장
- db.json에 새 리소스를 직접 추가한다 (기존 `users` 옆에)
```json
"products"
// id, name, price 자유 구성
```
- 서버 실행 후 `/products`가 열리는지 확인

---

## ⚠️ 자주 하는 실수

### 배열 메서드
- ❌ **map / filter에서 return 누락**
  ```js
  arr.map(function(n) { n * 2; })         // [undefined, ...]
  arr.map(function(n) { return n * 2; })  // ⭕
  ```
- ❌ **filter가 true/false 반환 안 함** — filter의 콜백은 조건(`true/false`)을 return 해야 한다
- ❌ **find와 filter 혼동** — `find` → 값 하나, `filter` → 배열

### Date · 달력
- ❌ **getMonth()를 1~12로 착각** — getMonth()는 **0~11**. 6월은 5. 화면 표시는 `+1`
- ❌ **getDate()와 getDay() 혼동** — `getDate()` = 며칠 (1~31), `getDay()` = 무슨 요일 (0~6)
- ❌ **마지막 날 계산 혼동** — `new Date(year, month+1, 0).getDate()`가 이번 달 마지막 날. `+1`을 빠뜨리지 않는다
- ❌ **앞 빈 칸을 빠뜨림** — 1일 요일(`firstDay`)만큼 빈 칸을 먼저 넣어야 올바른 요일 자리에서 시작한다

### json-server
- ❌ **db.json JSON 문법 오류** — 마지막 항목 뒤 쉼표, 작은따옴표 → 서버가 안 켜진다. 오류 시 db.json부터 점검
- ❌ **설치 없이 yarn start** — `yarn add json-server@0.17.4`를 먼저. start 스크립트 오타도 확인
- ❌ **엉뚱한 폴더에서 실행** — `db.json · package.json`이 있는 폴더에서 실행. 터미널 현재 위치 확인

---

## ✅ 7강 정리
- 배열 메서드 4총사: `forEach`(실행만) · `map`(전부 가공→새 배열) · `filter`(조건 통과만→새 배열) · `find`(첫 매치 값 하나) — 콜백에서 **return 필수**
- 객체 배열은 `filter().map()` 체이닝으로 "조건에 맞는 것의 특정 속성만" 한 줄에 뽑는다
- `Date`는 월이 **0부터**(0~11), `getDate()`=며칠 / `getDay()`=요일(0=일). `padStart(2, "0")`로 `YYYY-MM-DD` 조합
- 달력 공식: `firstDay = new Date(y, m, 1).getDay()`만큼 빈 칸 → `lastDate = new Date(y, m+1, 0).getDate()`까지 숫자 칸
- `json-server --watch db.json`으로 `localhost:3000`에 데이터 서버 — db.json의 키가 곧 REST 엔드포인트(`/users`), Live Server(5500)와는 역할이 다르다

> **다음 → 8강**
