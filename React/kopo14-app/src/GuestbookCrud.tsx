import { useState, useEffect } from "react";

interface Guestbook {
  id: number;
  name: string;
  message: string;
}

function GuestbookCrud() {
  const [users, setUsers] = useState<Guestbook[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const getUsers = async () => {
    // R: useEffect로 방명록 글불러와 표시(이름,메세지)
    const res = await fetch("http://localhost:3000/guestbook");
    setUsers(await res.json());
  };
  useEffect(() => {
    getUsers();
  }, []); //처음 한번
  const addUser = async () => {
    // C:이름 메세지 입력 + 등록 -> POST -> 다시 불러오기
    if (name.trim() === "") return;
    await fetch("http://localhost:3000/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, message: message }),
    });
    setName("");
    setMessage("");
    getUsers(); // 다시 불러오기
  };
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMessage, setEditMessage] = useState("");

  const growUp = async (id: number) => {
    // U: 수정 -> 메세지 변경 (PATCH) -> 다시 불러오기
    await fetch(`http://localhost:3000/guestbook/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: editMessage }),
    });
    setEditingId(null);
    getUsers();
  };
  const removeUser = async (id: number) => {
    // D: 삭제 -> DELETE-> 다시 불러오기
    await fetch(`http://localhost:3000/guestbook/${id}`, { method: "DELETE" });
    getUsers();
  };
  return (
    <div style={{ padding: 40 }}>
      <h1>방명록 관리</h1>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="방명록"
        />
        <button onClick={addUser}>추가</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editingId === user.id ? (
              <>
                <input
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                />
                <button onClick={() => growUp(user.id)}>저장</button>
                <button onClick={() => setEditingId(null)}>취소</button>
              </>
            ) : (
              <>
                {user.name} ({user.message})
                <button
                  onClick={() => {
                    setEditingId(user.id);
                    setEditMessage(user.message);
                  }}
                >
                  수정
                </button>
                <button onClick={() => removeUser(user.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default GuestbookCrud;
