import ProgressBar from '../progress-bar/ProgressBar'
import Countdown from '../countdown/Countdown'
import GameQuestion from '../game-question/GameQuestion'
import { refresh } from '../../redux/slices/currentUserSlice'
import { resetGame, beginGame, endGame, loadNextQuestion, GameStates } from '../../redux/slices/currentGameSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import '../../data/rest'
import GameRecap from '../game-recap/GameRecap'

const MAX = 10 // TODO: move/change this
const GAME_INTRO_LENGTH_SECS = 3 // TODO: move/change this

function Game() {
  const [showGameIntro, setShowGameIntro] = useState(false)
  const dispatch = useDispatch()
  const currentGame = useSelector((state) => state.currentGame)
  const currentGameUIIndex = currentGame.index + 1

  useEffect(() => {
    return () => {
      dispatch(resetGame())
    }
  }, [dispatch])

  const handleBeginGame = () => {
    setShowGameIntro(false)

    dispatch(beginGame(Date.now()))
    dispatch(loadNextQuestion())
  }

  const goToNextQuestion = () => {
    if (currentGameUIIndex < MAX) {
      dispatch(loadNextQuestion())
    } else {
      dispatch(endGame(Date.now()))
      dispatch(refresh())
    }
  }

  let gameMarkup

  if (showGameIntro) {
    gameMarkup = (
      <Countdown active={true} seconds={GAME_INTRO_LENGTH_SECS} onFinish={handleBeginGame} />
    )
  } else {
    switch (currentGame.gameState) {
      case GameStates.preGame:
        gameMarkup = (
          <>
            Ready to go?
            <button onClick={() => setShowGameIntro(true)}>Yeah!</button>
          </>
        )
        break
      case GameStates.inGame:
        gameMarkup = (
          <GameQuestion goToNextQuestion={goToNextQuestion}>
            <>
              Score: {currentGame.score}pt.
              <ProgressBar current={currentGameUIIndex} total={MAX} />
            </>
          </GameQuestion>
        )
        break
      case GameStates.postGame:
        gameMarkup = (
          <GameRecap points={currentGame.score} time={currentGame.time} numCorrectChoises={currentGame.numCorrectChoises} totalChoises={MAX} />
        )
        break
      default:
        gameMarkup = null
    }
  }

  return (
    <div>{gameMarkup}</div>
  )
}

export default Game
