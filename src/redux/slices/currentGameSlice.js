import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRandomTrack, getRandomArtist, getTrackSnippet } from '../../data/rest'

export const GameStates = Object.freeze({ 'preGame': 1, 'inGame': 2, 'postGame': 3 }) // TODO: move this

export const loadNextQuestion = createAsyncThunk(
  'currentGame/loadNextQuestion',
  async () => {
    const randomSnippetPromise = new Promise(async (resolve) => {
      const randomTrack = await getRandomTrack()
      const randomTrackSnippet = await getTrackSnippet(randomTrack.track.id)
      resolve({
        snippet: randomTrackSnippet,
        snippetArtist: randomTrack.artist,
      })
    })
    const [randomSnippet, randomArtistOne, randomArtistTwo] =
      await Promise.all([randomSnippetPromise, getRandomArtist(), getRandomArtist()])

    return {
      ...randomSnippet,
      otherArtists: [randomArtistOne, randomArtistTwo],
    }
  }
)

export const currentGameSlice = createSlice({
  name: 'currentGame',
  initialState: {
    gameState: GameStates.preGame,
    time: 0,
    numCorrectChoises: 0,
    questions: [],
    index: -1,
    score: 0,
  },
  reducers: {
    resetGame: (state) => {
      state.gameState = GameStates.preGame
      state.time = 0
      state.numCorrectChoises = 0
      state.questions = []
      state.index = -1
      state.score = 0
    },
    beginGame: (state, action) => {
      state.gameState = GameStates.inGame
      state.time = action.payload
    },
    endGame: (state, action) => {
      state.gameState = GameStates.postGame
      state.time = Math.round((new Date(action.payload).getTime() - new Date(state.time).getTime()) / 1000)
    },
    updateProgress: (state, action) => {
      state.score += action.payload
      action.payload && state.numCorrectChoises++
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadNextQuestion.pending, (state) => {
      state.index++
    })
    builder.addCase(loadNextQuestion.fulfilled, (state, action) => {
      state.questions.push({
        snippet: action.payload.snippet,
        choises: [
          {
            correct: true,
            artistId: action.payload.snippetArtist.id,
            artistName: action.payload.snippetArtist.name,
          },
          ...action.payload.otherArtists,
        ],
      })
    })
  },
})

export const { resetGame, beginGame, endGame, updateProgress } = currentGameSlice.actions
export default currentGameSlice.reducer
