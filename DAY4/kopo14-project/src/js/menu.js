const menu = [
  { name: "아메리카노", price: 4000, category: "커피" },
  { name: "카페라떼", price: 4500, category: "커피" },
  { name: "바닐라라떼", price: 5000, category: "커피" },
  { name: "연유라떼", price: 4500, category: "논커피" },
  { name: "초코라떼", price: 5000, category: "논커피" },
];

const menuList = document.querySelector("#menuList");
let html = "";
for (let i = 0; i < menu.length; i++) {
  html += `<li><span>${menu[i].name}(${menu[i].category})</span><span>${menu[i].price}원</span></li>`;
}
menuList.innerHTML = html;

const sum = document.querySelector("#total");
let total = 0;
for (let i = 0; i < menu.length; i++) {
  total += menu[i].price;
}
sum.innerHTML = `총합계:${total}원`;
