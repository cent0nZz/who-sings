import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import currentUserReducer from './slices/currentUserSlice'
import currentGameSlice from './slices/currentGameSlice'

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        currentUser: currentUserReducer,
        currentGame: currentGameSlice,
      }, preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
