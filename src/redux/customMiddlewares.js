import { addUser, getUserByName, addPlayedGame } from '../data/clientDatabase'
import { logIn } from './slices/currentUserSlice'
import { endGame } from './slices/currentGameSlice'

export const currentUserMiddleware = () => (next) => (action) => {
  if (logIn.match(action)) {
    let user = getUserByName(action.payload)
    if (!user) {
      user = {
        name: action.payload,
        overralPoints: 0,
        playedGames: [],
      }
      addUser(user)
    }

    action.payload = {
      name: user.name,
      overralPoints: user.overralPoints,
      playedGames: user.playedGames,
    }
  }

  return next(action)
}

export const currentGameMiddleware = ({ getState }) => (next) => (action) => {
  if (endGame.match(action)) {
    const state = getState()

    addPlayedGame({
      timestamp: state.currentGame.time,
      totalPoints: state.currentGame.score,
    }, state.currentUser)
  }

  return next(action)
}
