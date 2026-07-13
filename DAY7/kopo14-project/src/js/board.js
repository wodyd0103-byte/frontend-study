const API_URL = "http://localhost:3000/posts";

const title = document.querySelector("#title");
const content = document.querySelector("#content");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

let editId = null;

// 게시글 조회
async function getPosts() {
  const res = await fetch(API_URL);
  const posts = await res.json();

  list.innerHTML = "";

  posts.reverse().forEach((post) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button class="deleteBtn">삭제</button>
      <button class="patchBtn">수정</button>
    `;

    // 삭제 버튼
    li.querySelector(".deleteBtn").addEventListener("click", () => {
      deletePost(post.id);
    });

    // 수정 버튼
    li.querySelector(".patchBtn").addEventListener("click", () => {
      title.value = post.title;
      content.value = post.content;
      editId = post.id;
      addBtn.textContent = "수정 완료";
    });

    list.appendChild(li);
  });
}

// 게시글 등록
async function addPost() {
  if (!title.value.trim() || !content.value.trim()) {
    alert("제목과 내용을 입력하세요.");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
  });

  title.value = "";
  content.value = "";

  getPosts();
}

// 게시글 삭제
async function deletePost(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  getPosts();
}

// 게시글 수정
async function patchPost(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
  });

  title.value = "";
  content.value = "";
  editId = null;
  addBtn.textContent = "등록";

  getPosts();
}

// 등록 버튼
addBtn.addEventListener("click", () => {
  if (editId) {
    patchPost(editId);
  } else {
    addPost();
  }
});

getPosts();
