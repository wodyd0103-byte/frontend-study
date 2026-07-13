async function getUsers() {
  const getRes = await fetch(`http://localhost:3000/users/`, { method: "GET" });
  const users = await getRes.json();
  console.log("get", users);
}

async function postUsers() {
  const user = { name: "홍길동", age: 43, gender: "남" };
  const postRes = await fetch(`http://localhost:3000/users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  const newUser = await postRes.json();
  console.log("post", newUser);
}

async function patchUsers() {
  const patchRes = await fetch(`http://localhost:3000/users/2`, {
    method: "PATCH",
    body: JSON.stringify({ age: 29 }),
    headers: { "Content-Type": "application/json" },
  });

  const updated = await patchRes.json();
  console.log("patch", updated);
}

async function deleteUsers() {
  await fetch(`http://localhost:3000/users/3`, { method: "DELETE" });
  console.Log("삭제 완료");
}

//getUsers();

//postUsers();

//patchUsers();

//deleteUsers();
