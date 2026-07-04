const text = document.querySelector("#text");
const list = document.querySelector("#list");
function makeCard() {
  return `<div class="card">${text.value}</div>`;
}
document.querySelector("#addTop").addEventListener("click", function () {
  list.insertAdjacentHTML("afterbegin", makeCard()); // 맨 앞
});
document.querySelector("#addBottom").addEventListener("click", function () {
  list.insertAdjacentHTML("beforeend", makeCard()); // 맨 뒤
});
document.querySelector("#dup").addEventListener("click", function () {
  const cards = document.querySelectorAll(".card");
  const last = cards[cards.length - 1]; // 마지막
  const copy = last.cloneNode(true); // 복제
  list.appendChild(copy);
});