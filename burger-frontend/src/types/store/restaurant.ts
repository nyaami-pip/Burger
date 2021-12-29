import { Errors } from '..'

export interface RestaurantState {
  burger: {
    isLoad: boolean
    burgers: Burger[]
    errors: Errors[]
  }
  restaurant: {
    isLoad: boolean
    restaurants: Restaurant[]
    errors: Errors[]
  }
  order: Burger[]
  selectedRestaurant: Restaurant | null
}

export interface Restaurant {
  id: number
  rating: number
  name: string
  url: string
  title: string
}

export interface Burger {
  id: number
  name: string
  img: string
  desc: string
  price: number
  status: number
  restaurantId: number
}

export interface Order {
  id: number
  userId: number
  dateAdd: Date
}

export interface OrderDetail {
  id: number
  orderId: number
  burgerId: number
  count: number
}
