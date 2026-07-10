// year / month 는 버튼으로 바뀌므로 let 사용
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth(); // 0부터

const days = document.querySelector("#days");

function renderCalendar() {
  // 이전에 그린 날짜 지우기 (안 지우면 계속 쌓인다)
  days.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay(); // 1일의 요일
  const lastDate = new Date(year, month + 1, 0).getDate(); // 이번달 마지막 날짜
  document.querySelector("#title").textContent = `${year}년 ${month + 1}월`;

  // 지금 보고 있는 달이 "오늘이 포함된 달"인지
  const isThisMonth =
    year === today.getFullYear() && month === today.getMonth();

  // 1일의 요일만큼 공백을 만든다.
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    blank.classList.add("day", "blank");
    days.appendChild(blank);
  }

  // 날짜를 추가한다.
  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = i;

    // 01. 오늘 날짜 (이번 달을 보고 있을 때만)
    if (isThisMonth && i === today.getDate()) {
      day.classList.add("today");
    }

    // 02. 주말 색: 0=일요일(빨강), 6=토요일(파랑)
    const dayOfWeek = new Date(year, month, i).getDay();
    if (dayOfWeek === 0) day.classList.add("sunday");
    if (dayOfWeek === 6) day.classList.add("saturday");

    // 04. 날짜 클릭 시 alert
    day.addEventListener("click", () => {
      alert(`${year}년 ${month + 1}월 ${i}일`);
    });

    days.appendChild(day);
  }
}

// 03. 이전 / 다음 달 버튼
document.querySelector("#prev").addEventListener("click", () => {
  month--;
  if (month < 0) {
    // 1월 이전 → 작년 12월
    month = 11;
    year--;
  }
  renderCalendar();
});
document.querySelector("#next").addEventListener("click", () => {
  month++;
  if (month > 11) {
    // 12월 다음 → 내년 1월
    month = 0;
    year++;
  }
  renderCalendar();
});

// 처음 한 번 그리기
renderCalendar();
