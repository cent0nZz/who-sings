import { addUser, getUserByName } from '../data/clientDatabase';
import { logIn } from './slices'

export const persistanceMiddleware = () => (next) => (action) => {
  if (logIn.match(action)) {
    let user = getUserByName(action.payload)
    if (!user) {
      user = {
        name: action.payload,
        games: [],
      }
      addUser(user)
    }

    action.payload = {
      name: user.name,
      games: user.games,
    }
  }

  return next(action);
}
