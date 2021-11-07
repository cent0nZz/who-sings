import Countdown from '../countdown/Countdown'
import GameChoise from '../game-choise/GameChoise'
import { updateProgress } from '../../redux/slices/currentGameSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

const CORRECT_CHOISE_POINTS = 50 // TODO: move/change this
const QUESTION_MAX_TIME_SECS = 10 // TODO: move/change this
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
    <div>
      <div>
        <p>“{question.snippet}”</p>
        <ul>
          {
            question.choises
              .map((choise, idx) => <li key={idx}>
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
      <div>
        {props.children}
        <Countdown
          active={activeCountdown && question}
          id={question?.snippet}
          seconds={QUESTION_MAX_TIME_SECS}
          onFinish={handleGameTimeOut}
          leftContent={'Time left: '}
          rightContent={'"'} />
      </div>
    </div>
  )
}

export default GameQuestion
