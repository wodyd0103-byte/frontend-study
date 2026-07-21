# 📙 LECTURE_10 — React 심화 (진행 중 · ~18p)

> 조건부 렌더링 · 리스트/map/key · To-Do (예정: useEffect · CRUD · Router) · Day 10/13

## 개요

10강 「렌더링 응용 · useEffect · 데이터(CRUD) · 라우팅」(React 심화, with TypeScript)은 조건부·리스트 렌더링, useEffect, json-server CRUD, React Router까지 다루는 강의다. 학습 목표는 (1) 삼항·&&로 조건에 따라 화면을 다르게 그리기, (2) map과 key로 배열을 목록으로 렌더링, (3) useEffect로 렌더링 이후 실행 흐름 이해, (4) json-server와 데이터 주고받기(CRUD), (5) React Router로 화면 나누기·주소 값 받기다. **현재 수업 진도는 18페이지까지 진행**되어, 이 노트는 1~18p(조건부·리스트 렌더링 파트)를 상세히 정리하고, 19p 이후(useEffect·타이머·CRUD·Router)는 마지막 섹션에 미리보기 개요로만 정리한다.

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

## 실습 과제

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

## 이후 진도 미리보기 (19p~)

### Part 2 — useEffect (19~23p)
- **useEffect란? (20p)**: '렌더링이 끝난 뒤' 실행하는 Hook. 데이터 불러오기(fetch), 타이머 시작(setInterval), 문서 제목 바꾸기(document.title) 같은 일에 쓴다. 기본 형태 `useEffect(() => { ... }, [])`.
- **의존성 배열 — 언제 실행되나 (21p)**: `[]`는 처음 한 번, `[count]`는 count가 바뀔 때마다, 배열 생략은 매 렌더링마다(무한 호출 위험). 가장 많이 쓰는 건 `[]`와 `[값]`.
- **컴포넌트 생명주기 (22p)**: 마운트(태어남) → 업데이트(바뀜) → 언마운트(사라짐)를 useEffect 하나로 표현한다.
- **간단 예 — 문서 제목 바꾸기 (23p)**: 버튼 클릭 → count 바뀜 → useEffect 재실행 → 브라우저 탭 제목 갱신.

### 타이머 만들기 (24~32p)
- **setInterval · clearInterval (25p)**: 일정 시간마다 반복 실행 / 번호로 타이머 정지. 켰으면 반드시 꺼야 한다.
- **setInterval vs setTimeout (26p)**: 반복 vs 한 번. 멈출 때 각각 clearInterval / clearTimeout.
- **cleanup — useEffect의 return (27~28p)**: effect 재실행 직전과 언마운트 때 실행되는 뒷정리. setTimeout 예약 취소에도 동일하게 적용.
- **실습④ — 타이머 (시작/정지) (29~30p)**: seconds·running 두 상태 + useEffect(`[running]`)로 setInterval 시작/정리하는 타이머 구현.
- **이전 값(prev)으로 갱신 (31p)**: 나중에 실행되는 콜백 안에서는 `setSeconds((prev) => prev + 1)` 방식을 써야 정확히 누적된다.
- **cleanup이 없으면? (32p)**: 시작/정지 반복 시 타이머가 겹쳐 숫자가 들쭉날쭉 빨라진다 — cleanup은 선택이 아니라 필수.

### Part 3 — 데이터(CRUD) (33~44p)
- **useEffect로 데이터 불러오기 (34p)**: fetch를 useEffect(`[]`) 안에서 async 함수로 만들어 호출하는 GET 패턴.
- **POST · PATCH · DELETE (35p)**: method·body 구성 비교와 "쓰고 나면 다시 읽는다(re-fetch)" 핵심 패턴.
- **실습⑤ — 사용자 CRUD (36~43p)**: db.json + json-server 실행(터미널 2개), UserCrud.tsx에서 getUsers/addUser/growUp/removeUser 구현, 코드 설명(READ·CREATE·UPDATE·DELETE)과 결과 점검.
- **실습⑥ — 자율: 방명록 CRUD (44p, 정답 미제공)**: guestbook 엔드포인트로 CRUD 전부를 스스로 구현.

### Part 4 — React Router (45~56p)
- **React Router란? (46p)**: 주소(URL)에 따라 어떤 화면을 보여줄지 정하는 도구. 새로고침 없이 화면만 바꿔 끼운다.
- **설치 & BrowserRouter (47p)**: `yarn add react-router-dom`, main.tsx에서 App을 BrowserRouter로 감싸기.
- **Routes · Route (48p)**: path와 element로 주소별 화면 고르기.
- **화면을 컴포넌트로 나누기 (49p)**: src/pages/ 폴더에 Home.tsx·About.tsx 분리.
- **Link · NavLink (50p)**: a 태그 대신 Link로 새로고침 없이 이동, NavLink는 active 클래스 자동 추가.
- **useParams (51p)**: `/users/:id` 주소 속 값을 화면에서 꺼내 쓰기.
- **useNavigate (52p)**: 코드로 화면 이동 (navigate("/"), navigate(-1) 등).
- **실습⑦ — 라우터 화면 나누기 (53~55p)**: main.tsx + pages(Home·About·UserDetail) + App.tsx 메뉴/Routes 구성과 결과 점검.
- **실습⑧ — 자율: 목록 → 상세 라우팅 (56p, 정답 미제공)**: 사용자 CRUD 목록에서 클릭하면 상세 화면으로 잇는 라우팅.

### 마무리 (57~58p)
- **자주 하는 실수 (57p)**: map에 key 없음 · &&에 숫자 0 사용 · useEffect 콜백에 async 직접 금지 · 의존성 배열 누락 · 타이머/구독 정리 안 함.
- **이번 강 정리 (58p)**: 조건부 렌더링, 리스트 렌더링, useEffect, 데이터 CRUD, React Router 요약. 다음 강 → React Native 소개 (웹에서 모바일 앱으로).
