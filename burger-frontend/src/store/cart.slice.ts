import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart, CartState, Orders } from '../types'

const initialState: CartState = {
  item: [],
  orders: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addBurger: (state, { payload }: PayloadAction<Cart[]>) => {
      state.item = payload
    },
    removeBurger: (state, { payload }: PayloadAction<Cart[]>) => {
      state.item = payload
    },
    submitCart: (state) => {
      state.item = []
    },
    requestOrders: (state) => {
      state.orders = []
    },
    receiveOrders: (state, { payload }: PayloadAction<Orders[]>) => {
      state.orders = payload
    },
  },
})

export const { addBurger, removeBurger, submitCart, requestOrders, receiveOrders } = cartSlice.actions
export default cartSlice.reducer
