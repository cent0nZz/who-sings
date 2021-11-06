import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './slices/currentUserSlice'
import currentGameSlice from './slices/currentGameSlice'
import { currentUserMiddleware, currentGameMiddleware } from './customMiddlewares'

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    currentGame: currentGameSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(currentUserMiddleware).concat(currentGameMiddleware)
})
