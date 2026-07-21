import "./App.css";
import CardPractice from "./CardPractice";
import Menu from "./Menu";
import Counter from "./Counter";
import Preview from "./Preview";
import Toggle from "./Toggle";
import TodoAdd from "./TodoAdd";
import TodoAdd2 from "./TodoAdd2";
function App() {
  return (
    <>
      <h1>나의 첫 React 화면</h1>
      <h2>9강 React기초</h2>
      <div>
        <h3>9-1 카드</h3>
        <CardPractice />
      </div>
      <div>
        <h3>9-2 메뉴카드</h3>
        <Menu />
      </div>
      <div>
        <h3>9-3 카운터</h3>
        <Counter />
      </div>
      <div>
        <h3>9-4 프리뷰</h3>
        <Preview />
      </div>
      <h2>10강 React심화</h2>
      <div>
        <h3>10-1 토글</h3>
        <Toggle />
      </div>
      <div>
        <h3>10-2 할일추가</h3>
        <TodoAdd />
      </div>
      <div>
        <h3>10-3 할일추가2</h3>
        <TodoAdd2 />
      </div>
    </>
  );
}

export default App;
