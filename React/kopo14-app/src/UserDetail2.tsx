import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  age: number;
}

function UserDetail2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!id) {
      const getUsers = async () => {
        const res = await fetch("http://localhost:3000/users");
        setUsers(await res.json());
      };
      getUsers();
      return;
    }
    const getUser = async () => {
      const res = await fetch(`http://localhost:3000/users/${id}`);
      setUser(await res.json());
    };
    getUser();
  }, [id]);

  if (!id) {
    return (
      <div style={{ padding: 40 }}>
        <h1>사용자 목록</h1>
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              <Link to={`/users2/${u.id}`}>{u.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!user) return <div style={{ padding: 40 }}>불러오는 중...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>사용자 상세</h1>
      <p>이름: {user.name}</p>
      <p>나이: {user.age}세</p>
      <button onClick={() => navigate(-1)}>뒤로</button>
    </div>
  );
}
export default UserDetail2;
