import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { Burger, Errors, Restaurant, RestaurantState } from '../types'

const initialState: RestaurantState = {
  burger: {
    isLoad: false,
    burgers: [],
    errors: [],
  },
  restaurant: {
    isLoad: false,
    restaurants: [],
    errors: [],
  },
  order: [],
  selectedRestaurant: null,
}

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    requestRestaurants: (state) => {
      state.restaurant = {
        isLoad: false,
        restaurants: [],
        errors: [],
      }
    },
    receiveRestaurants: (state, { payload }: PayloadAction<Restaurant[]>) => {
      state.restaurant = {
        isLoad: true,
        restaurants: payload,
        errors: [],
      }
    },
    errorsRestaurants: (state, { payload }: PayloadAction<Errors[]>) => {
      state.restaurant = {
        isLoad: true,
        restaurants: [],
        errors: payload,
      }
    },
    requestBurgers: (state) => {
      state.burger = {
        isLoad: false,
        burgers: [],
        errors: [],
      }
    },
    receiveBurgers: (state, { payload }: PayloadAction<Burger[]>) => {
      state.burger = {
        isLoad: true,
        burgers: payload,
        errors: [],
      }
    },
    updateBurger: (state, { payload }: PayloadAction<Burger[]>) => {
      state.burger = {
        isLoad: true,
        burgers: payload,
        errors: [],
      }
    },
    errorsBurgers: (state, { payload }: PayloadAction<Errors[]>) => {
      state.burger = {
        isLoad: true,
        burgers: [],
        errors: payload,
      }
    },
    selectRestaurant: (state, { payload }: PayloadAction<Restaurant>) => {
      state.burger = {
        isLoad: false,
        burgers: [],
        errors: [],
      }
      state.selectedRestaurant = payload
    },
    // addOrder: (state, { payload }: PayloadAction<User>) => {
    // },
    // removeOrder: (state, { payload }: PayloadAction<User>) => {
    // },
    // sumbitOrder: (state, { payload }: PayloadAction<User>) => {
    // },
  },
})

export const {
  requestRestaurants,
  receiveRestaurants,
  errorsRestaurants,
  requestBurgers,
  receiveBurgers,
  errorsBurgers,
  selectRestaurant,
  updateBurger,
} = restaurantSlice.actions

export default restaurantSlice.reducer
