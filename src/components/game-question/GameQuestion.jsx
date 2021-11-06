import { useSelector } from 'react-redux'
import GameChoise from '../game-choise/GameChoise'
import { shuffleArray } from '../../utils'

function GameQuestion(props) {
  const currentGame = useSelector((state) => state.currentGame)
  const currentQuestion = currentGame.questions[currentGame.index]
  let question

  if (currentQuestion) {
    question = { ...currentQuestion, choises: [...currentQuestion.choises] }
    question.choises = shuffleArray(question.choises)
  } else {
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

  return (
    <div>
      <p>“{question.snippet}”</p>
      <ul>
        {
          question.choises
            .map((choise, idx) => <li key={idx}><GameChoise choise={choise} isDisabled={question.skeleton} onChoiseClick={props.onChoiseClick} /></li>)
        }
      </ul>
    </div>
  )
}

export default GameQuestion
