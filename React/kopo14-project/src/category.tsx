import { useState } from 'react'
import type { Restaurant } from './types'
import RestaurantList from './list'

interface Props {
  restaurants: Restaurant[]
  onToggleFavorite: (restaurant: Restaurant) => void
  onSelect: (restaurant: Restaurant) => void
}

// 카테고리(장르) 필터 페이지
function Category({ restaurants, onToggleFavorite, onSelect }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('전체')

  // 데이터에 존재하는 카테고리 목록 (+ 전체)
  const categories = [
    '전체',
    ...Array.from(new Set(restaurants.map((r) => r.category))),
  ]

  const filtered =
    selectedCategory === '전체'
      ? restaurants
      : restaurants.filter((r) => r.category === selectedCategory)

  return (
    <div className="category-page">
      <div className="category-filter">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={selectedCategory === c ? 'active' : ''}
            onClick={() => setSelectedCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <RestaurantList
        restaurants={filtered}
        onToggleFavorite={onToggleFavorite}
        onSelect={onSelect}
      />
    </div>
  )
}

export default Category
