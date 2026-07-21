import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return; // 정지 상태면 아무것도 안 함
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer); //cleanup
    console.log("cleanup");
  }, [running]); // running 바뀔때재실행

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>{seconds}초</h1>
      <button onClick={() => setRunning(!running)}>
        {running ? "정지" : "시작"}
      </button>
      <button
        onClick={() => {
          setSeconds(0);
          setRunning(!running);
        }}
      >
        초기화
      </button>
    </div>
  );
}
export default Timer;
