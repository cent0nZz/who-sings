import ProgressBar from '../progress-bar/ProgressBar'
import Countdown from '../countdown/Countdown'
import GameQuestion from '../game-question/GameQuestion'
import { resetGame, beginGame, endGame, updateProgress, loadNextQuestion } from '../../redux/slices/currentGameSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { GameStates } from '../../redux/slices/currentGameSlice'
import '../../data/rest'
import GameRecap from '../game-recap/GameRecap'

const MAX = 10 // TODO: move/change this
const CORRECT_CHOISE_POINTS = 50 // TODO: move/change this

function Game() {
  const dispatch = useDispatch()
  const currentGame = useSelector((state) => state.currentGame)
  const currentGameUIIndex = currentGame.index + 1

  useEffect(() => {
    return () => {
      dispatch(resetGame())
    }
  }, [dispatch])
 
  const handleBeginGame = () => {
    dispatch(beginGame())
    dispatch(loadNextQuestion())
  }

  const handleUserSelection = (choise) => {
    dispatch(updateProgress(choise.correct ? CORRECT_CHOISE_POINTS : 0))

    if (currentGameUIIndex < MAX) {
      dispatch(loadNextQuestion())
    } else {
      dispatch(endGame())
    }
  }

  let gameMarkup
  switch (currentGame.gameState) {
    case GameStates.preGame:
      gameMarkup = (
        <>
          Ready to go?
          <button onClick={() => handleBeginGame()}>Yeah!</button>
        </>
      )
      break
    case GameStates.inGame:
      gameMarkup = (
        <>
          <GameQuestion onChoiseClick={handleUserSelection} />
          <div>
            <ProgressBar current={currentGameUIIndex} total={MAX} />
            <Countdown />
          </div>
        </>
      )
      break
    case GameStates.postGame:
      gameMarkup = (
        <GameRecap points={currentGame.score} time={1} numCorrectChoises={currentGame.numCorrectChoises} totalChoises={MAX} />
      )
      break
    default:
      gameMarkup = null
  }

  return (
    <div>{gameMarkup}</div>
  )
}

export default Game
