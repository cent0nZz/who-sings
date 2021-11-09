import { currentGameSlice, loadNextQuestion } from './currentGameSlice'

test('loadNextQuestion.fulfilled reducer does add the new question to the state in the expected structure, and contains one choise marked as correct', () => {
  const initialState = { questions: [] }
  const action = {
    type: loadNextQuestion.fulfilled.type,
    payload: {
      snippet: 'snippet',
      snippetArtist: {
        id: 0,
        name: 'mario',
      },
      otherArtists: [
        {
          artistId: 1,
          artistName: 'luigi',
        },
        {
          artistId: 2,
          artistName: 'peach',
        },
      ],
    },
  }
  const state = currentGameSlice.reducer(initialState, action)

  expect(state.questions.length).toEqual(1)
  expect(state.questions[0]).toEqual(expect.objectContaining({
    snippet: action.payload.snippet,
    choises: expect.any(Array),
  }))

  const choises = state.questions[0].choises
  expect(choises.length).toEqual(3)

  // Makes sure there is one and only one correct choise out of all 3
  const correctChoises = choises.filter(choise => choise.correct)
  expect(correctChoises.length).toEqual(1)

  // Makes sure the choise marked as correct is the actual correct one based on mock
  const [correctChoise] = correctChoises
  expect(correctChoise.artistId).toEqual(action.payload.snippetArtist.id)

  // Makes sure the choises shuffle happened
  expect(choises.some((choise, idx) => idx !== choise.artistId)).toEqual(true)
})
