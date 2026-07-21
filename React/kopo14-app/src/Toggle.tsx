import { useState } from "react";

function Toggle() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => setOpen(!open)}>
        {open ? "숨기기" : "보이기"}
      </button>
      {open && <p>안녕하세요! 내용이 보입니다 .</p>}
    </div>
  );
}
export default Toggle;
