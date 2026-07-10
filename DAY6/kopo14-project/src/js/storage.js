localStorage.setItem("test", 1);
sessionStorage.setItem("test", 2);

window.onload = () => {
  document.querySelector("#local").textContent =
    `localStorage : ${localStorage.getItem("test")}`;
  document.querySelector("#session").textContent =
    `sessionStorage : ${sessionStorage.getItem("test")}`;
};
