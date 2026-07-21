import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  age: number;
}

function UserCrud() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const getUsers = async () => {
    // R:목록 불러오기
    const res = await fetch("http://localhost:3000/users");
    setUsers(await res.json());
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUsers();
  }, []); //처음 한번
  const addUser = async () => {
    // C:추가
    if (name.trim() === "") return;
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, age: Number(age) }),
    });
    setName("");
    setAge("");
    getUsers(); // 다시 불러오기
  };
  const growUp = async (user: User) => {
    // U: 수정
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age: user.age + 1 }),
    });
    getUsers();
  };
  const removeUser = async (id: number) => {
    // D: 삭제
    await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" });
    getUsers();
  };
  return (
    <div style={{ padding: 40 }}>
      <h1>사용자 관리</h1>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="나이"
        />
        <button onClick={addUser}>추가</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age}세)
            <button onClick={() => growUp(user)}>나이+1</button>
            <button onClick={() => removeUser(user.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserCrud;
