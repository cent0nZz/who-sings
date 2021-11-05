import { createSlice } from '@reduxjs/toolkit'

export const GameStates = Object.freeze({ "preGame": 1, "inGame": 2, "postGame": 3 }) // TODO: move this

export const currentGameSlice = createSlice({
  name: 'currentGame',
  initialState: {
    gameState: GameStates.preGame,
    beginTimestamp: 0,
    question: {
      snippet: 'rambo',
      choises: ['a', 'b', 'c'],
    },
    score: 0,
    index: 0,
  },
  reducers: {
    beginGame: (state) => {
      state.gameState = GameStates.inGame
      state.beginTimestamp = Date.now() // TODO: make reducer pure
    },
    endGame: (state) => {
      state.gameState = GameStates.postGame
      state.beginTimestamp = 0
      state.question.snippet = ''
      state.question.choises = []
      state.score = 0
      state.index = 0
    },
    updateScore: (state, action) => {
      state.score += action.payload
    },
    loadQuestion: (state, action) => {
      state.question.snippet = action.payload.snippet
      state.question.choises = action.payload.choises
      state.index++
    },
  },
})

export const { beginGame, endGame, updateScore, loadQuestion } = currentGameSlice.actions
export default currentGameSlice.reducer
