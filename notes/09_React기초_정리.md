# 📙 LECTURE_09 — React 기초

> React · Vite · JSX/TSX · TypeScript · 컴포넌트 · props · useState · 이벤트 · Day 09/13

## 개요

React 소개 & 컴포넌트 강의(9강). 라이브러리·프레임워크 개념부터 시작해 React가 무엇인지, 왜 필요한지 이해하고, Vite로 React + TypeScript 프로젝트를 만들어 실행한다. JSX·TSX 문법, TypeScript 기본 타입과 interface, 함수형 컴포넌트와 props, useState로 상태 관리, onClick·onChange 이벤트 처리까지 — 바닐라 JS로 DOM을 직접 그리던 방식에서 벗어나 "화면 스스로 바뀌는 값(상태)"을 다루는 React 방식의 화면 만들기를 배운다.

## 1. React란? — 라이브러리와 프레임워크 (4~11p)

### 1-1. 라이브러리 vs 프레임워크 (5~6p)

화면을 만들 때 지금까지는 모든 것을 직접 작성했다. 남이 잘 만들어 둔 코드 묶음을 가져다 쓰면 훨씬 빠르다.

| 구분 | 라이브러리 (library) | 프레임워크 (framework) |
|---|---|---|
| 정의 | 필요한 기능을 "내가 불러다" 쓰는 도구 | "정해진 틀·규칙" 위에서 내가 코드를 채워 넣는 도구 |
| 흐름의 주도권 | 전체 흐름은 내가 잡고, 필요할 때 호출 | 전체 흐름은 프레임워크가 잡고, 빈칸을 내가 채움 |
| 예 | 7강의 Swiper — 내가 원할 때 호출 | — |

비유: 라이브러리 = 필요한 가구를 골라 내 방에 들이는 것(내가 주도). 프레임워크 = 이미 골격이 세워진 집에 들어가 인테리어만 하는 것(틀이 주도).

> React는 엄밀히는 **라이브러리**지만, 보통 프레임워크처럼 틀을 잡아 쓴다. 지금은 "화면(UI)을 만드는 도구" 정도로 알면 충분하다.

### 1-2. 프론트엔드 3대 도구 (7p)

| 도구 | 제작 | 특징 |
|---|---|---|
| React | Meta | 컴포넌트 기반 UI 라이브러리. 가장 널리 쓰이며 생태계가 크다 |
| Vue | community | 가볍고 배우기 쉬워 빠른 개발에 좋다 |
| Angular | Google | 틀과 규칙이 갖춰진 프레임워크. 대규모 앱에 적합 |

셋 다 "컴포넌트로 화면을 조립한다"는 생각은 같다. 이 강의에서는 가장 많이 쓰이는 **React**를 배운다.

### 1-3. React란? (8p)

화면(UI)을 **"컴포넌트"**라는 부품으로 나누어 만드는 도구.

- **컴포넌트** — 화면을 이루는 재사용 가능한 조각. 예: 버튼, 카드, 헤더, 목록의 한 줄…

React의 핵심 아이디어:
1. 화면을 작은 부품(컴포넌트)으로 쪼갠다
2. 부품을 조립해서 전체 화면을 만든다
3. 데이터가 바뀌면 화면을 React가 알아서 다시 그린다

> 우리가 직접 querySelector로 찾아 바꾸지 않아도, "데이터가 이러면 화면은 이렇게"만 적으면 React가 반영한다.

### 1-4. 왜 React인가 — 바닐라 JS의 한계 (9~10p)

화면이 복잡해질수록 바닐라 JS는 손이 많이 간다.

- "어디를 바꿔야 하는지" 직접 다 챙겨야 한다
- 같은 모양(카드 등)을 여러 번 복사·붙여넣기 한다
- 데이터와 화면이 따로 놀아 실수가 잦아진다

```js
// vanilla.js
const title = document.querySelector("#title");
title.textContent = "새 제목";
// 바꿀 곳이 늘수록 querySelector·수정 코드가 계속 늘어난다
```

React는 **부품으로 한 번 만들면 재사용**하고, 데이터만 바꾸면 화면을 다시 그려준다.

**바닐라 JS vs React 비교:**

- 바닐라 — 찾아서 직접 채운다: 요소를 만들고 → 찾고 → 값을 넣는 3단계

```html
<h1 id="title"></h1>
<script>
  document.querySelector("#title")
    .textContent = "안녕";
</script>
```

- React — 화면을 그대로 적는다: "이런 화면"이라고 적으면 끝

```tsx
function Hello() {
  return <h1>안녕</h1>;
}
```

> React는 "어떻게 바꿀까"가 아니라 "지금 화면은 이렇다"를 적는 방식이다.

### 1-5. Vite란? (11p)

Vite(비트)는 React 프로젝트를 **만들고 실행**해주는 개발 도구다.

1. 프로젝트 틀 만들기 — `npx create-vite` 한 줄로 파일·설정 준비
2. 개발 서버 띄우기 — `yarn dev`로 작성 중인 화면을 바로 보여줌

비유: React = 화면을 만드는 **'재료'**, Vite = 재료를 조립하고 실행해주는 **'작업대'**.

> 우리가 쓴 .tsx·TypeScript 코드를 브라우저가 이해하는 JS로 바꿔주는 일도 Vite가 한다.

## 2. 프로젝트 세팅 (12~19p)

### 2-1. 첫 React 프로젝트 — 4단계 (13p)

Vite가 프로젝트의 틀을 대신 만들어준다. 한 단계씩 함께 따라 만든다.

1. **프로젝트 생성** — 명령어로 프로젝트 틀 만들기
2. **폴더로 이동** — 만들어진 폴더 안으로 들어가기
3. **패키지 설치** — 동작에 필요한 부품 내려받기
4. **서버 실행·확인** — 화면을 띄워 잘 만들어졌는지 보기

### 2-2. ① 프로젝트 생성 (14p)

VSCode에서 터미널을 연다 — Terminal → New Terminal (또는 Ctrl + `)

```bash
npx create-vite@latest my-app --template react-ts
```

| 부분 | 의미 |
|---|---|
| npx create-vite | Vite로 새 프로젝트를 만든다 (1회성 생성 도구) |
| my-app | 만들어질 폴더(프로젝트) 이름 |
| --template react-ts | React + TypeScript 틀로 만든다 (.ts / .tsx 생성) |

잠시 후 my-app 폴더가 생기면 성공이다.

### 2-3. ② 폴더로 이동 & 열기 (15p)

```bash
cd my-app
```

- `cd` = "change directory", 폴더를 이동하는 명령이다. 터미널 줄 앞에 my-app이 보이면 잘 들어온 것.
- VSCode로 열기: File → Open Folder → my-app. 앞으로 모든 작업은 이 my-app 폴더 안에서 한다.

### 2-4. ③ 패키지 설치 · ④ 서버 실행 (16p)

```bash
yarn install
```

- 명령 한 번이면 필요한 부품이 모두 설치된다. 설치가 끝나면 `node_modules` 폴더가 새로 생긴다(직접 열 일은 없다).

```bash
yarn dev
# VITE ready
# → Local: http://localhost:5173/
```

- 저장하면 화면이 자동 새로고침. 중지는 Ctrl + C.

> Live Server(5500)가 아니라 **5173**에서 확인한다. 반드시 my-app 폴더 안에서 실행한다.

### 2-5. 프로젝트 폴더 구조 (17p)

```
my-app/
├─ index.html      # 시작 HTML (<div id="root">)
├─ package.json    # 패키지·실행 명령
└─ src/
   ├─ main.tsx     # React를 #root에 연결 (시작점)
   ├─ App.tsx      # 우리가 만드는 첫 컴포넌트
   ├─ App.css      # App 스타일
   └─ index.css    # 전체 기본 스타일
```

화면을 그리는 흐름: `index.html`의 `<div id="root">` ← `main.tsx`가 여기에 App을 그린다.

> main.tsx는 Vite가 미리 만들어 둔다. 지금은 그대로 두고, 우리는 **App.tsx부터** 직접 고친다.

### 2-6. 확장 프로그램 — ESLint (18p)

**ESLint** — 코드를 분석해 문법 오류·스타일 문제를 찾아 알려주는 도구.

설치: 왼쪽 확장 프로그램(Extensions) 아이콘 클릭 → "ESLint" 검색 → 만든 곳이 **Microsoft**인 것(첫 번째) 설치.

```js
// eslint.config.js — rules만 추가
{
  files: ['**/*.{ts,tsx}'],
  rules: {
    '@typescript-eslint/no-unused-vars':
      'warn', // 경고로 표시
  },
}
```

> 규칙 값 — `'off'` 끔 · `'warn'` 경고 · `'error'` 에러.

### 2-7. App.tsx 첫 수정 (19p)

src/App.tsx의 기본 코드를 모두 지우고 아래로 바꿔본다. 저장(Ctrl + S)하면 브라우저 화면이 자동으로 바뀐다.

```tsx
// src/App.tsx
function App() {
  return <h1>나의 첫 React 화면</h1>;
}

export default App;
```

> 글자를 다른 내용으로 바꿔 저장 → 화면도 바로 바뀐다. `return` 뒤의 `<h1>...</h1>` — 이 바로 다음에 배울 **JSX**다.

## 3. JSX · TypeScript (20~31p)

### 3-1. JSX란? (21p)

**JavaScript 안에서 HTML처럼 화면을 작성**하는 문법. 원래 JS에 없던 'HTML처럼 화면 쓰기'를 더해준다.

```tsx
// Page.tsx
function Page() {
  return (
    <div>
      <h1>제목</h1>
      <p>내용</p>
    </div>
  );
}
```

- 진짜 HTML이 아니라 **JS로 변환**되어 동작한다 (변환은 Vite가 처리)
- 덕분에 화면 구조와 JS 로직을 **한곳에서** 다룰 수 있다
- `return` 뒤에 HTML처럼 생긴 것이 JSX다

### 3-2. JSX 규칙 ① — 부모로 감싸기 · 태그 닫기 (22p)

**① 반드시 하나의 부모로 감싼다**

```tsx
// X 형제 태그 두 개를 그대로 반환 — 오류
return <h1>제목</h1><p>내용</p>;

// O 하나의 부모로 감싸기
return <div><h1>제목</h1><p>내용</p></div>;
```

> 감쌀 태그가 마땅찮으면 빈 태그(Fragment) `<> ... </>`를 쓴다.

**② 모든 태그를 닫는다**

```tsx
// X  <img src="...">        <br>
// O  <img src="..." />      <br />
```

### 3-3. JSX 규칙 ② — className · camelCase (23p)

**③ class 대신 className을 쓴다**

```tsx
// X  <div class="card">
// O  <div className="card">
```

`class`는 JS 예약어라 React에서는 `className`.

**④ 속성은 camelCase로 쓴다**

- `onclick` → `onClick`, `htmlfor` → `htmlFor`

> HTML과 거의 같지만, 위 네 가지가 자주 틀리는 지점이다.

### 3-4. JSX 안에서 JS 쓰기 — {} (24p)

중괄호 `{ }` 안에는 JavaScript **표현식**을 넣을 수 있다.

```tsx
// Welcome.tsx
function Welcome() {
  const name = "홍길동";
  return <h1>{name}님 환영합니다</h1>;
}
// → 홍길동님 환영합니다
```

계산·속성에도 쓸 수 있다:

```tsx
{1 + 2}                      // 3
{name.toUpperCase()}         // 함수 결과
<img src={imageUrl} />       // 속성 값에 변수
```

### 3-5. {} 주의 & 조건 표시 (25p)

- `{ }` 안에는 **"값이 되는 식"**만 넣는다. `if`·`for` 같은 문장은 넣을 수 없다.
- 조건에 따라 다르게 보여주려면 **삼항 연산자**를 쓴다: `조건 ? (참일 때 값) : (거짓일 때 값)`

```tsx
const isOk = true;
return <p>{isOk ? "통과" : "실패"}</p>;
// → 통과
```

> 이 삼항 표시는 오늘 실습(매운맛 여부 등)에서 바로 쓰인다.

### 3-6. JSX에서 TSX로 — 파일 확장자 (26p)

파일 확장자가 우리가 쓰는 문법을 말해준다.

| 확장자 | 의미 |
|---|---|
| .js | 일반 JavaScript |
| .jsx | JavaScript + JSX (화면 작성) |
| .ts | TypeScript (타입이 있는 JS) |
| .tsx | TypeScript + JSX ← 우리가 쓰는 것 |

**TSX = JSX + TypeScript.** 화면을 쓰고(JSX) 값에 타입을 붙인다(TS).

### 3-7. TypeScript란? 왜 쓰나 (27~28p)

**TypeScript = JavaScript + 타입(type).** 값이 "어떤 종류"인지 미리 정해두는 것이다.

왜 쓰나:
1. 실수를 **실행 전에** 잡아준다
2. 자동완성이 똑똑해진다 (객체의 속성 등)
3. 코드만 봐도 어떤 값이 오가는지 알 수 있다

```ts
// type.ts
let age = 20;            // JS: 그냥 값
let age: number = 20;    // "이건 숫자다"

age = "스무살";
// X 숫자 자리에 문자열 → 빨간 줄
```

> 브라우저는 JS만 이해하지만, Vite가 .ts/.tsx를 자동으로 JS로 바꿔준다.

**동적 타입 vs 정적 타입:**

| 구분 | JavaScript (동적 타입) | TypeScript (정적 타입) |
|---|---|---|
| 타입 결정 | 실행 중에 정해지고, 도중에 바뀌어도 됨 | 미리 정해두고, 어기면 작성 중에 알려줌 |
| 오류 발견 | 엉뚱한 타입 때문에 실행 중에야 발견 | 작성 단계에서 빨간 줄 → 코드 쓰는 중에 잡음 |

```ts
// JavaScript — 허용
let x = 10;   // 지금은 숫자
x = "열";     // 문자열로 바뀜 — 허용

// TypeScript — 작성 중 오류
let x: number = 10;
x = "열";     // X 작성 단계에서 빨간 줄
```

### 3-8. 기본 타입 (29p)

변수 이름 뒤에 `: 타입`을 붙인다. 배열도 "무엇의 배열인지" 정한다.

```ts
// basic-types.ts
let userName: string = "홍길동";  // 문자열
let age: number = 20;             // 숫자
let isStudent: boolean = true;    // 참/거짓

// 배열 — 무엇의 배열인지 정한다
let scores: number[] = [90, 85, 70];
let names: string[] = ["김", "이", "박"];
```

```ts
age = "스무살";
// X number 자리에 문자열 — 오류
```

### 3-9. 함수 타입 — 매개변수 · 반환값 (30p)

함수는 **매개변수**와 **반환값**에 타입을 붙인다.

```ts
// add.ts
function add(a: number, b: number): number {
  return a + b;
}

add(1, "둘");
// X 두 번째 자리는 number — 호출할 때 경고
```

- `a: number, b: number` — 매개변수 타입
- `): number` — 반환값 타입

### 3-10. 객체 타입 — interface (31p)

객체는 "어떤 속성을 가지는지" 모양을 정한다. `interface`로 객체의 틀을 만든다.

```ts
// user.ts
interface User {
  name: string;
  age: number;
}

const user: User =
  { name: "홍길동", age: 20 };

// type으로도 가능
type User = { name: string; age: number };
```

- name(문자열)·age(숫자)가 반드시 있어야 한다
- 빠뜨리거나 타입이 다르면 경고가 뜬다
- `type`으로도 같은 일을 할 수 있다

## 4. 컴포넌트 & props (32~47p)

### 4-1. 클래스형 vs 함수형 컴포넌트 (33~34p)

React 컴포넌트를 만드는 방식은 두 가지다.

- **클래스형 (class)** — 참고용, 직접 쓰지 않음. 예전 방식이고 코드가 길다.

```tsx
class Hello extends React.Component {
  render() {
    return <h1>안녕하세요</h1>;
  }
}
```

- **함수형 (function)** — 우리가 쓸 방식. 현재 표준, 짧고 간결하다.

```tsx
function Hello() {
  return <h1>안녕하세요</h1>;
}
```

왜 함수형을 쓸까:
- 함수형에도 상태 기능(**Hook**)이 추가되며 클래스형이 거의 불필요해졌다
- `this`·`constructor` 같은 복잡한 부분이 없어 짧고 읽기 쉽다
- 그래서 지금 React는 **함수형이 기본**. 이 강의도 함수형만 사용한다

> 참고: constructor = 클래스가 처음 만들어질 때 값을 준비하는 부분. this = 클래스 안에서 '자기 자신'을 가리키는 말 — 매번 짚어야 해 헷갈림.

### 4-2. 함수형 컴포넌트 만들기 (35p)

컴포넌트 = JSX(TSX)를 **return 하는 함수**. return 위에서 값을 만들고, JSX에서 `{ }`로 표시한다.

```tsx
// Hello.tsx
function Hello() {
  const hour = 9;
  const message = hour < 12
    ? "좋은 아침이에요" : "안녕하세요";
  return <h1>{message}</h1>;
}

export default Hello;
```

- 이름은 반드시 **대문자로 시작** (Hello, Card) — 소문자면 React가 HTML 태그로 착각한다
- `export`로 내보내 `import`로 가져온다 · 파일 1개 = 컴포넌트 1개

### 4-3. 컴포넌트 사용 · 재사용 (36p)

만든 컴포넌트는 `<태그>`처럼 쓴다. 여러 번 써도 된다.

```tsx
// App.tsx
import Hello from "./Hello";

function App() {
  return (
    <div>
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}
```

한 번 만든 부품을 여러 곳에서 재사용 — 이것이 컴포넌트의 핵심이다.

> 지금은 셋 다 똑같다. 각각 다른 내용을 주려면 → **props**.

### 4-4. props란? (37p)

**props** = 부모가 자식 컴포넌트에 내려주는 데이터. HTML 속성을 적듯이 전달한다.

```tsx
// App.tsx — props 전달
<Card title="HTML" description="웹의 뼈대" />
<Card title="CSS" description="화면 꾸미기" />
// 같은 Card라도 props가 다르면 다른 내용이 나온다
```

전달하는 값의 종류:
- 문자열 — `title="HTML"` (따옴표)
- 그 외 — `count={3}` (중괄호 — 숫자·변수)

### 4-5. props 데이터 흐름 (38p)

props는 부모 컴포넌트 → 자식 컴포넌트로 **'한 방향'**으로 흐른다.

1. 부모: App — `<Card title="HTML" description="웹의 뼈대" level={1} />`
2. props 전달 (부모 → 자식)
3. 자식: Card — 받은 값을 화면에 표시

> 흐름은 항상 부모 → 자식 한 방향. 자식은 받은 props를 **표시만** — 직접 바꾸지 않는다.

### 4-6. props 흐름 3단계 — 전달 · 받기 · 표시 (39p)

1. **전달** — 부모(App)가 값을 넘긴다: `<Card title="HTML" description="웹의 뼈대" level={1} />`
2. **받기** — 자식(Card)이 props로 받는다: `function Card({ title, description, level }) {`
3. **표시** — JSX에서 `{ }`로 화면에 그린다: `<h2>{title}</h2>` `<p>{description}</p>`

같은 Card라도 ①에서 주는 값이 다르면 화면도 다르게 나온다.

### 4-7. props 타입 지정 (interface) (40p)

props가 "어떤 모양인지" `interface`로 정한다.

```tsx
// Card.tsx
interface CardProps {
  title: string;
  description: string;
}

function Card(props: CardProps) {
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}
```

- props 객체의 타입이 CardProps로 정해진다
- 빠뜨리거나 타입이 다르면 경고가 뜬다
- `props.title`처럼 점(.)으로 꺼내 쓴다

### 4-8. props 받아 쓰기 — 구조 분해 (41p)

매번 `props.title` 대신, **구조 분해**로 바로 꺼내 쓰면 더 깔끔하다.

```tsx
// Card.tsx — 구조 분해
function Card({ title, description }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
// props.title 방식과 결과는 같다
```

- `{ title, description }` — 두 값을 바로 꺼낸다
- `: CardProps` — 그 props의 타입을 지정한다
- 실무에서는 이 구조 분해 방식을 더 많이 쓴다

### 4-9. 실습 ① — 카드 컴포넌트 (42~44p)

props로 제목·설명·난이도(숫자)를 받는 Card를 만들고, 난이도로 별(★)을 계산해 카드 3개를 나란히 배치한다.

만들 파일: `src/Card.tsx`(카드 컴포넌트: 타입 + 별 계산), `src/App.tsx`(Card를 가져와 3개 배치), `src/App.css`(카드 스타일)

진행 순서:
1. Card.tsx 작성 (interface + 별 계산)
2. App.tsx에서 import 후 `<Card/>` 3개
3. App.css로 카드 모양 꾸미기
4. yarn dev로 화면 확인

```tsx
// src/Card.tsx
interface CardProps {
  title: string;  description: string;  level: number;
}

function Card({ title, description, level }: CardProps) {
  const stars = "★".repeat(level);  // 별 개수 계산
  return (
    <div className="card">
      <h2>{title}</h2>  <p>{description}</p>
      <p className="level">난이도 {stars}</p>
    </div>
  );
}

export default Card;
```

> 핵심: `"★".repeat(level)`로 별 개수를 계산 → 계산한 stars를 JSX에서 `{}`로 표시 → 마지막 `export default`를 잊지 않는다.

```tsx
// src/App.tsx
import Card from "./Card";
import "./App.css";

function App() {
  return (
    <div className="card-list">
      <Card title="HTML" description="웹의 뼈대" level={1} />
      <Card title="CSS" description="화면 꾸미기" level={2} />
      <Card title="JavaScript" description="동작" level={3} />
    </div>
  );
}

export default App;
```

```css
/* src/App.css */
.card-list {
  display: flex;  gap: 16px;
  flex-wrap: wrap;  padding: 24px;
}
.card {
  width: 220px;  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}
.card .level { color: #e67e22;  font-weight: bold; }
```

> 숫자 prop은 중괄호로 전달 — `level={1}`.

**결과 점검 체크리스트:**
- yarn dev 후 localhost:5173에서 카드 3개가 보이는가?
- 카드마다 제목·설명이 다르게 나오는가?
- 카드마다 난이도 별(★)이 level 숫자만큼 표시되는가?
- 카드가 가로로 나란히 배치되는가? (flex)
- Card에서 title을 지우면 빨간 줄(타입 경고)이 뜨는가?
- 네 번째 `<Card />`를 추가하면 바로 나타나는가?

### 4-10. 추천 방법 — 실습 파일 관리 (45p)

각 실습을 **별도 컴포넌트 파일**로 만들고, App.tsx는 보여줄 것만 골라 import한다.

```tsx
// src/App.tsx
import Card from "./Card";
// import Counter from "./Counter";

function App() {
  return <Card />;
  // return <Counter />;
}

export default App;
```

- 보고 싶은 실습만 주석을 풀어 전환 → 만든 실습 파일이 모두 그대로 보존된다
- 9강에서 배운 import·export를 그대로 재사용 → 새 개념 추가 없음
- 라우터 불필요 — 화면 전환 도구 없이 파일만 바꿔 가며 확인

### 4-11. 실습 ② — 스스로 완성하기 (47p)

메뉴 카드 컴포넌트를 직접 만들어, 재사용해서 서로 다른 메뉴 카드를 **3개 이상** 띄운다. 정답 코드는 제공하지 않는다.

요구사항:
1. 새 컴포넌트 파일 (MenuCard.tsx)
2. props 타입을 interface로 정의
3. props 최소 3가지 — name·price·spicy
4. App.tsx에서 서로 다른 메뉴 3개 이상 배치
5. CSS로 최소한의 스타일

도전 항목 (여유 되면):
- 메뉴 사진 추가 — `imageUrl: string`
- 정보 더 — kcal·soldOut
- 매운맛 카드만 다른 색으로 — `{spicy ? "매움" : "순한맛"}`

## 5. 상태 (state) (48~60p)

### 5-1. 상태(state)가 필요한 이유 (49p)

props는 부모가 내려준 값이라, 자식은 바꿀 수 없었다(한 방향으로 흐르고, 받은 값을 '표시'만 한다). 그런데 화면에는 **'사용자가 바꾸는 값'**이 아주 많다.

화면에서 변하는 값들: 좋아요 수·카운트, 입력창에 친 글자, 메뉴의 열림/닫힘, 체크박스의 체크 여부…

> 이렇게 화면 안에서 변하는 값을 담는 것이 **상태(state)**다.

### 5-2. props vs state 한눈에 (50p)

| 구분 | props | state |
|---|---|---|
| 무엇 | 부모가 내려준 값 | 내 컴포넌트가 가진 값 |
| 누가 바꿈 | 자식은 못 바꿈 (읽기 전용) | set함수로 내가 바꿈 |
| 바뀌면 | 부모가 다시 주면 바뀜 | set하면 화면 자동 갱신 |
| 방향 | 부모 → 자식 | 컴포넌트 내부 |
| 예 | `<Card title="..." />` | `useState(0)`, `useState("")` |

> props는 '받아서 표시', state는 '내가 바꿔서 갱신'.

### 5-3. 일반 변수로는 왜 안 될까? (51p)

그냥 변수를 바꾸면 **값은 바뀌지만 화면은 그대로**다.

```tsx
// Counter.tsx — 안 되는 예
function Counter() {
  let count = 0;
  return (
    <button onClick={() => {
      count = count + 1;
      console.log(count);
    }}>{count}</button>
  );
}
// 콘솔엔 1,2,3 / 화면엔 0
```

- 버튼을 누르면 콘솔엔 1, 2, 3… 이 찍힌다. 하지만 화면의 숫자는 0 그대로.
- 왜? React는 "화면을 다시 그려야 할 이유"를 모르기 때문이다. → 그 값을 '상태'로 만들어야 한다.

### 5-4. 상태를 그림으로 이해하기 (52p)

야구장 전광판 비유:
- **상태(state)** = 전광판에 적힌 '현재 점수'
- **set함수** = "점수 바뀜!" 라고 알리는 행동 → 전광판이 새 숫자로 다시 켜진다 (리렌더링)
- **일반 변수** = 내 수첩에만 적은 점수 → 전광판(화면)에는 아무 변화가 없다

> 값을 바꾸기만 해선 안 되고, "바뀠다"고 **set함수로 알려야** 화면이 새로 그려진다.

### 5-5. useState란? (53p)

**useState = React가 주는 '상태 만들기' 도구(Hook).** 이걸로 만든 값은 바뀌면 React가 화면을 다시 그려준다.

```tsx
// App.tsx
import { useState } from "react";

const [count, setCount] = useState(0);
// useState(0) — 0을 초기값으로 상태를 만든다
```

> Hook이란? use로 시작하는 React 기능 (useState, useEffect …). 컴포넌트 함수 안에서 호출한다.

### 5-6. useState 구조 뜯어보기 (54p)

```tsx
const [count, setCount] = useState(0);
```

| 부분 | 의미 |
|---|---|
| count | 상태값 — 현재 값, 읽기 전용 |
| setCount | 변경 함수 — 이 함수로만 값을 바꾼다 |
| 0 | 초기값 — 처음 값 |

```tsx
count = count + 1;        // X 직접 대입 금지
setCount(count + 1);      // O set함수로 변경
```

### 5-7. 상태 변경 → 리렌더링 흐름 (55p)

`setCount(count + 1)`을 실행하면:
1. count 값이 새 값으로 바뀐다
2. React가 컴포넌트를 다시 실행한다 (**리렌더링**)
3. 새 count로 화면이 다시 그려진다

흐름: 이벤트 발생 → set함수 호출 → 리렌더링 → 화면 갱신

### 5-8. 상태로 만드는 것들 (56p)

화면에서 변하는 값은 무엇이든 상태가 된다.

| 종류 | 예 | 코드 |
|---|---|---|
| 숫자 | 좋아요 수, 상품 개수, 카운터 | `useState(0)` |
| 문자열 | 검색어, 입력창의 글자 | `useState("")` |
| 참/거짓 | 모달 열림, 다크모드, 체크 여부 | `useState(false)` — 10강에서 |
| 배열 | 할 일 목록, 검색 결과 | `useState<Todo[]>([])` — 10강에서 |

> 9강은 숫자(카운터)·문자열(미리보기)을 실습한다.

### 5-9. onClick으로 상태 바꾸기 (57p)

버튼 클릭에 반응하려면 `onClick`에 **'실행할 함수'**를 준다.

```tsx
// App.tsx
<button
  onClick={() => setCount(count + 1)}
>
  +1
</button>
```

- 클릭하면 setCount 실행 → 리렌더링 → 숫자가 바뀐다
- `() => setCount(...)` — 클릭 시 실행할 함수를 화살표로 감쌌다

> onClick에는 '함수'를 넘긴다.

### 5-10. 실습 ③ — 카운터 (58~60p)

버튼을 눌러 숫자를 1씩 올리고 내리는 카운터. useState로 상태를 만들고, 버튼 onClick으로 값을 바꾼다.

진행 순서: 1) useState로 count 상태 만들기 → 2) +1·-1·초기화 버튼에 onClick 연결 → 3) 현재 count를 화면에 표시 → 4) yarn dev로 확인

```tsx
// src/Counter.tsx
import { useState } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="counter">
      <p className="count">{count}</p>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>초기화</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

export default Counter;
```

```css
/* src/Counter.css */
.counter { text-align: center;  padding: 40px; }
.count {
  font-size: 64px;  font-weight: bold;  margin: 16px 0;
}
.buttons {
  display: flex;  gap: 12px;  justify-content: center;
}
```

> count는 직접 바꾸지 않고 setCount로만 바꾼다. App.tsx에서 `import Counter` 후 `<Counter />` 렌더 — 45p 방식.

**결과 점검:**
- +1을 누르면 숫자가 1씩 커지는가?
- -1을 누르면 숫자가 1씩 작아지는가?
- 초기화를 누르면 0으로 돌아가는가?
- 숫자가 바뀔 때 화면이 즉시 갱신되는가? (리렌더링)

> 도전: -1을 0 미만으로 못 내려가게 막아보기 — `setCount(count > 0 ? count - 1 : 0)`

## 6. 이벤트 (61~70p)

### 6-1. React 이벤트 — onClick (62p)

요소를 찾을 필요 없이 **태그에 바로 붙인다**. 이벤트 이름은 camelCase — onClick · onChange · onSubmit.

```js
// 바닐라 JS — 요소를 찾아서 연결한다
const btn = document
  .querySelector("button");
btn.addEventListener("click", handleClick);
```

```tsx
// React — 태그에 바로 붙인다
<button onClick={handleClick}>
  <Text>클릭</Text>
</button>
```

### 6-2. 이벤트 핸들러 — 전달 vs 호출 (63p)

onClick에는 **'함수 자체'**를 넘긴다. `()`를 붙이면 즉시 실행돼 버린다.

```tsx
// 함수를 넘긴다
<button onClick={handleClick}>    // O 함수를 넘김 (클릭 시 실행)
<button onClick={handleClick()}>  // X 렌더링될 때 바로 실행됨

// 값을 넘길 때는 화살표 함수로 감싼다
<button onClick={() => setCount(count + 1)}>   // O
<button onClick={setCount(count + 1)}>          // X 즉시 실행 → 무한 반복
```

### 6-3. 핸들러 함수 따로 빼기 (64p)

동작이 길어지면 **함수로 분리**하면 깔끔하다.

```tsx
// App.tsx
const [count, setCount] = useState(0);
const handlePlus = () => setCount(count + 1);
const handleReset = () => setCount(0);

<button onClick={handlePlus}>+1</button>
<button onClick={handleReset}>초기화</button>
```

- `onClick={handlePlus}` — 이름(함수)만 넘긴다. `()`를 붙이지 않는다
- 간단하면 인라인 화살표, 길어지면 함수로 분리 — 둘 다 맞다

### 6-4. 입력 다루기 — onChange (65p)

입력창(input)의 값이 바뀔 때마다 onChange가 실행된다. 입력한 글자는 `e.target.value`로 꺼낸다.

```tsx
// App.tsx
const [text, setText] = useState("");

<input
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

- `value={text}` — 상태를 입력창에 표시
- `onChange={...}` — 입력을 상태에 저장
- 타이핑할 때마다 setText → 리렌더링 → value 갱신

### 6-5. 제어 컴포넌트 (controlled) (66p)

value(상태) + onChange(갱신)로 묶인 input을 **'제어 컴포넌트'**라고 한다.

- 화면의 입력값 = 상태(text) ← 항상 일치
- 흐름: 타이핑 → onChange → setText → 리렌더링 → value 갱신

> value만 주고 onChange를 빼면 글자가 안 써진다 → 둘은 짝이다.

### 6-6. 이벤트 객체 e의 타입 (TS) (67p)

```tsx
// 인라인 — 타입 자동 추론
<input
  onChange={(e) => setText(e.target.value)}
/>
// e의 타입을 React가 추론 → 생략 가능

// 함수로 분리 — 타입 명시
const handleChange = (e:
  React.ChangeEvent<HTMLInputElement>) => {
  setText(e.target.value);
};
// input 변경 이벤트 타입을 적어준다
```

> 처음에는 인라인(타입 생략)으로 쓰고, 분리할 때만 타입을 붙이면 된다.

### 6-7. 실습 ④ — 실시간 미리보기 (68~70p)

입력창에 글자를 치면 아래에 **실시간으로** 그대로 보여주는 화면. 글자 수도 함께 표시한다.

진행 순서: 1) text 상태 만들기 (useState("")) → 2) input에 value·onChange 연결 → 3) 아래에 {text}와 글자 수 {text.length} → 4) yarn dev로 확인

```tsx
// src/Preview.tsx
import { useState } from "react";
import "./Preview.css";

function Preview() {
  const [text, setText] = useState("");
  return (
    <div className="preview">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여기에 입력"
      />
      <p>입력한 내용: {text}</p>
      <p className="char-count">글자 수: {text.length}</p>
    </div>
  );
}

export default Preview;
```

```css
/* src/Preview.css */
.preview {
  max-width: 400px;
  margin: 40px auto;  padding: 24px;
}
.preview input {
  width: 100%;  padding: 10px;
  font-size: 16px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  box-sizing: border-box;
}
.char-count { color: #888888; }
```

> value와 onChange는 짝 (제어 컴포넌트). App.tsx에서 `import Preview` 후 `<Preview />` 렌더 — 45p 방식.

**결과 점검:**
- 입력창에 글자를 치면 아래에 즉시 그대로 표시되는가?
- 글자 수가 입력에 따라 실시간으로 바뀌는가?
- 입력을 모두 지우면 미리보기도 빈칸이 되는가?
- `value={text}`를 지우면 입력값과 상태가 어떻게 달라지는가?

## 7. 자주 하는 실수 (71~73p)

### 세팅 · JSX/TSX

- **엉뚱한 폴더에서 yarn dev** → 프로젝트 폴더(my-app)로 cd 후 실행
- **컴포넌트 이름을 소문자로 시작** → `<card />`는 HTML 태그로 인식. 대문자(Card)
- **여러 요소를 부모 없이 return** → 하나의 부모(`<div>` 또는 `<></>`)로 감싼다
- **class 사용** → JSX에서는 `className`을 쓴다
- **태그를 닫지 않음** → `<img>`, `<br>` → `<img />`, `<br />`

### TypeScript · props

- **props 타입을 안 정함** → interface로 props 모양을 정의 (CardProps)
- **전달한 이름과 받는 이름이 다름** → `title=...`인데 `{ name }`로 받으면 안 됨
- **문자열과 중괄호 혼동** → `title="HTML"` · `count={3}`, `src={imageUrl}`
- **export default 누락** → 내보내지 않으면 import 안 됨. 파일 끝에
- **구조 분해에서 타입 위치 실수** → `Card({ ... }: CardProps)` — `{...}` 뒤에 `: 타입`

### 상태 · 이벤트

- X 상태를 직접 바꾸기 — `count = count + 1`
  - O `setCount(count + 1)` · 배열은 `setTodos([...todos, x])`
- X onClick에 함수를 '호출'해서 넘김 — `onClick={handle()}` → 즉시 실행
  - O `onClick={handle}` — 이름(함수)만 넘긴다
- X 값을 넘길 때 화살표 함수를 안 씀 — `onClick={setCount(0)}`
  - O `onClick={() => setCount(0)}`
- X input에 value만 주고 onChange를 안 줌 → 글자가 안 써진다 → 짝으로 연결

## 8. 오늘 정리 (74p)

| 항목 | 정리 |
|---|---|
| React | 화면을 컴포넌트(부품)로 나누어 조립하는 도구 |
| Vite + TypeScript | create-vite로 세팅, .tsx로 작성 · 타입으로 실수 방지 |
| JSX · TSX | JS 안에서 화면을 쓰고, { }로 값을 끼워 넣는다 |
| 컴포넌트 · props | 부품을 만들고 props로 데이터를 내려 재사용한다 |
| useState | 변하는 값을 상태로 만들면 화면이 자동 갱신된다 |
| onClick · onChange | 클릭·입력 이벤트에 반응하는 화면을 만든다 |

> 다음 → React 응용 — useEffect · 라우터로 페이지 나누기

## 실습 과제

1. **실습 ① — 카드 컴포넌트 (42~46p)**: props(title·description·level)를 받는 Card.tsx를 만들고, `"★".repeat(level)`로 별을 계산해 App.tsx에서 카드 3개를 flex로 나란히 배치. 체크: 타입 경고 확인, 네 번째 카드 추가 시 바로 반영.
2. **실습 ② — 메뉴 카드 스스로 완성하기 (47p)**: MenuCard.tsx를 직접 작성 — interface로 props 정의, name·price·spicy 최소 3가지, 서로 다른 메뉴 3개 이상 + 최소 스타일. 도전: imageUrl 추가, kcal·soldOut, 매운맛 카드만 다른 색 (`{spicy ? "매움" : "순한맛"}`). 정답 코드 미제공.
3. **실습 ③ — 카운터 (58~60p)**: useState로 count 상태를 만들고 +1 · -1 · 초기화 버튼을 onClick으로 연결. 도전: 0 미만 방지 — `setCount(count > 0 ? count - 1 : 0)`.
4. **실습 ④ — 실시간 미리보기 (68~70p)**: input에 value·onChange를 연결(제어 컴포넌트)하고 아래에 `{text}`와 글자 수 `{text.length}`를 실시간 표시.

> 실습 파일 관리(45p): 실습마다 별도 컴포넌트 파일로 만들고, App.tsx에서 보여줄 것만 주석 전환하며 import한다.
