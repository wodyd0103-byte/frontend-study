export interface Restaurant {
  id: number
  name: string
  category: string
  description: string
  address: string
  rating: number
  reviewCount: number
  phone: string | null
  hours: string | null
  image: string
  isFavorite: boolean
}

export interface Review {
  id: number
  restaurantId: number
  author: string
  rating: number
  comment: string
  date: string
}

export type SortKey = 'rating' | 'reviewCount'

export const API_URL = 'http://localhost:3000'
