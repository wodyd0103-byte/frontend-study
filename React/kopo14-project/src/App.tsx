import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import type { Restaurant, SortKey } from "./types";
import { API_URL } from "./types";
import SortTabs from "./sort";
import { FavoriteFilter } from "./toggle";
import Modal from "./modal";
import RestaurantList from "./list";
import Category from "./category";
import "./App.css";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selected, setSelected] = useState<Restaurant | null>(null);

  // 데이터 로드
  useEffect(() => {
    fetch(`${API_URL}/restaurants`)
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  // 찜 토글 → 서버 저장 (새로고침해도 유지)
  const toggleFavorite = async (restaurant: Restaurant) => {
    const nextValue = !restaurant.isFavorite;

    await fetch(`${API_URL}/restaurants/${restaurant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorite: nextValue }),
    });

    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurant.id ? { ...r, isFavorite: nextValue } : r,
      ),
    );
  };

  // 홈: 찜 필터 → 정렬(평점/리뷰)
  const homeList = restaurants
    .filter((r) => (onlyFavorites ? r.isFavorite : true))
    .sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <div className="app">
      <h1>서현역 맛집</h1>

      <nav className="nav">
        <Link to="/">전체</Link>
        <Link to="/category">카테고리</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="controls">
                <SortTabs sortKey={sortKey} onChange={setSortKey} />
                <FavoriteFilter
                  onlyFavorites={onlyFavorites}
                  onChange={setOnlyFavorites}
                />
              </div>
              <RestaurantList
                restaurants={homeList}
                onToggleFavorite={toggleFavorite}
                onSelect={setSelected}
              />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <Category
              restaurants={restaurants}
              onToggleFavorite={toggleFavorite}
              onSelect={setSelected}
            />
          }
        />
      </Routes>

      {selected && (
        <Modal restaurant={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default App;
