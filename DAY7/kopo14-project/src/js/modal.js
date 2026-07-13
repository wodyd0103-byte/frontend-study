const openBtn = document.querySelector("#openBtn");
const backdrop = document.querySelector("#backdrop");
const confirmBtn = document.querySelector("#confirmBtn");

openBtn.addEventListener("click", () => {
  backdrop.style.display = "flex";
});

confirmBtn.addEventListener("click", () => {
  backdrop.style.display = "none";
});

backdrop.addEventListener("click", () => {
  if (event.target == event.currentTarget) {
    backdrop.style.display = "none";
  }
});
