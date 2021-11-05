import { addUser, getUserByName } from '../data/clientDatabase';
import { logIn } from './slices'

export const persistanceMiddleware = () => (next) => (action) => {
  if (logIn.match(action)) {
    let user = getUserByName(action.payload)
    if (!user) {
      user = {
        name: action.payload,
        playedGames: [],
      }
      addUser(user)
    }

    action.payload = {
      name: user.name,
      playedGames: user.playedGames,
    }
  }

  return next(action);
}
