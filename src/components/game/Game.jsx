import ProgressBar from '../progress-bar/ProgressBar'
import Countdown from '../countdown/Countdown'
import GameQuestion from '../game-question/GameQuestion'
import { beginGame, endGame, updateScore, loadNextQuestion } from '../../redux/slices/currentGameSlice'
import { useSelector, useDispatch } from 'react-redux'
import { GameStates } from '../../redux/slices/currentGameSlice'
import '../../data/rest'

const MAX = 10 // TODO: move/change this

function Game() {
  const dispatch = useDispatch()
  const currentGame = useSelector((state) => state.currentGame)

  const handleBeginGame = () => {
    dispatch(beginGame())
    dispatch(loadNextQuestion())
  }

  const handleUserSelection = (choise) => {
    // logic
    if (currentGame.index < MAX) {
      dispatch(updateScore(10))
      dispatch(loadNextQuestion())
    } else {
      dispatch(endGame())
    }
  }

  let dynamicContent
  switch (currentGame.gameState) {
    case GameStates.preGame:
      dynamicContent = (<>
        Ready to go?
        <button onClick={() => handleBeginGame()}>Yeah!</button>
      </>)
      break;
    case GameStates.inGame:
      dynamicContent = (
        <>
          <GameQuestion onChoiseClick={handleUserSelection} />
          <div>
            <ProgressBar current={currentGame.index} total={MAX} />
            <Countdown />
          </div>
        </>
      )
      break;
    case GameStates.postGame:
      dynamicContent = (
        <>PostGame</>
      )
      break;
    default:
      dynamicContent = null
  }

  return (
    <div>{dynamicContent}</div>
  )
}

export default Game
