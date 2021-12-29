import { combineReducers } from '@reduxjs/toolkit'

import appReducer from './app.slice'
import userReducer from './user.slice'
import restaurantReducer from './restaurant.slice'
import cartReducer from './cart.slice'

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  restaurant: restaurantReducer,
  cart: cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>
