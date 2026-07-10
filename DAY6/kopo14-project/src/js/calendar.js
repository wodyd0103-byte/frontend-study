const today = new Date();
const year = today.getFullYear();
const month = today.getMonth(); //0부터
const firstDay = new Date(year, month, 1).getDay(); //1일의 요일
const lastDate = new Date(year, month + 1, 0).getDate(); //이번달 마지막 날짜
document.querySelector("#title").textContent = `${year}년 ${month + 1}월`;
const days = document.querySelector("#days");

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
  days.appendChild(day);
}
