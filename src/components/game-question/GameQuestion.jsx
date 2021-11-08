import Countdown from '../countdown/Countdown'
import GameChoise from '../game-choise/GameChoise'
import { updateProgress } from '../../redux/slices/currentGameSlice'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'

import './GameQuestion.scss'

const CORRECT_CHOISE_POINTS = 50 // TODO: move/change this
const QUESTION_MAX_TIME_SECS = 100000000 // TODO: move/change this
const REVEAL_RESULT_TIME_MS = 2500 // TODO: move/change this

function GameQuestion(props) {
  const dispatch = useDispatch()
  const [activeCountdown, setActiveCountdown] = useState(true)
  const [revealResult, setRevealResult] = useState(false)
  const currentGame = useSelector((state) => state.currentGame)
  const currentQuestion = currentGame.questions[currentGame.index]
  let question = currentQuestion

  if (!question) {
    question = {
      skeleton: true,
      snippet: '...',
      choises: [
        { artistName: '...' },
        { artistName: '...' },
        { artistName: '...' },
      ]
    }
  }

  const handleRevealResult = async () => {
    setActiveCountdown(false)
    setRevealResult(true)
    await new Promise(resolve => setTimeout(resolve, REVEAL_RESULT_TIME_MS))
    setRevealResult(false)
    setActiveCountdown(true)
  }

  const handleChoiseClick = async (choise) => {
    dispatch(updateProgress(choise.correct ? CORRECT_CHOISE_POINTS : 0))
    await handleRevealResult()
    props.goToNextQuestion()
  }

  const handleGameTimeOut = async () => {
    await handleRevealResult()
    props.goToNextQuestion()
  }

  return (
    <div className="game-question">
      <div className="game-question__top">
        <p className="game-question__snippet">“{question.snippet}”</p>
        <ul className="game-question__choises">
          {
            question.choises
              .map((choise, idx) => <li className="game-question__choise" key={idx}>
                <GameChoise
                  choise={choise}
                  revealResult={revealResult}
                  isDisabled={question.skeleton || revealResult}
                  onChoiseClick={handleChoiseClick}
                  revealResultTimeMs={REVEAL_RESULT_TIME_MS} />
              </li>)
          }
        </ul>
      </div>
      <div className="game-question__bottom">
        {React.Children.toArray(props.children).map((child, idx) => <div key={idx}>{child}</div>)}
        <div>
          <Countdown
            active={activeCountdown && question}
            id={question?.snippet}
            seconds={QUESTION_MAX_TIME_SECS}
            onFinish={handleGameTimeOut}
            leftContent={'⌛ '}
            rightContent={'"'} />
        </div>
      </div>
    </div>
  )
}

export default GameQuestion
