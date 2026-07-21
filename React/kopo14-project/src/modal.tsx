import { useEffect, useState } from 'react'
import type { Restaurant, Review } from './types'
import { API_URL } from './types'

interface Props {
  restaurant: Restaurant
  onClose: () => void
}

// 항목 클릭 시 열리는 상세 모달 (해당 음식점 리뷰 로드)
function Modal({ restaurant, onClose }: Props) {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    fetch(`${API_URL}/reviews?restaurantId=${restaurant.id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
  }, [restaurant.id])

  // ESC 키로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          maxWidth: 480,
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: 16,
        }}
      >
        <button type="button" className="modal-close" onClick={onClose}>
          닫기 ✕
        </button>

        <img
          src={restaurant.image}
          alt={restaurant.name}
          style={{ width: '100%' }}
        />
        <h2>{restaurant.name}</h2>
        <p className="category">{restaurant.category}</p>
        <p className="meta">
          ⭐ {restaurant.rating} · 리뷰 {restaurant.reviewCount}개
        </p>
        <p className="description">{restaurant.description}</p>
        <p className="address">📍 {restaurant.address}</p>
        {restaurant.phone && <p className="phone">📞 {restaurant.phone}</p>}
        {restaurant.hours && <p className="hours">🕒 {restaurant.hours}</p>}

        <h3>리뷰</h3>
        <ul className="review-list">
          {reviews.length === 0 && <li>등록된 리뷰가 없습니다.</li>}
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <p className="review-head">
                <b>{review.author}</b> ⭐ {review.rating} · {review.date}
              </p>
              <p className="review-comment">{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Modal
