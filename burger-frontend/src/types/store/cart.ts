import { Burger } from '.'

export interface CartState {
  item: Cart[]
  orders: Orders[]
}

export interface Orders {
  id: number
  userId: number
  dateAdd: Date
}

export interface Cart {
  burger: Burger
  count: number
}
