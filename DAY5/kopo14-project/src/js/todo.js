const text = document.querySelector("#text");
const list = document.querySelector("#list");

function createLi(value) {
  const li = document.createElement("li");
  const label = document.createElement("span");
  label.className = "label";
  label.textContent = value;
  const del = document.createElement("button");
  del.className = "del";
  del.textContent = "X";
  li.append(label); // 텍스트 추가
  li.append(del); // 삭제 버튼 추가
  return li;
}
document.querySelector("#add").addEventListener("click", () => {
  if (text.value.trim() === "") return; // 공백 입력 방지
  list.appendChild(createLi(text.value));
  updateCounts(); // 추가 후 개수 업데이트
  text.value = ""; // 입력 후 초기화
});
list.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li || li.classList.contains("empty")) return; // li가 아닌 다른 곳 클릭 시 무시
  if (e.target.classList.contains("del")) {
    li.remove(); // 삭제 버튼 클릭 시 li 제거
    updateCounts(); // 삭제 후 개수 업데이트
  } else {
    li.classList.toggle("done"); // li 클릭 시 완료 표시 토글
    updateCounts(); // 상태 변경 후 개수 업데이트
  }
});
document.querySelector("#clear").addEventListener("click", () => {
  list.innerHTML = ""; // 전체 삭제
  updateCounts(); // 개수 업데이트
});
document.querySelector("#delete").addEventListener("click", () => {
  const doneItems = document.querySelectorAll("li.done");
  doneItems.forEach((li) => li.remove());
  updateCounts(); // 개수 업데이트
});
document.querySelector("#text").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (text.value.trim() === "") return;
    list.appendChild(createLi(text.value));
    text.value = "";
    updateCounts(); // 개수 업데이트
  }
});
const total = document.querySelector("#total");
const count = document.querySelector("#count");
function updateCounts() {
  const totalCount = list.querySelectorAll("li:not(.empty)").length;
  const doneCount = list.querySelectorAll("li.done").length;
  total.textContent = totalCount;
  count.textContent = doneCount;
  const empty = list.querySelector(".empty");
  if (totalCount === 0) {
    if (!empty) {
      const li = document.createElement("li");
      li.className = "empty";
      li.textContent = "할 일이 없습니다";
      list.appendChild(li);
    }
  } else if (empty) {
    empty.remove();
  }
}

updateCounts(); // 초기 개수 업데이트
