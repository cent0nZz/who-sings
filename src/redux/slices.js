import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    isLogged: false,
    name: '',
    playedGames: []
  },
  reducers: {
    logIn: (state, action) => {
      state.isLogged = true
      state.name = action.payload.name
      state.playedGames = action.payload.playedGames
    },
    logOut: (state) => {
      state.isLogged = false
      state.name = ''
      state.playedGames = []
    },
  },
})

export const { logIn, logOut } = currentUserSlice.actions
export default currentUserSlice.reducer
