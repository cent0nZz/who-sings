import ProgressBar from '../progress-bar/ProgressBar'
import Countdown from '../countdown/Countdown'
import GameQuestion from '../game-question/GameQuestion'
import { refresh } from '../../redux/slices/currentUserSlice'
import { resetGame, beginGame, endGame, updateProgress, loadNextQuestion, GameStates } from '../../redux/slices/currentGameSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import '../../data/rest'
import GameRecap from '../game-recap/GameRecap'

const MAX = 10 // TODO: move/change this
const CORRECT_CHOISE_POINTS = 50 // TODO: move/change this
const QUESTION_MAX_TIME_SECS = 10 // TODO: move/change this
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

  const handleUserSelection = (choise) => {
    dispatch(updateProgress(choise.correct ? CORRECT_CHOISE_POINTS : 0))
    goToNextQuestion()
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
        const currentQuestion = currentGame.questions[currentGame.index]

        gameMarkup = (
          <>
            <GameQuestion onChoiseClick={handleUserSelection} />
            <div>
              Score: {currentGame.score}pt.
              <ProgressBar current={currentGameUIIndex} total={MAX} />
              <Countdown active={currentQuestion} id={currentQuestion?.snippet} seconds={QUESTION_MAX_TIME_SECS} onFinish={goToNextQuestion} leftContent={'Time left: '} rightContent={'"'} />
            </div>
          </>
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
