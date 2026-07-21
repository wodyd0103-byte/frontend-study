import { useState } from "react";
import "./TodoAdd.css";

interface Todo {
  id: number;
  text: string;
}

function TodoAdd() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() == "") return; // 빈 입력 무시
    const newTodo: Todo = { id: Date.now(), text: text };
    setTodos([...todos, newTodo]); // 기존 + 새 항목
    setText(""); // 입력창 비우기
  };
  return (
    <div className="todo">
      <h1>할 일 목록</h1>
      <div className="input-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
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
