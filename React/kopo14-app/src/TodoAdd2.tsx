import { useState } from "react";
import "./TodoAdd.css";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoAdd2() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() == "") return;
    const newTodo: Todo = { id: Date.now(), text: text, done: false };
    setTodos([...todos, newTodo]);
    setText("");
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const doneCount = todos.filter((todo) => todo.done).length;

  return (
    <div className="todo">
      <h1>할 일 목록</h1>
      <p className="progress">
        완료 {doneCount} / 전체 {todos.length}
      </p>
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
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoAdd2;
