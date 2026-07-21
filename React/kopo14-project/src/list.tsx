import type { Restaurant } from './types'
import { FavoriteButton } from './toggle'

interface Props {
  restaurants: Restaurant[]
  onToggleFavorite: (restaurant: Restaurant) => void
  onSelect: (restaurant: Restaurant) => void
}

// 항목 리스트 렌더링 (홈/카테고리 화면에서 공용으로 사용)
function RestaurantList({ restaurants, onToggleFavorite, onSelect }: Props) {
  if (restaurants.length === 0) {
    return <p className="empty">표시할 음식점이 없습니다.</p>
  }

  return (
    <ul className="restaurant-list">
      {restaurants.map((r) => (
        <li
          key={r.id}
          className="restaurant-item"
          onClick={() => onSelect(r)}
          style={{ cursor: 'pointer' }}
        >
          <img src={r.image} alt={r.name} width={60} height={60} />
          <div className="restaurant-info">
            <p className="name">{r.name}</p>
            <p className="category">{r.category}</p>
            <p className="meta">
              ⭐ {r.rating} · 리뷰 {r.reviewCount}개
            </p>
          </div>
          <FavoriteButton
            isFavorite={r.isFavorite}
            onToggle={() => onToggleFavorite(r)}
          />
        </li>
      ))}
    </ul>
  )
}

export default RestaurantList
