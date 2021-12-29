import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../types'

const initialState: AppState = {
  isLoad: false,
  isAside: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appLoad: (state) => {
      state.isLoad = true
    },
    closeAside: (state) => {
      state.isAside = false
    },
    openAside: (state) => {
      state.isAside = true
    },
  },
})

export const { appLoad, closeAside, openAside } = appSlice.actions
export default appSlice.reducer

// Action
// export function initApp() {
//   return async (dispatch: Dispatch, getState: () => {}) => {
//     const restaurant = browserStorage.getItem('restaurant')
//     console.log('restaurant', restaurant)

//     // dispatch(selectRestaurant(restaurant))

//     /**
//      * auth
//      */

//     dispatch(appLoad())
//   }
// }
