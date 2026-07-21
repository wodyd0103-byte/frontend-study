import { useState, useEffect } from "react";

function TitleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `클릭 ${count}회`;
  }, [count]); // count가 바뀔 때마다 실행

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
export default TitleCounter;
