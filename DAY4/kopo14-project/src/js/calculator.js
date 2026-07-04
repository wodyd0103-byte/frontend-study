function calculate(num1, num2, operator) {
  if (operator === "+") return num1 + num2;
  if (operator === "-") return num1 - num2;
  if (operator === "*") return num1 * num2;
  if (operator === "/") {
    if (num2 === 0) return "0으로 나눌수없습니다.";
    return num1 / num2;
  }
}

const btn = document.querySelector("#calcBtn");
const result = document.querySelector("#result");

btn.addEventListener("click", function () {
  const num1 = Number(document.querySelector("#num1").value);
  const num2 = Number(document.querySelector("#num2").value);
  const operator = document.querySelector("#operator").value;

  const answer = calculate(num1, num2, operator);
  result.innerHTML = `결과: ${answer}`;
});

