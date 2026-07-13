# 📙 LECTURE_08 — 비동기 · fetch

> localStorage · async/await · fetch CRUD · 정규식 · 모달 · Swiper · Day 08/13

## 개요

8강은 서버와 데이터를 주고받는 방법을 다룬다. 브라우저에 데이터를 영구 저장하는 localStorage, 기다림이 필요한 작업을 다루는 비동기 처리(async/await), Fetch API로 json-server와 GET·POST·PATCH·DELETE(CRUD) 요청을 주고받는 방법, 정규식으로 전화번호·이메일 입력값의 유효성을 검사하는 방법, 그리고 모달(이벤트 버블링·target/currentTarget)과 Swiper 슬라이더로 화면 UI 부품을 만드는 방법까지 학습한다. 7강의 json-server를 그대로 두고, fetch로 데이터를 주고받는 것이 핵심이다.

## 1. localStorage

### 1-1. localStorage란?

브라우저 안에 데이터를 저장하는 공간. **새로고침하거나 브라우저를 껐다 켜도** 데이터가 유지된다. 키-값 형태로 저장하며, 값은 항상 **문자열**이다. 비슷한 sessionStorage는 탭을 닫으면 사라진다.

| 저장 방식 | 새로고침 | 탭 닫기 |
|---|---|---|
| 변수 | 사라짐 | 사라짐 |
| sessionStorage | 유지 | 사라짐 |
| localStorage | 유지 | 유지 |

### 1-2. 사용법

- `.setItem(키, 값)` — 저장
- `.getItem(키)` — 읽기 → 문자열 or null
- `.removeItem(키)` — 하나 삭제
- `.clear()` — 전체 삭제

```js
// 기본 사용
localStorage.setItem("username", "홍길동");
localStorage.getItem("username"); // "홍길동"

// 객체는 JSON으로 변환해서 저장
const user = { name: "홍길동", age: 20 };
localStorage.setItem("user", JSON.stringify(user));

// 읽을 때 다시 파싱
const saved = JSON.parse(localStorage.getItem("user"));
```

### 1-3. 주의점

> **값은 항상 문자열로 반환된다.** 숫자로 쓸 때는 `Number()`로 변환한다.

```js
localStorage.setItem("count", 5);
localStorage.getItem("count"); // "5" (문자열로 반환)
Number(localStorage.getItem("count")); // 5 (숫자로 변환 후 사용)
```

> **민감한 정보(비밀번호 등)는 저장하지 않는다.** 브라우저에 그대로 노출된다.

> **내 브라우저 안에만 저장된다.** 다른 사람·기기와 공유되지 않는다. 여러 사람이 쓰는 데이터는 서버에 두어야 한다.

### 실습 ① — localStorage

localStorage와 sessionStorage에 값을 저장하고 화면에 표시한다.

```html
<!-- src/html/storage.html -->
<body>
  <div id="local"></div>
  <div id="session"></div>
  <script src="../js/storage.js"></script>
</body>
```

```js
// src/js/storage.js
localStorage.setItem("test", 1);
sessionStorage.setItem("test", 2);

window.onload = () => {
  document.querySelector("#local").textContent =
    `localStorage : ${localStorage.getItem("test")}`;
  document.querySelector("#session").textContent =
    `sessionStorage : ${sessionStorage.getItem("test")}`;
};
```

결과 점검: F12 → Application → Storage에서 저장값 확인, 새로고침해도 두 값 유지, 새 탭에서 열면 sessionStorage만 사라짐(localStorage는 유지), getItem이 문자열을 돌려준다는 점 확인.

## 2. 비동기 처리 — 동기 vs 비동기

- **동기(synchronous)**: 코드가 위에서 아래로 **한 줄씩 순서대로** 실행된다. 앞 작업이 끝나야 다음 작업을 한다. (라면이 다 끓을 때까지 가만히 서서 기다림)
- **비동기(asynchronous)**: 오래 걸리는 작업(서버 요청 등)을 **기다리지 않고** 다음 코드를 먼저 실행한다. (라면 올려두고, 끓는 동안 설거지를 함)

> 서버에서 데이터를 받아오는 fetch는 시간이 걸리므로 **비동기**로 처리한다.

## 3. async / await

비동기 작업을 순서대로, 읽기 쉽게 쓰는 문법.

- `async` : 함수를 비동기 함수로 만든다
- `await` : 작업이 끝날 때까지 기다렸다가 결과를 받는다 (async 함수 안에서만 쓸 수 있다)

```js
// async-example.js
async function loadData() {
  const result = await 오래걸리는작업();
  console.log(result);
}

// await가 없으면:
const result = 오래걸리는작업();
// → Promise 객체가 담김 (값이 아님)
```

> **Promise**: 비동기 작업의 완료(또는 실패)를 약속하는 객체. async 함수와 fetch가 반환하며, await로 결과를 꺼낸다.

## 4. Fetch API

JavaScript로 서버에 요청을 보내는 **내장 기능**. async 함수 안에서 await와 함께 사용한다.

- `await fetch(...)` — 서버에서 응답이 올 때까지 대기
- `await res.json()` — 본문을 JS 객체로 바꾸는 것도 대기

```js
// fetch-basic.js
async function getData() {
  // ① 서버 응답 대기
  const res = await fetch("주소", { 옵션 });
  // ② 본문 파싱도 대기
  const data = await res.json();
  console.log(data);
}
```

## 5. Fetch & CRUD

### 5-1. CRUD — 4가지 기본 동작

| 약자 | 의미 | 동작 | HTTP 메서드 |
|---|---|---|---|
| C | 생성 | Create | POST |
| R | 조회 | Read | GET |
| U | 수정 | Update | PATCH |
| D | 삭제 | Delete | DELETE |

json-server 주소: `http://localhost:3000/users`

> ① `yarn start` → port 3000 (json-server) ② Live Server → port 5500 — **두 서버를 동시에 켜둔다.**

### 5-2. GET — 조회

서버에서 데이터를 **가져온다**. 응답은 배열(목록 조회) 또는 객체(단건 조회).

```js
// get.js
async function getUsers() {
  const getRes = await fetch(
    `http://localhost:3000/users/`,
    { method: "GET" }
  );
  const users = await getRes.json();
  console.log("get", users);
}
getUsers();
```

> 특정 항목 조회: 주소 끝에 `/id`를 붙인다. `.../users/2` → id가 2인 사용자.

### 5-3. POST — 추가

서버에 새 데이터를 **추가한다**.

- body: `JSON.stringify(data)`
- Content-Type: `application/json`
- id: 서버가 자동 부여

```js
// post.js
async function postUsers() {
  const user = { name: "홍길동", age: 43 };
  const postRes = await fetch(
    `http://localhost:3000/users/`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }
  );
  const newUser = await postRes.json();
  console.log("post", newUser);
}
```

### 5-4. PATCH · DELETE

```js
// patch.js — 일부 수정
async function patchUsers() {
  const update = { age: 104 }; // 바꿀 항목만
  const patchRes = await fetch(
    `http://localhost:3000/users/5`,
    {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" },
    }
  );
  const updated = await patchRes.json();
  console.log("patch", updated);
}
```

```js
// delete.js — 삭제
async function deleteUsers() {
  await fetch(
    `http://localhost:3000/users/5`,
    { method: "DELETE" } // body 없음
  );
}
```

> 주소 끝 `/5`는 "id가 5인 사용자". **PUT은 전체 교체, PATCH는 일부만 수정.** DELETE는 body 없이 method만 보낸다.

### 5-5. 에러 대비 — try / catch

서버가 꺼져 있거나 주소가 틀리면 fetch는 실패한다. **try/catch**로 감싸면 오류가 나도 프로그램이 멈추지 않는다.

```js
// try-catch.js
async function getUsers() {
  try {
    const res = await fetch(
      `http://localhost:3000/users/`
    );
    const users = await res.json();
    console.log("get", users);
  } catch (error) {
    console.log("요청 실패:", error);
  }
}
```

### 실습 ② — CRUD

준비: ① 터미널에서 json-server 실행(`yarn start` → localhost:3000) ② Live Server로 crud.html 실행(localhost:5500) ③ 결과는 F12 Console 확인. 실습 파일: `src/html/crud.html`, `src/js/crud.js`

> 두 서버를 **동시에** 켜야 fetch가 동작한다. json-server가 꺼져 있으면 요청이 모두 실패한다.

crud.js에 getUsers() / postUsers() / patchUsers() / deleteUsers()를 작성한다(위 5-2~5-4 코드와 동일한 패턴, patch는 `/users/2`에 `{ age: 29 }` 예시).

결과 점검 체크리스트:
- getUsers() 결과로 사용자 목록이 Console에 보이는가?
- postUsers() 후 새 사용자가 id와 함께 출력되는가?
- patchUsers() 후 해당 항목의 age가 바뀌었는가?
- deleteUsers() 후 해당 항목이 사라졌는가?
- 서버를 끄고 실행하면 요청이 실패하는 것을 확인했는가?

## 6. 정규식 (Regex)

### 6-1. 정규식이란?

문자열이 특정 **패턴**에 맞는지 검사하는 도구. 주로 입력값 유효성 검사에 쓴다(전화번호 형식, 이메일 형식, 숫자만 입력 여부).

형식: `/패턴/` — 슬래시로 시작과 끝을 감싼다.

```js
/^010\d{8}$/           // 전화번호 패턴
/^[\w.]+@[\w.]+\.\w+$/  // 이메일 패턴
```

> 한글 환경에서 `\`(백슬래시)는 ₩로 보일 수 있다. 같은 문자다.

### 6-2. 기본 문법 ① — 문자 패턴

- `\d` : 숫자 한 글자 (0~9) — `\d\d\d` → 숫자 3개 연속
- `\D` : 숫자가 아닌 글자
- `\w` : 영문·숫자·`_` 한 글자 — `\w+` → 한 글자 이상
- `\s` : 공백 문자
- `.` : 아무 글자 하나 — 모든 문자(줄바꿈 제외)

### 6-3. 기본 문법 ② — 수량·위치·범위

수량:
- `a?` : a가 0개 또는 1개
- `a+` : a가 1개 이상
- `a{2}` : a가 정확히 2개
- `a{2,3}` : a가 2~3개

위치·범위·선택:
- `^a` : a로 시작
- `a$` : a로 끝남
- `[a-z]` : a~z 사이 한 글자
- 파이프 기호(세로 막대) : "a 또는 b" 선택

예: `/^010\d{8}$/` → 010으로 시작 + 숫자 8개 + 거기서 끝.

> `^`와 `$` 없으면 **일부만 맞아도 통과**되므로 전체 일치 검사에는 꼭 붙인다.

### 6-4. JS에서 정규식 쓰기 — .test()

패턴에 맞으면 `true`, 아니면 `false`.

```js
// regex.js
// 전화번호: 010 + 숫자 8개
const phoneRegex = /^010\d{8}$/;
phoneRegex.test("01012345678"); // true
phoneRegex.test("0101234");     // false

// 이메일
const emailRegex = /^[\w.]+@[\w.]+\.\w+$/;
emailRegex.test("hong@test.com"); // true
emailRegex.test("hong@");         // false
```

### 실습 ④ — 전화번호 검사

```html
<!-- src/html/validate.html (body) -->
<input id="phone" placeholder="010으로 시작하는 11자리">
<button id="checkBtn">확인</button>
<p id="result"></p>
<script src="../js/validate.js"></script>
```

```js
// src/js/validate.js
const phoneRegex = /^010\d{8}$/;
const input = document.querySelector("#phone");
const result = document.querySelector("#result");

document.querySelector("#checkBtn")
  .addEventListener("click", () => {
    if (phoneRegex.test(input.value)) {
      result.textContent = "올바른 번호입니다.";
    } else {
      result.textContent = "형식이 올바르지 않습니다.";
    }
  });
```

점검: 01012345678 → "올바른 번호" / 0101234 → "형식 오류".

## 7. 모달 (Modal)

### 7-1. 모달이란?

사용자의 입력이나 확인을 요구하는 창. **처리하기 전까지 다른 동작을 막는다.** 예: 로그인 팝업, "삭제하시겠습니까?" 확인 창, 경고창. 모달 뒤에는 화면 전체를 덮는 **backdrop**(반투명 배경)이 깔린다.

### 7-2. 모달 띄우기

1. 평소엔 모달을 숨겨둔다 (`display: none`)
2. 열기 버튼 클릭 → `display: flex`
3. 확인 버튼 클릭 → `display: none`

> **backdrop**: `position: fixed; inset: 0`으로 화면 전체를 덮는다.

```js
// modal-open.js
const openBtn = document.querySelector("#openBtn");
const backdrop = document.querySelector("#backdrop");

openBtn.addEventListener("click", () => {
  backdrop.style.display = "flex"; // 열기
});
```

### 7-3. 배경 클릭으로 닫기 — 문제

"배경을 클릭하면 모달이 닫히게" 하려고 backdrop에 클릭 이벤트를 달면, **모달 창(흰색 박스) 안을 클릭해도 닫혀버린다!**

```js
// 이런 코드의 문제점
backdrop.addEventListener("click", () => {
  backdrop.style.display = "none";
});
// 배경 클릭 → 닫힘 (정상)
// 박스 클릭 → 닫힘 (버그)
```

흰색 박스는 backdrop **안에** 들어 있어서, 박스를 클릭하면 backdrop의 클릭 이벤트까지 같이 발생한다.

### 7-4. 이벤트 버블링 & target

**이벤트 버블링**: 자식 요소에서 발생한 이벤트가 부모로 전파된다. (박스 클릭 → modal 이벤트 → backdrop으로 버블링)

- `event.target` : 실제로 클릭한 요소
- `event.currentTarget` : 이벤트 리스너가 달린 요소

정리:
- 배경 직접 클릭 → target과 currentTarget이 **같다**
- 박스 클릭 → target과 currentTarget이 **다르다**

### 7-5. 해결 — 배경만 클릭 시 닫기

`event.target === event.currentTarget` 조건으로 배경을 직접 클릭한 경우만 닫는다.

```js
// 올바른 코드
backdrop.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    backdrop.style.display = "none";
  }
});

// 확인 버튼은 별도로 항상 닫기
confirmBtn.addEventListener("click", () => {
  backdrop.style.display = "none";
});
```

### 실습 ⑤ — 모달

```html
<!-- src/html/modal.html (body) -->
<button id="openBtn">모달 열기</button>
<div id="backdrop" class="backdrop">
  <div class="modal">
    <p>확인 버튼을 누르거나 배경을 누르면 닫힙니다.</p>
    <button id="confirmBtn">확인</button>
  </div>
</div>
<script src="../js/modal.js"></script>
```

```css
/* src/css/modal.css */
.backdrop {
  display: none;            /* 평소엔 숨김 */
  position: fixed;
  inset: 0;                 /* 화면 전체 */
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
}
```

```js
// src/js/modal.js
const openBtn = document.querySelector("#openBtn");
const backdrop = document.querySelector("#backdrop");
const confirmBtn = document.querySelector("#confirmBtn");

openBtn.addEventListener("click", () => {
  backdrop.style.display = "flex";
});

confirmBtn.addEventListener("click", () => {
  backdrop.style.display = "none";
});

backdrop.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    backdrop.style.display = "none";
  }
});
```

체크리스트: 열기 버튼으로 모달이 뜨는가? / 확인 버튼으로 닫히는가? / 배경 클릭 시 닫히는가? / 흰 박스 클릭 시 안 닫히는가?

## 8. Swiper

### 8-1. Swiper란?

슬라이드(이미지 넘김)를 쉽게 만들어주는 라이브러리. **설치 없이 CDN**으로 연결해서 사용한다. 데모: swiperjs.com/demos

```html
<!-- <head>에 추가 -->
<!-- CSS -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<!-- JS -->
<script
  src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### 8-2. Swiper HTML 구조

클래스 이름은 고정 — 변경 불가 (`swiper` / `swiper-wrapper` / `swiper-slide`).

```html
<!-- swiper.html -->
<div class="swiper mySwiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide" style="background-color: red">Slide 1</div>
    <div class="swiper-slide" style="background-color: pink">Slide 2</div>
    <div class="swiper-slide" style="background-color: yellow">Slide 3</div>
    <div class="swiper-slide" style="background-color: green">Slide 4</div>
    <div class="swiper-slide" style="background-color: blue">Slide 5</div>
  </div>
  <div class="swiper-pagination"></div> <!-- 페이지 점 -->
</div>
```

### 8-3. Swiper 초기화

```css
/* CSS - 크기 지정 */
.swiper { width: 100%; height: 500px; }
.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100px;
  color: white;
}
```

```js
// JS - new Swiper() 초기화 (</body> 앞 <script>)
var swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false, // (교안 표기 disabledOnInteraction은 오타)
  },
});
```

### 실습 ⑥ — Swiper

`src/html/swiper.html`에 위 HTML 구조 + `<style>` + 초기화 `<script>`를 작성한다.

체크리스트: 슬라이드 5장이 보이는가? / 2초마다 자동으로 넘어가는가? (autoplay) / 아래 페이지 점(pagination)을 클릭하면 이동하는가? / 마지막 다음에 처음으로 돌아오는가? (loop)

확장 도전(자유):
1. 좌우 화살표 추가 (navigation 옵션) — HTML에 `.swiper-button-prev` / `.swiper-button-next` 추가
2. loop·autoplay를 끄고 직접 넘겨보기
3. 슬라이드 내용을 이미지로 바꿔보기

## 9. 자주 하는 실수

### 비동기 · fetch

- `const users = fetch(...)` (X) → `const users = await fetch(...)` (O) — await 빠뜨림 → Promise가 담김. await는 async 함수 안에서만.
- `const data = res.json()` (X) → `const data = await res.json()` (O) — res.json()에도 await 필요.
- json-server를 안 켠 채 fetch 실행 (X) → `yarn start`(3000) + Live Server(5500) 동시 실행 (O) — 3000번 서버가 꺼져 있으면 실패.
- POST/PATCH에서 `body: user` (X) → `body: JSON.stringify(user), headers: { Content-Type: application/json }` (O) — stringify 누락 주의.

### 모달 · Swiper · 정규식

- target === currentTarget 조건 누락 (X) → `if (event.target === event.currentTarget)` (O) — 박스 클릭에도 모달이 닫힘.
- backdrop이 처음부터 보이게 둠 (X) → `.backdrop { display: none; }` → 열 때 flex로 변경 (O) — CSS 초기값 필수.
- Swiper 클래스 이름 변경 (X) → swiper / swiper-wrapper / swiper-slide 고정 (O) — 기본 클래스는 그대로 두고 추가 클래스만 더한다(mySwiper).
- 정규식에서 `^` · `$` 누락 (X) → `/^패턴$/` 형태로 사용 (O) — 일부만 맞아도 통과됨.

## 10. 오늘 정리

- **localStorage** — 브라우저에 데이터를 영구 저장, 새로고침해도 유지
- **async / await** — 비동기 작업을 순서대로 기다리며 처리
- **fetch CRUD** — GET · POST · PATCH · DELETE로 서버와 데이터를 주고받는다
- **정규식** — .test()로 전화번호·이메일 입력값 유효성 검사
- **모달 · Swiper** — 이벤트 버블링을 이해하고 UI 부품을 직접 만든다

> 다음 강: React 기초 — 컴포넌트 기반 개발, JSX · props · state

## 실습 과제

1. **실습 ① localStorage** — storage.html/storage.js: localStorage·sessionStorage에 값을 저장하고 화면에 표시, F12 Application 탭에서 확인, 새 탭에서 유지 여부 비교.
2. **실습 ② CRUD** — crud.html/crud.js: json-server(3000) + Live Server(5500)를 동시에 켜고 getUsers / postUsers / patchUsers / deleteUsers를 작성해 Console로 확인. 서버를 끄면 실패하는 것도 확인.
3. **실습 ③ 게시판 만들기 (도전, 정답 코드 미제공)** — db.json에 posts 추가: `"posts": [ { "id": 1, "title": "첫 글", "content": "안녕하세요" } ]`, 엔드포인트 `http://localhost:3000/posts`.
   - R: 페이지가 열리면 글 목록을 불러와 화면에 표시 (GET)
   - C: 제목·내용 입력 + 등록 → 새 글 추가 후 목록 갱신 (POST)
   - U: 각 글의 수정 버튼 → 내용 변경 후 목록 갱신 (PATCH)
   - D: 각 글의 삭제 버튼 → 해당 글 삭제 후 목록 갱신 (DELETE)
   - 힌트: 실습 ②의 users 코드를 posts로 바꾸면 거의 그대로. 배열을 돌며 li를 만들어 DOM에 삽입, 특정 글은 주소 끝에 /id, 쓰기 후 다시 GET 해서 목록을 새로 그린다.
4. **실습 ④ 전화번호 검사** — validate.html/validate.js: `/^010\d{8}$/`로 입력값 검사, 결과 메시지 표시.
5. **실습 ⑤ 모달** — modal.html/modal.css/modal.js: 열기/확인 버튼, 배경 클릭 닫기(target === currentTarget), 박스 클릭 시 안 닫히는지 확인.
6. **실습 ⑥ Swiper** — swiper.html: CDN 연결, 슬라이드 5장 + pagination + autoplay + loop. 확장: navigation 화살표, autoplay 끄기, 이미지 슬라이드.
