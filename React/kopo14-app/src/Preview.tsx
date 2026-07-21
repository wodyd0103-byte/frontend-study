import { useState } from "react";
import "./Preview.css";
function Preview() {
  const [text, setText] = useState("");
  return (
    <div className="preview">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여기에 입력"
      />
      <p>입력한 내용: {text}</p>
      <p className="char-count">글자 수 : {text.length}</p>
    </div>
  );
}
export default Preview;
