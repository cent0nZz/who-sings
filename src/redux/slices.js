import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    isLogged: false,
    name: '',
    games: []
  },
  reducers: {
    logIn: (state, action) => {
      state.isLogged = true
      state.name = action.payload.name
      state.games = action.payload.games
    },
    logOut: (state) => {
      state.isLogged = false
      state.name = ''
      state.games = []
    },
  },
})

export const { logIn, logOut } = currentUserSlice.actions
export default currentUserSlice.reducer
