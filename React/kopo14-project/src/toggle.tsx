interface FilterProps {
  onlyFavorites: boolean
  onChange: (value: boolean) => void
}

// "찜한 항목만 보기" 온/오프 필터
export function FavoriteFilter({ onlyFavorites, onChange }: FilterProps) {
  return (
    <label className="toggle-filter">
      <input
        type="checkbox"
        checked={onlyFavorites}
        onChange={(e) => onChange(e.target.checked)}
      />
      찜한 항목만 보기
    </label>
  )
}

interface ButtonProps {
  isFavorite: boolean
  onToggle: () => void
}

// 항목별 찜 버튼 (클릭 시 상위로 토글 요청, 모달 열림 방지)
export function FavoriteButton({ isFavorite, onToggle }: ButtonProps) {
  return (
    <button
      type="button"
      className={isFavorite ? 'fav-btn active' : 'fav-btn'}
      aria-pressed={isFavorite}
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
    >
      {isFavorite ? '♥ 찜' : '♡ 찜'}
    </button>
  )
}
