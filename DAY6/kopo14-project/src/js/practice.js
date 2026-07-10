const products = [
  { id: 1, name: "노트북", price: 1200000, inStock: true },
  { id: 2, name: "스마트폰", price: 800000, inStock: false },
  { id: 3, name: "태블릿", price: 600000, inStock: true },
];
const names = products.map(function (product) {
  return product.name;
});
//["노트북", "스마트폰", "태블릿"]
console.log(names);
const prices = products.map(function (product) {
  return product.price;
});
// [1200000, 800000, 600000]
console.log(prices);
const available = products.filter(function (p) {
  return p.inStock;
});
// 재고있는 상품만 고르기
console.log("filter(재고있음):", available);
const mouse = products.find(function (p) {
  return p.name === "마우스";
});
// 이름으로 상품 하나 찾기
console.log("find(마우스):", mouse);
const availableNames = products
  .filter(function (p) {
    return p.inStock;
  })
  .map(function (p) {
    return p.name;
  });
// 재고 있는 상품의 이름만 (체이닝)
console.log("체이닝(재고있는 이름):", availableNames);
console.log("원본 products:", products);
