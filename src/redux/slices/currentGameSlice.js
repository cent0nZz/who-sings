import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRandomTrack, getRandomArtist, getTrackSnippet } from '../../data/rest';

export const GameStates = Object.freeze({ "preGame": 1, "inGame": 2, "postGame": 3 }) // TODO: move this

export const loadNextQuestion = createAsyncThunk(
  'currentGame/loadNextQuestion',
  async () => { // TODO: promise.all
    const randomTrack = await getRandomTrack()
    const randomArtistOne = await getRandomArtist()
    const randomArtistTwo = await getRandomArtist()
    const randomTrackSnippet = await getTrackSnippet(randomTrack.track.id)

    return {
      snippet: randomTrackSnippet,
      snippetArtist: randomTrack.artist,
      otherArtists: [randomArtistOne, randomArtistTwo]
    }
  }
)

export const currentGameSlice = createSlice({
  name: 'currentGame',
  initialState: {
    gameState: GameStates.preGame,
    beginTimestamp: 0,
    questions: [],
    index: -1,
    score: 0,
  },
  reducers: {
    resetGame: (state) => {
      state.gameState = GameStates.preGame
      state.beginTimestamp = 0
      state.questions = []
      state.index = -1
      state.score = 0
    },
    beginGame: (state) => {
      state.gameState = GameStates.inGame
      state.beginTimestamp = Date.now() // TODO: make reducer pure
    },
    endGame: (state) => {
      state.gameState = GameStates.postGame
      // TODO: intercept with middleware to save stats
    },
    updateScore: (state, action) => {
      state.score += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadNextQuestion.fulfilled, (state, action) => {
      state.questions.push({
        snippet: action.payload.snippet,
        choises: [action.payload.snippetArtist, ...action.payload.otherArtists]
      })
      state.index++
    })
  },
})

export const { resetGame, beginGame, endGame, updateScore } = currentGameSlice.actions
export default currentGameSlice.reducer
