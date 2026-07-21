# 📙 LECTURE_10 — React 심화

> 조건부·리스트 렌더링 · useEffect · cleanup · 데이터 CRUD · React Router · Day 10/13

## 개요

10강 「렌더링 응용 · useEffect · 데이터(CRUD) · 라우팅」(React 심화, with TypeScript)은 조건부·리스트 렌더링, useEffect, json-server CRUD, React Router까지 다루는 강의다. 학습 목표는 (1) 삼항·&&로 조건에 따라 화면을 다르게 그리기, (2) map과 key로 배열을 목록으로 렌더링, (3) useEffect로 렌더링 이후 실행 흐름 이해, (4) json-server와 데이터 주고받기(CRUD), (5) React Router로 화면 나누기·주소 값 받기다. **7월 20일(1~18p) + 7월 21일(19~58p) 이틀에 걸쳐 전체 진도를 마쳤다.**

---

## 1. 수업 진행 방식 — 실습은 파일로 분리 (4p)

실습마다 별도 컴포넌트 파일을 만들고, App.tsx는 보여줄 것만 골라 import한다. App.tsx를 지우고 덮어쓰지 않는다.

```tsx
// src/App.tsx
import Toggle from "./Toggle";
// import TodoAdd from "./TodoAdd";

function App() {
  return <Toggle />;
  // return <TodoAdd />;
}

export default App;
```

- 보고 싶은 실습만 **주석을 풀어 전환** → 만든 실습 파일이 모두 그대로 보존된다
- 9강에서 배운 import · export를 그대로 재사용
- 라우터는 오늘 마지막 Part에서 배운다 — 그 전까진 이 방식으로 화면 전환

---

## 2. 조건부 렌더링 (Part 1: 5~9p)

### 2-1. 삼항 연산자 (6p)

JSX의 `{ }` 안에서 삼항으로 조건에 따라 다른 것을 그린다.

> 핵심 문법: `조건 ? (참일 때) : (거짓일 때)`

```tsx
// App.tsx
const [isLoggedIn, setIsLoggedIn] = useState(false);

{isLoggedIn
  ? <p>환영합니다</p>
  : <p>로그인이 필요합니다</p>}
```

- 참이면 앞, 거짓이면 뒤를 화면에 그린다
- 글자뿐 아니라 태그(JSX)도 통째로 넣을 수 있다

### 2-2. && 연산자 (7p)

조건이 참일 때만 보여주고, 거짓이면 아무것도 안 그릴 때는 &&를 쓴다.

```tsx
{count > 10 && <p>10을 넘었습니다!</p>}
```

**삼항 vs &&**

| 구분 | 쓰임새 |
| --- | --- |
| 삼항 | 둘 중 하나를 골라 그릴 때 |
| && | 있을 때만 보여줄 때 |

> **주의 — 숫자 0과 &&**
> `{count && <p>...</p>}` → count가 0이면 화면에 0이 찍힌다.
> `{count > 0 && <p>...</p>}` → 참/거짓 조건으로 쓰면 안전하다.

### 2-3. 실습① — 토글 버튼 (8p)

```tsx
// src/Toggle.tsx
import { useState } from "react";

function Toggle() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => setOpen(!open)}>
        {open ? "숨기기" : "보이기"}
      </button>
      {open && <p>안녕하세요! 내용이 보입니다.</p>}
    </div>
  );
}

export default Toggle;
```

**핵심 포인트**
- `!open`: 누를 때마다 true↔false 뒤집기
- 버튼 글자: 삼항 (?:)
- 내용 보이기: &&
- App.tsx에서 `import Toggle` 후 `<Toggle />` 렌더

**실습① 결과 점검 (9p)**
- [ ] 버튼을 누르면 내용이 나타났다 사라졌다 하는가?
- [ ] 버튼 글자가 상태에 따라 "보이기"/"숨기기"로 바뀌는가?
- [ ] open의 초기값을 true로 바꾸면 처음부터 보이는가?
- [ ] (도전) 펼쳤을 때만 다른 안내 문구를 삼항으로 더 보여주기

---

## 3. 리스트 렌더링 (10~12p)

### 3-1. map으로 목록 그리기 (10p)

7강에서 배운 map을 React에서 그대로 쓴다. 배열의 각 항목을 **JSX로 바꿔** 여러 개를 그린다.

```tsx
const fruits = ["사과", "바나나", "포도"];

return (
  <ul>
    {fruits.map((fruit) => <li>{fruit}</li>)}
  </ul>
);
```

- map이 항목마다 `<li>`를 만들어 목록이 완성된다
- 복사·붙여넣기로 `<li>`를 여러 개 쓰지 않아도 된다

### 3-2. key가 필요한 이유 (11p)

map을 실행하면 콘솔 경고: "각 항목에 key가 필요합니다"

```tsx
// X key 없음
fruits.map((fruit) => <li>{fruit}</li>)

// V key 있음
fruits.map((fruit) => <li key={fruit}>{fruit}</li>)
```

**key란?**
- React가 목록의 각 항목을 구분하는 **'이름표'**
- 무엇이 바뀌었는지 빠르게 찾아 효율적으로 다시 그린다
- 형제 항목끼리 겹치지 않는 고유한 값으로 — **id가 가장 좋다**

### 3-3. 객체 배열 — interface + map·key (12p)

```tsx
// interface + 데이터
interface Todo {
  id: number;
  text: string;
}

const todos: Todo[] = [
  { id: 1, text: "장보기" },
  { id: 2, text: "운동하기" },
];
```

```tsx
// map + key
<ul>
  {todos.map((todo) => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>
```

> `key={todo.id}`: 고유한 id를 항목의 이름표로 사용. 순서가 바뀔 수 있으므로 index를 key로 쓰는 것은 가급적 피한다.

---

## 4. 실습② — 목록에 추가하기 (TodoAdd, 13~17p)

입력창에 글을 쓰고 '추가'를 누르면 목록에 쌓이는 화면을 만든다.

**순서 (13p)**
1. todos 상태(배열)와 text 상태(입력값) 만들기
2. 추가 클릭 시 새 항목을 배열에 추가
3. todos.map으로 목록 표시 (key={id})
4. yarn dev로 확인

만들 파일: `src/TodoAdd.tsx` · `src/TodoAdd.css` → App.tsx에서 `import TodoAdd` 후 `<TodoAdd />` 렌더

### 4-1. TodoAdd.tsx — 상태 · addTodo 함수 (14p)

```tsx
// src/TodoAdd.tsx
import { useState } from "react";
import "./TodoAdd.css";

interface Todo { id: number; text: string; }

function TodoAdd() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() === "") return; // 빈 입력 무시
    const newTodo: Todo = { id: Date.now(), text: text };
    setTodos([...todos, newTodo]); // 기존 + 새 항목
    setText(""); // 입력창 비우기
  };
```

### 4-2. TodoAdd.tsx — return JSX (15p)

```tsx
  return (
    <div className="todo">
      <h1>할 일 목록</h1>
      <div className="input-row">
        <input value={text} onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요" />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoAdd;
```

### 4-3. 코드 설명 (16p)

**useState&lt;Todo[]&gt;([])**
- 빈 Todo 배열로 시작. 타입을 모르므로 `<Todo[]>`로 "Todo들의 배열"임을 알려준다.

**addTodo — id 생성**
- `Date.now()`로 겹치지 않는 id 생성. `[...todos, newTodo]` — 기존 배열을 펼치고 새 항목을 더해 '새 배열'을 만든다.

> **상태(배열)는 직접 바꾸지 않고, 항상 '새 배열'로 교체한다**
> - X `todos.push(newTodo)` — 직접 변경 → 화면 갱신 안 될 수 있음
> - V `setTodos([...todos, x])` — 새 배열로 교체

### 4-4. TodoAdd.css 핵심 (17p)

```css
.todo {
  max-width: 420px; margin: 40px auto; padding: 24px;
}
.input-row { display: flex; gap: 8px; }
.input-row input {
  flex: 1; padding: 10px;
  border: 1px solid #ddd; border-radius: 8px;
}
.input-row button {
  padding: 10px 16px; background: #4f46e5;
  color: #fff; border: none; border-radius: 8px;
  cursor: pointer;
}
.todo li {
  padding: 10px; border-bottom: 1px solid #eee;
}
```

**실습② 결과 점검**
- [ ] 입력 후 추가를 누르면 목록에 항목이 쌓이는가?
- [ ] 추가하면 입력창이 비워지는가?
- [ ] 빈 칸으로 추가를 누르면 무시되는가?
- [ ] 콘솔에 key 경고가 뜨지 않는가?
- [ ] (도전) Enter로도 추가 — onKeyDown으로 Enter 감지

---

## 실습③ — 자율 과제

### 실습③ — 자율: React To-Do (18p, 정답 코드 미제공)

6강에서 바닐라 JS로 만든 To-Do를 이번엔 React 방식으로 직접 완성한다.
만들 파일: `src/Todo.tsx` → App.tsx에서 `import Todo` 후 `<Todo />` 렌더

**요구사항**
1. 입력창 + 추가 버튼으로 할 일을 목록에 추가 (상태 배열 + map)
2. 각 항목에 삭제 버튼 → 누르면 그 항목만 사라짐
3. 항목 클릭 시 완료 표시(취소선) ↔ 다시 클릭하면 해제 (토글)
4. 완료 개수 / 전체 개수를 화면에 표시

**힌트**
- 삭제: `setTodos(todos.filter((t) => t.id !== id))`
- 완료 토글: map으로 해당 id의 done만 뒤집어 새 배열로 교체
- 스타일: 조건부로 className 또는 style 적용

**도전**
- 필터 버튼: 전체 / 진행 중 / 완료만 보기
- Enter로도 추가 (onKeyDown)
- localStorage에 저장해 새로고침 유지

---

---

## 5. useEffect (19~23p)

### 5-1. useEffect란? (20p)

**"렌더링이 끝난 뒤" 실행하는 Hook.**
화면을 다 그린 다음에 해야 하는 일에 쓴다.

- 데이터 불러오기 (fetch)
- 타이머 시작 (setInterval)
- 문서 제목 바꾸기 (document.title)

```tsx
// 기본 형태
import { useEffect } from "react";

useEffect(() => {
  // 렌더링 후 실행할 코드
}, []);
```

### 5-2. 의존성 배열 — 언제 실행되나 (21p)

두 번째 인자 `[ ]`가 '언제 실행할지'를 정한다.

| 작성 형태 | 실행 시점 | 용도 |
| --- | --- | --- |
| `useEffect(() => { ... }, []);` | 처음 한 번 (화면이 처음 뜰 때) | 데이터 처음 불러오기 |
| `useEffect(() => { ... }, [count]);` | count가 바뀔 때마다 | 특정 값에 반응 |
| `useEffect(() => { ... });` (배열 생략) | 매 렌더링마다 | 무한 호출 위험 |

> 가장 많이 쓰는 두 가지: `[]` 처음 한 번, `[값]` 그 값이 바뀔 때.

### 5-3. 컴포넌트 생명주기 (22p)

컴포넌트도 태어나고 → 바뀌고 → 사라진다. 이를 **생명주기**라 한다.

| 단계 | 의미 | useEffect 표현 |
| --- | --- | --- |
| 마운트 | 태어남 — 화면에 처음 나타남 | `useEffect(() => {...}, [])` |
| 업데이트 | 바뀜 — 상태·props가 바뀌어 다시 그려짐 | `useEffect(() => {...}, [값])` |
| 언마운트 | 사라짐 — 화면에서 없어짐 | `return () => { 정리 }` 함수 실행 |

> 예전 클래스 방식엔 단계마다 메서드가 따로 있었지만, 지금은 useEffect 하나로 세 단계를 모두 표현한다.

### 5-4. useEffect 간단 예 — 문서 제목 바꾸기 (23p)

```tsx
// TitleCounter.tsx
import { useState, useEffect } from "react";

function TitleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `클릭 ${count}회`;
  }, [count]); // count가 바뀔 때마다 실행

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

**동작 흐름**
1. 버튼 누름 → count 바뀜
2. useEffect 다시 실행
3. 브라우저 탭 제목 = "클릭 N회"

> 이 예는 정리(cleanup)가 필요 없다. 값만 덮어쓰면 끝.

---

## 6. 타이머 만들기 (24~32p)

### 6-1. 타이머 재료 — setInterval · clearInterval (25p)

**setInterval(함수, 시간)** — 정한 시간(ms)마다 함수를 **반복 실행**한다.

```tsx
const timer = setInterval(() => {
  console.log("1초마다 실행");
}, 1000); // 1000ms = 1초
```

반환값(timer)은 이 타이머의 번호(식별자)다.

**clearInterval(timer)** — 그 번호의 타이머를 **멈춘다**.

```tsx
clearInterval(timer);
```

> **핵심:** setInterval로 켰으면, 반드시 clearInterval로 꺼야 한다. 안 끄면 화면을 떠난 뒤에도 계속 돌아간다.

### 6-2. setInterval vs setTimeout (26p)

- **setInterval(함수, 시간)** — 정한 시간마다 **계속 반복** 실행 / 멈출 때 `clearInterval`
- **setTimeout(함수, 시간)** — 정한 시간이 지난 뒤 **한 번만** 실행 / 취소할 때 `clearTimeout`

```tsx
// setTimeout 예시 — 3초 뒤 한 번
const id = setTimeout(() => {
  console.log("3초 뒤 실행");
}, 3000);

clearTimeout(id); // 아직 실행 전이라면 예약 취소
```

> 반복이면 setInterval, 한 번이면 setTimeout. 둘 다 켰으면 정리(clear)한다.

### 6-3. 정리(cleanup) — useEffect의 return (27p)

타이머를 useEffect로 감싸 '언제 만들지'를 정하고, `return`으로 '어떻게 끌지'를 알려준다.

```tsx
// cleanup 패턴
useEffect(() => {
  const timer = setInterval(() => { ... }, 1000);
  return () => clearInterval(timer); // ← 정리(cleanup)
}, []);
```

**cleanup 함수가 실행되는 시점**
1. effect가 다시 실행되기 직전
2. 컴포넌트가 화면에서 사라질 때 (언마운트)

> 비유: 방을 나갈 때 켜둔 불을 끄고 나가는 '뒷정리'.

### 6-4. useEffect에서 setTimeout 정리 (28p)

방금 본 cleanup은 setTimeout에도 똑같이 적용된다.
예: 알림을 띄우고 3초 뒤 자동으로 닫기.

```tsx
// 알림 자동 닫기
useEffect(() => {
  const id = setTimeout(() => setShow(false), 3000);
  // 3초 뒤 닫기
  return () => clearTimeout(id); // cleanup: 예약 취소
}, []);
```

- 예약(setTimeout)도 '켠 것'이므로 정리(clearTimeout)해 준다.
- 컴포넌트가 3초 전에 사라지면, cleanup 덕분에 엉뚱한 setShow가 안 일어난다.

### 6-5. 실습④ — 타이머 만들기 (시작 / 정지) (29p)

만들 파일: `src/Timer.tsx` → `App.tsx`에서 import Timer 후 `<Timer />` 렌더

```tsx
// Timer.tsx — 상태 + useEffect
import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return; // 정지 상태면 아무것도 안 함

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [running]); // running 바뀔 때 재실행
```

```tsx
// Timer.tsx — return JSX
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>{seconds}초</h1>
      <button onClick={() => setRunning(!running)}>
        {running ? "정지" : "시작"}
      </button>
      <button onClick={() => setSeconds(0)}>
        초기화
      </button>
    </div>
  );
}

export default Timer;
```

### 6-6. 코드 설명① — 상태 2개 & [running] 흐름 (30p)

**상태 2개**
`seconds` — 화면에 보여줄 경과 초 / `running` — 타이머가 '도는 중'인지 (true / false)

**시작/정지 버튼 — running만 뒤집는다**
`onClick={() => setRunning(!running)}`

**[running] 흐름**
- 시작 누름 → running=true → effect 실행 → setInterval 시작
- 정지 누름 → running=false → 이전 타이머 정리 → `if(!running) return`으로 통과

### 6-7. 코드 설명② — 이전 값(prev)으로 갱신 (31p)

**왜 `setSeconds(prev => prev + 1)`을 쓰나?**

**문제**
타이머는 처음 만들어질 때의 seconds(옛 값)를 계속 바라본다.
`setSeconds(seconds + 1)` → 매번 0 + 1 = 1에서 멈춰버린다.

**해결**
`setSeconds((prev) => prev + 1)`
React가 건네주는 '최신 값(prev)'에 +1 → 정확히 누적된다.

**규칙**
타이머·비동기처럼 '나중에 실행되는 코드' 안에서 상태를 더할 때는 이전 값(prev)을 받아 쓰는 방식을 쓴다.

```tsx
// X 옛 값 참조 문제
setSeconds(seconds + 1);

// O 최신 값 받아 갱신
setSeconds((prev) => prev + 1);
```

### 6-8. 정리(cleanup)가 없으면? (32p)

```
// return 줄을 빼면?
시작/정지를 반복할 때마다 이전 타이머가 안 꺼지고 겹쳐 쌓인다.
1초에 여러 번씩 올라가 숫자가 들쭉날쭉 빨라진다.

→ useEffect에서 cleanup은 선택이 아니라 필수다.
```

**결과 점검 체크리스트**
- [ ] 시작을 누르면 1초마다 숫자가 오르는가?
- [ ] 정지를 누르면 숫자가 멈추는가?
- [ ] 초기화를 누르면 0이 되는가?
- [ ] (실험) return 줄을 지우면 시작/정지 반복 시 숫자가 비정상적으로 빨라지는가? → 확인 후 원복

---

## 7. 데이터 (CRUD) (33~44p)

### 7-1. useEffect로 데이터 불러오기 (34p)

8강에서 fetch로 json-server 데이터를 가져왔다. React에서도 똑같이 쓴다.

```tsx
// GET 패턴
const getData = async () => {
  const res = await fetch("http://localhost:3000/items");
  setItems(await res.json());
};

useEffect(() => { getData(); }, []); // 처음 한 번
```

**왜 useEffect 안에 넣나?**
1. fetch를 본문에 직접 쓰면 렌더링마다 반복 호출된다
2. `useEffect(..., [])`로 처음 한 번만 실행한다
3. async를 곧바로 붙일 수 없음 — 안에서 함수를 만들어 호출한다

> 흐름: 첫 렌더링(빈 목록) → useEffect → fetch → 상태 저장 → 목록 표시

### 7-2. React에서 서버에 쓰기 — POST · PATCH · DELETE (35p)

| 동작 | method | 요청 본문 | 주소 |
| --- | --- | --- | --- |
| 추가 (POST) | `method: "POST"` | `body: JSON.stringify(보낼 데이터)` | `/users` |
| 수정 (PATCH) | `method: "PATCH"` | `body:` 바꿀 항목만 | `/users/{id}` |
| 삭제 (DELETE) | `method: "DELETE"` | body 없음 | `/users/{id}` |

**핵심 패턴 — '쓰고 나면 다시 읽는다(re-fetch)'**
서버에 쓰기(POST/PATCH/DELETE) → `getUsers()` 다시 호출 → 최신 목록 표시
즉, 화면 상태를 직접 고치지 않고 "서버를 바꾼 뒤 다시 불러와" 맞춘다.

### 7-3. 실습⑤ — 사용자 CRUD (36p)

json-server의 users를 React 화면에서 직접 관리한다. 목록 보기(R) · 추가(C) · 수정(U) · 삭제(D)

1. db.json 만들고 json-server 실행 (터미널 ①)
2. yarn dev 실행 (터미널 ②)
3. useEffect로 목록 불러오기 (GET)
4. 추가(POST) · 수정(PATCH) · 삭제(DELETE) 버튼 연결 — 각 작업 뒤 다시 불러오기

만들 파일: `my-app/db.json` · `src/UserCrud.tsx` → `App.tsx`에서 import UserCrud 후 `<UserCrud />` 렌더

#### db.json & 서버 실행 (37p)

```json
{
  "users": [
    { "id": 1, "name": "김철수", "age": 30 },
    { "id": 2, "name": "이영희", "age": 25 },
    { "id": 3, "name": "박민수", "age": 35 }
  ]
}
```

```bash
# 프로젝트에 설치
$ yarn add json-server@0.17.4

# package.json scripts에 추가
"start": "json-server --watch db.json"

# 터미널 ① - 데이터 서버 (3000)
$ yarn start

# 터미널 ② - 화면 서버 (5173)
$ yarn dev
```

> json-server는 전역 설치하지 않고 프로젝트에 설치해 yarn으로 실행. 주소: http://localhost:3000/users

#### UserCrud.tsx (1/3) — import · interface · state · getUsers · addUser (38p)

```tsx
// src/UserCrud.tsx
import { useState, useEffect } from "react";

interface User { id: number; name: string; age: number; }

function UserCrud() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState(""); const [age, setAge] = useState("");

  const getUsers = async () => { // R: 목록 불러오기
    const res = await fetch("http://localhost:3000/users"); setUsers(await res.json());
  };

  useEffect(() => { getUsers(); }, []); // 처음 한 번

  const addUser = async () => { // C: 추가
    if (name.trim() === "") return;
    await fetch("http://localhost:3000/users", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, age: Number(age) }),
    });
    setName(""); setAge(""); getUsers(); // 다시 불러오기
  };
```

#### UserCrud.tsx (2/3) — growUp · removeUser (39p)

```tsx
  const growUp = async (user: User) => { // U: 수정
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age: user.age + 1 }),
    }); getUsers();
  };

  const removeUser = async (id: number) => { // D: 삭제
    await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" }); getUsers();
  };
```

#### UserCrud.tsx (3/3) — return JSX (목록 · 추가 · 수정 · 삭제) (40p)

```tsx
  return (
    <div style={{ padding: 40 }}><h1>사용자 관리</h1>
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="나이" />
      <button onClick={addUser}>추가</button></div>
    <ul>{users.map((user) => (
      <li key={user.id}>{user.name} ({user.age}세)
        <button onClick={() => growUp(user)}>나이+1</button>
        <button onClick={() => removeUser(user.id)}>삭제</button></li>
    ))}</ul></div>
  );
}

export default UserCrud;
```

#### 실습⑤ 코드 설명① — READ · CREATE (41p)

**getUsers() (READ)**
GET으로 목록을 받아 setUsers로 상태에 저장. `useEffect(..., [])` → 화면이 뜰 때 한 번.

**addUser() (CREATE)**
- `headers: { "Content-Type": "application/json" }` — JSON을 보낸다고 알림
- `body: JSON.stringify({ name, age: Number(age) })` — 객체 → 문자열, age는 Number() 변환
- 추가 후 입력창 비우고 getUsers()로 다시 불러온다

**왜 다시 불러오나(re-fetch)?**
서버가 진짜 데이터다. 서버를 바꾼 뒤 다시 읽어 화면을 최신으로 맞춘다.

#### 실습⑤ 코드 설명② — UPDATE · DELETE (42p)

**growUp(user) (UPDATE)**
특정 사용자만 바꾸므로 주소 끝에 `/id`를 붙인다: `` `.../users/${user.id}` ``
PATCH로 바꿀 항목만 보낸다: `body: { age: user.age + 1 }` → 그 사용자의 나이만 +1, 나머지는 그대로.

**removeUser(id) (DELETE)**
`` `.../users/${id}` ``에 DELETE 요청. body는 없고 `method: "DELETE"`만.

**공통:** PATCH/DELETE 뒤에도 getUsers()로 다시 불러와 목록 갱신.

> 목록의 버튼은 `onClick={() => growUp(user)}`처럼 화살표 함수로 감싸 값을 넘긴다.

#### 실습⑤ 결과 점검 (43p)

- [ ] 두 터미널(3000 데이터 / 5173 화면)이 모두 켜져 있는가?
- [ ] 처음에 db.json의 사용자들이 목록으로 보이는가? (READ)
- [ ] 이름·나이를 넣고 추가하면 목록과 db.json에 새 사용자가 생기는가? (CREATE)
- [ ] 나이+1을 누르면 그 사람만 나이만 올라가는가? (UPDATE)
- [ ] 삭제를 누르면 그 사람만 목록·db.json에서 사라지는가? (DELETE)
- [ ] 새로고침해도 변경이 유지되는가? (서버에 저장됨)
- [ ] (도전) 추가 시 나이를 비우면 어떻게 되는지 확인하고 막아보기

### 7-4. 실습⑥ — 자율: 방명록 CRUD (서버 연결) (44p)

⑤에서 익힌 React + json-server CRUD를 guestbook에 적용해 서버에 저장되는 방명록을 만든다. (정답 미제공)

**준비 — db.json에 guestbook 추가**

```json
"guestbook": [
  { "id": 1, "name": "김철수", "message": "안녕하세요!" }
]
```

엔드포인트: http://localhost:3000/guestbook

**요구사항 (CRUD 모두)**
- **R** useEffect로 방명록 글 불러와 표시 (이름·메시지)
- **C** 이름·메시지 입력 + 등록 → POST → 다시 불러오기
- **U** 수정 → 메시지 변경(PATCH) → 다시 불러오기
- **D** 삭제 → DELETE → 다시 불러오기

> 힌트: ⑤의 users를 guestbook으로 바꾸면 거의 그대로다.

만들 파일: `src/Guestbook.tsx` → `App.tsx`에서 import Guestbook 후 `<Guestbook />` 렌더

---

## 8. React Router (45~56p)

### 8-1. React Router란? (46p)

지금까지는 한 화면(App)만 그렸다. 실제 웹은 여러 페이지를 오간다.
**React Router = 주소(URL)에 따라 어떤 화면을 보여줄지 정해주는 도구.**

- `/` → 홈 화면
- `/about` → 소개 화면
- `/users/3` → 3번 사용자 상세 화면

> 페이지를 '새로 불러오지' 않고, **화면만 바꿔 끼운다** (빠르고 매끄럽다). `<a href>`로 새로고침하는 대신, Router가 화면을 갈아끼운다.

### 8-2. 설치 & BrowserRouter로 감싸기 (47p)

```bash
$ yarn add react-router-dom
```

```tsx
// src/main.tsx
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

**BrowserRouter란?**
- React Router의 기능(Routes, Link 등)을 쓰려면 앱 전체를 한 번 감싸야 한다.
- 이 안에서만 라우팅 기능을 사용할 수 있다.
- 지금까지 App.tsx에서 보여줄 컴포넌트를 손으로 골라 렌더했다 → 이제부터는 **주소(URL)에 따라 Router가 자동으로 화면을 바꿔준다.**

> 앞 실습에서 만든 컴포넌트 파일은 지우지 않는다. 라우팅 실습 화면은 `src/pages/`에 새로 만든다.

### 8-3. Routes · Route — 주소로 화면 고르기 (48p)

```tsx
// src/App.tsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```

**주요 props**

| prop | 의미 |
| --- | --- |
| `path` | 주소 패턴 (예: "/about", "/users/:id") |
| `element` | 그 주소에서 보여줄 화면 컴포넌트 |

> 주소가 바뀌면 가까이에 맞는 element 하나만 그려진다.

### 8-4. 화면을 컴포넌트로 나누기 (49p)

각 페이지는 9강에서 배운 '컴포넌트'다. 보통 `src/pages/` 폴더에 파일로 나눈다.

```tsx
// src/pages/Home.tsx
function Home() {
  return <h1>홈 화면</h1>;
}

export default Home;
```

```tsx
// src/pages/About.tsx
function About() {
  return <h1>소개 화면</h1>;
}

export default About;
```

```tsx
// App에서 import해 <Route>의 element에 넣는다.
import Home from "./pages/Home";
import About from "./pages/About";

<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
```

### 8-5. Link · NavLink — 이동 버튼 (50p)

```tsx
// Link 예시
import { Link, NavLink } from "react-router-dom";

<nav>
  <Link to="/">홈</Link>
  <Link to="/about">소개</Link>
</nav>
```

**Link vs `<a>`**
- X `<a href="/about">소개</a>` — 새로고침 발생, 느리다
- O `<Link to="/about">소개</Link>` — 새로고침 없이 화면만 교체

> **NavLink**: 지금 그 페이지인지에 따라 active 클래스 자동 추가 — 메뉴 강조에 사용.

### 8-6. useParams — 주소 속 값 받기 (51p)

`/users/3`처럼 주소에 들어오는 값(id)을 화면에서 꺼내 쓸 수 있다.

```tsx
// Route 정의 (App.tsx)
import { Routes, Route } from "react-router-dom";

<Route path="/users/:id" element={<UserDetail />} />
```

```tsx
// UserDetail.tsx
import { useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  return <h1>{id}번 사용자</h1>;
}
```

- Route에 `:id`로 자리를 만들고
- 화면에서 `useParams().id`로 꺼낸다
- 목록 → 항목 클릭 → 상세 화면 흐름에 사용

### 8-7. useNavigate — 코드로 이동하기 (52p)

버튼 클릭이나 어떤 처리가 끝난 뒤 **'코드로' 화면을 옮길 때** 쓴다.

```tsx
// 예시 — 저장 후 홈으로 이동
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  const onSave = () => {
    // ...저장 처리...
    navigate("/"); // 저장 후 홈으로 이동
  };

  return <button onClick={onSave}>저장</button>;
}
```

**navigate 인수**

| 호출 | 동작 |
| --- | --- |
| `navigate("/")` | 홈으로 이동 |
| `navigate('/about')` | 소개로 이동 |
| `navigate(-1)` | 뒤로 가기 |

### 8-8. 실습⑦ — 라우터 화면 나누기 (53~55p)

#### main.tsx — BrowserRouter로 감싸기 (53p)

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

```tsx
// src/pages/Home.tsx
function Home() {
  return <h2>홈 화면</h2>;
}

export default Home;
```

```tsx
// src/pages/About.tsx
function About() {
  return <h2>소개 화면</h2>;
}

export default About;
```

#### UserDetail · App.tsx (54p)

```tsx
// src/pages/UserDetail.tsx
import { useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  return <h2>{id}번 사용자 상세</h2>;
}

export default UserDetail;
```

```tsx
// src/App.tsx — 메뉴 + Routes
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <div style={{ padding: 24 }}>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
        <Link to="/users/3">3번 사용자</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}
```

#### 실습⑦ 결과 점검 (55p)

- [ ] yarn add react-router-dom 후 에러 없이 yarn dev가 되는가?
- [ ] 홈/소개 메뉴를 누르면 새로고침 없이 화면만 바뀌는가?
- [ ] "3번 사용자"를 누르면 "3번 사용자 상세"가 보이는가?
- [ ] 주소창의 /users/3 에서 3을 5로 바꾸면 "5번 사용자 상세"로 바뀌는가?
- [ ] (도전) Link를 NavLink로 바꿔 현재 메뉴에 active 스타일 주기

### 8-9. 실습⑧ — 자율: 목록 → 상세 라우팅 (56p)

실습⑥(사용자 CRUD)의 목록을, 클릭하면 상세 화면으로 가도록 라우터로 잇는다. (정답 미제공)

**요구사항**
1. 목록 화면(`/`)에서 각 사용자 이름을 `<Link to={`/users/${user.id}`}>`로 감싼다
2. 상세 화면(`/users/:id`)에서 useParams로 id를 받는다
3. 그 id로 서버에서 한 명을 불러와(GET `/users/:id`) 이름·나이를 보여준다
4. 상세 화면에 뒤로 버튼 → useNavigate로 `navigate(-1)`

**힌트**
- 상세 데이터: `` fetch(`http://localhost:3000/users/${id}`) `` → useEffect 안에서 호출 (async 함수 따로 만들어 호출)
- 목록과 상세는 각각 페이지 컴포넌트로 나눈다
- 목록 불러오기는 ⑤의 getUsers 패턴 그대로 재사용

---

## 자주 하는 실수 (57p)

| 실수 | 증상과 해결 |
| --- | --- |
| map에 key 없음 | 콘솔 경고 → `key={고유 id}`를 붙여 준다 |
| && 에 숫자 0 사용 | `{count && ...}` count가 0이면 0이 찍힘 → `{count > 0 && ...}` |
| useEffect 콜백에 async 직접 | `useEffect(async () => ...)` 금지 → 안에서 async 함수를 만들어 호출 |
| 의존성 배열 누락 | fetch를 본문에 직접 쓰거나 `[]`를 빠뜨리면 반복 실행 → `[]` 명시 |
| 타이머·구독 정리 안 함 | setInterval 만들고 안 끄면 겹침 → return으로 clearInterval |

---

## 이번 강 정리 (58p)

| 주제 | 핵심 |
| --- | --- |
| 조건부 렌더링 | 삼항(참/거짓 둘 중 하나) · &&(있을 때만) — && 에 숫자 0 주의 |
| 리스트 렌더링 | map + key(고유 id). 배열 상태는 push 금지, 새 배열로 교체 |
| useEffect | `[]`=처음 한 번, `[값]`=바뀔 때. async 콜백 금지. 타이머 cleanup 필수 |
| 데이터 CRUD | useEffect로 GET, POST·PATCH·DELETE 후 re-fetch 패턴 |
| React Router | BrowserRouter → Routes/Route → Link → useParams → useNavigate |

> 다음 강 → React Native 소개 — 웹에서 모바일 앱으로
