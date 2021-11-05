import { addUser, getUserByName } from '../data/clientDatabase';
import { logIn } from './slices'

export const persistanceMiddleware = () => (next) => (action) => {
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

  return next(action);
}
