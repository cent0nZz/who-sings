import ProgressBar from '../progress-bar/ProgressBar'
import Countdown from '../countdown/Countdown'
import GameQuestion from '../game-question/GameQuestion'
import { beginGame, endGame, updateScore, loadQuestion } from '../../redux/slices/currentGameSlice'
import { useSelector, useDispatch } from 'react-redux'
import { GameStates } from '../../redux/slices/currentGameSlice'

const MAX = 10 // TODO: move/change this

function Game() {
  const dispatch = useDispatch()
  const currentGame = useSelector((state) => state.currentGame)

  const handleUserSelection = (choise) => {
    // logic
    if (currentGame.index < MAX) {
      dispatch(updateScore(10))
      dispatch(loadQuestion({
        snippet: 'my bud',
        choises: ['1', '2', '3']
      }))
    } else {
      dispatch(endGame())
    }
  }

  switch (currentGame.gameState) {
    case GameStates.preGame:
      return (
        <div>
          Ready to go?
          <button onClick={() => dispatch(beginGame())}>Yeah!</button>
        </div>
      )
    case GameStates.inGame:
      return (
        <div>
          <GameQuestion onChoiseClick={handleUserSelection} />
          <div>
            <ProgressBar current={currentGame.index} total={MAX} />
            <Countdown />
          </div>
        </div>
      )
    case GameStates.postGame:
      return (
        <div>PostGame</div>
      )
    default:
      return null
  }
}

export default Game
