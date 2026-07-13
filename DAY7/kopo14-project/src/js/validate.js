const phoneRegex = /^010\d{8}$/;
const input = document.querySelector("#phone");
const result = document.querySelector("#result");

document.querySelector("#checkBtn").addEventListener("click", () => {
  if (phoneRegex.test(input.value)) {
    result.textContent = "올바른 번호입니다.";
  } else {
    result.textContent = "형식이 올바르지 않습니다.";
  }
});
