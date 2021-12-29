import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { User, UserState } from '../types'

const initialState: UserState = {
  isAuth: false,
  user: {} as User,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.isAuth = true
      state.user = payload
    },
    removeUser: (state) => {
      state.isAuth = false
      state.user = {} as User
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
