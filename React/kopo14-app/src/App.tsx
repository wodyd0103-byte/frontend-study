import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CardPractice from "./CardPractice";
import Menu from "./Menu";
import Counter from "./Counter";
import Preview from "./Preview";
import Toggle from "./Toggle";
import TodoAdd from "./TodoAdd";
import TodoAdd2 from "./TodoAdd2";
import TitleCounter from "./TitleCounter";
import Timer from "./Timer";
import UserCrud from "./UserCrud";
import GuestbookCrud from "./GuestbookCrud";
import UserDetail from "./UserDetail";
import UserDetail2 from "./UserDetail2";

function App() {
  return (
    <div style={{ padding: 24 }}>
      <Link to="/">← 목록으로</Link>
      <Routes>
        <Route
          path="/"
          element={
            <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h1>나의 첫 React 화면</h1>
              <h2>9강 React기초</h2>
              <Link to="/card">9-1 카드</Link>
              <Link to="/menu">9-2 메뉴카드</Link>
              <Link to="/counter">9-3 카운터</Link>
              <Link to="/preview">9-4 프리뷰</Link>
              <h2>10강 React심화</h2>
              <Link to="/toggle">10-1 토글</Link>
              <Link to="/todo">10-2 할일추가</Link>
              <Link to="/todo2">10-3 할일추가2</Link>
              <Link to="/title-counter">10-4 타이틀카운터</Link>
              <Link to="/timer">10-5 타이머</Link>
              <Link to="/users">10-6 유저CRUD</Link>
              <Link to="/guestbook">10-7 방명록CRUD</Link>
              <Link to="/users/3">10-8 유저디테일</Link>
              <Link to="/users2">10-9 유저디테일2</Link>
            </nav>
          }
        />
        <Route path="/card" element={<CardPractice />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/toggle" element={<Toggle />} />
        <Route path="/todo" element={<TodoAdd />} />
        <Route path="/todo2" element={<TodoAdd2 />} />
        <Route path="/title-counter" element={<TitleCounter />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/users" element={<UserCrud />} />
        <Route path="/guestbook" element={<GuestbookCrud />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/users2" element={<UserDetail2 />} />
        <Route path="/users2/:id" element={<UserDetail2 />} />
      </Routes>
    </div>
  );
}

export default App;
