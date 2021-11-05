import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './slices'
import { persistanceMiddleware } from './customMiddlewares'

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceMiddleware)
})
