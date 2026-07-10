const movies = [
  { id: 1, title: "인터스텔라", year: 2014, rating: 8.6 },
  { id: 2, title: "기생충", year: 2019, rating: 8.5 },
  { id: 3, title: "라라랜드", year: 2016, rating: 8.0 },
  { id: 4, title: "올드보이", year: 2003, rating: 8.4 },
];

// ① 모든 영화 제목만 담은 배열 (map)
const titles = movies.map(function (movie) {
  return movie.title;
});
console.log("① 모든 제목:", titles);

// ② 평점(rating) 8.5 이상인 영화만 거르기 (filter → 여러 개)
const highRating = movies.filter(function (movie) {
  return movie.rating >= 8.5;
});
console.log("② 평점 8.5 이상:", highRating);

// ③ 2010년 이후 개봉작의 제목만 추출 (filter → map 체이닝)
const recentTitles = movies
  .filter(function (movie) {
    return movie.year >= 2010;
  })
  .map(function (movie) {
    return movie.title;
  });
console.log("③ 2010년 이후 제목:", recentTitles);

// ④ 제목이 "기생충"인 영화 찾기 (find → 하나)
const parasite = movies.find(function (movie) {
  return movie.title === "기생충";
});
console.log("④ 기생충 찾기:", parasite);
