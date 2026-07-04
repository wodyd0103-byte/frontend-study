const toggle = document.querySelector("#toggle");
const menu = document.querySelector("#menu");

toggle.addEventListener("click", function (e) {
  menu.classList.toggle("open");
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown")) {
    menu.classList.remove("open");
  }
});
