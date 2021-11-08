import ProgressBar from '../progress-bar/ProgressBar'
import Countdown from '../countdown/Countdown'
import GameQuestion from '../game-question/GameQuestion'
import { refresh } from '../../redux/slices/currentUserSlice'
import { resetGame, beginGame, endGame, loadNextQuestion } from '../../redux/slices/currentGameSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import GameRecap from '../game-recap/GameRecap'
import { QUESTIONS_PER_GAME_NUM, GAME_INTRO_LENGTH_SECS, GAME_STATES } from '../../constants'

import './Game.scss'

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
    if (currentGameUIIndex < QUESTIONS_PER_GAME_NUM) {
      dispatch(loadNextQuestion())
    } else {
      dispatch(endGame(Date.now()))
      dispatch(refresh())
    }
  }

  let gameMarkup

  if (showGameIntro) {
    gameMarkup = (
      <div className="game">
        <div className="game__intro-countdown">
          <Countdown active={true} seconds={GAME_INTRO_LENGTH_SECS} onFinish={handleBeginGame} />
        </div>
      </div>
    )
  } else {
    switch (currentGame.gameState) {
      case GAME_STATES.preGame:
        gameMarkup = (
          <div className="game game--pre-game">
            <h2 className="game__start-title">Ready to start?</h2>
            <button className="game__start-cta" onClick={() => setShowGameIntro(true)}>Yeah!</button>
          </div>
        )
        break
      case GAME_STATES.inGame:
        gameMarkup = (
          <div className="game game--in-game">
            <GameQuestion goToNextQuestion={goToNextQuestion}>
              <div>Score: {currentGame.score}pt.</div>
              <ProgressBar current={currentGameUIIndex} total={QUESTIONS_PER_GAME_NUM} />
            </GameQuestion>
          </div>
        )
        break
      case GAME_STATES.postGame:
        gameMarkup = (
          <div className="game game--post-game">
            <GameRecap points={currentGame.score} time={currentGame.time} numCorrectChoises={currentGame.numCorrectChoises} totalChoises={QUESTIONS_PER_GAME_NUM} />
          </div>
        )
        break
      default:
        gameMarkup = null
    }
  }

  return (gameMarkup)
}

export default Game
