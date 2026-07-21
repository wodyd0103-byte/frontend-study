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
