const result = document.querySelector("#result");
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".calcBtn");

const MAX_DIGITS = 16; // 입력 자릿수 제한 (화면 탈출 방지)
const DIV_ZERO_MSG = "0으로 나눌 수 없습니다.";

let current = ""; // 현재 입력 중인 숫자
let previous = null; // 좌변(누적 결과)
let operator = null; // 현재 연산자
let expression = ""; // 상단 수식 표시
let justCalculated = false; // = 직후 여부
let isError = false;

// 연속 = 지원용 (마지막 연산 반복)
let lastOperator = null;
let lastOperand = null;

function isOperator(value) {
  return value === "+" || value === "-" || value === "x" || value === "÷";
}

function operate(num1, num2, op) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "÷":
      return num2 === 0 ? DIV_ZERO_MSG : num1 / num2;
    default:
      return num1; // 알 수 없는 연산자 방어
  }
}

// 부동소수점 오차 보정 + 과도한 자릿수는 지수 표기로 축약
function format(num) {
  if (typeof num === "string") return num;
  if (!Number.isFinite(num)) return DIV_ZERO_MSG;
  let str = parseFloat(num.toPrecision(15)).toString();
  const digits = str.replace("-", "").replace(".", "").replace(/e.*/, "").length;
  if (digits > MAX_DIGITS) str = num.toExponential(9);
  return str;
}

function digitCount(str) {
  return str.replace("-", "").replace(".", "").length;
}

function reset() {
  current = "";
  previous = null;
  operator = null;
  expression = "";
  justCalculated = false;
  isError = false;
  lastOperator = null;
  lastOperand = null;
  result.value = "";
  display.value = "";
}

function enterError(msg) {
  current = msg;
  operator = null;
  isError = true;
  justCalculated = true;
  result.value = msg;
}

function handleNumber(value) {
  // = 직후 숫자를 누르면 새 계산 시작
  if (justCalculated) {
    current = "";
    previous = null;
    operator = null;
    expression = "";
    justCalculated = false;
  }

  // 자릿수 제한 (화면 탈출 방지)
  if (digitCount(current) >= MAX_DIGITS) return;

  // 선행 0 방지 (0 상태에서 숫자 입력 시 대체)
  if (current === "0") current = "";

  current += value;
  result.value = current;
  display.value = expression + current;
}

function handleOperator(value) {
  // 아직 아무 숫자도 없음
  if (current === "" && previous === null) return;

  // = 직후 연산자: 결과를 좌변으로 이어감 (재연산 방지)
  if (justCalculated) {
    previous = Number(current);
    operator = value;
    expression = `${current} ${value} `;
    current = "";
    justCalculated = false;
    result.value = format(previous);
    display.value = expression;
    return;
  }

  // 연산자만 교체 (예: 5 + 누르고 - 누름)
  if (current === "") {
    operator = value;
    expression = expression.slice(0, -2) + `${value} `;
    display.value = expression;
    return;
  }

  // 체인 계산
  if (previous === null) {
    previous = Number(current);
  } else {
    const chained = operate(previous, Number(current), operator);
    if (typeof chained === "string") {
      // 계산 도중 0 나눗셈 → 에러 상태로 전환
      display.value = `${expression}${current} =`;
      enterError(chained);
      return;
    }
    previous = chained;
  }

  expression += `${current} ${value} `;
  operator = value;
  current = "";
  justCalculated = false;
  result.value = format(previous);
  display.value = expression;
}

function handleEquals() {
  let op;
  let rightOperand;
  let headExpr;

  if (operator !== null) {
    // 일반 계산
    op = operator;
    rightOperand = current === "" ? previous : Number(current);
    lastOperator = op;
    lastOperand = rightOperand;
    headExpr = `${expression}${current === "" ? format(previous) : current} =`;
  } else if (justCalculated && lastOperator !== null) {
    // 연속 = : 마지막 연산 반복
    op = lastOperator;
    rightOperand = lastOperand;
    headExpr = `${format(previous)} ${op} ${format(rightOperand)} =`;
  } else {
    return; // 계산할 게 없음
  }

  const calcResult = operate(previous, rightOperand, op);
  display.value = headExpr;

  if (typeof calcResult === "string") {
    enterError(calcResult);
    return;
  }

  const formatted = format(calcResult);
  current = formatted;
  previous = Number(formatted);
  expression = "";
  operator = null;
  justCalculated = true;
  result.value = formatted;
}

function calculate(value) {
  if (value === "C") return reset();

  // 에러 상태에서는 C 외 입력 무시
  if (isError) return;

  if (value === "=") return handleEquals();
  if (isOperator(value)) return handleOperator(value);
  return handleNumber(value);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => calculate(btn.dataset.value));
});
