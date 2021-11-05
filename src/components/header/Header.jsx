import User from '../user/User'
import { useSelector } from 'react-redux'
import { GameStates } from '../../redux/slices/currentGameSlice'

function Header() {
  const currentGame = useSelector((state) => state.currentGame)

  return (
    <header>
      <h1>Who Sings?</h1>
      {currentGame.gameState !== GameStates.inGame && <User />}
    </header>
  )
}

export default Header
