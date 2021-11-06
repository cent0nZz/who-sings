import { useSelector } from 'react-redux'
import GameChoise from '../game-choise/GameChoise'
import { shuffleArray } from '../../utils'

function GameQuestion(props) {
  const currentGame = useSelector((state) => state.currentGame)
  const currentQuestion = currentGame.questions[currentGame.index]

  if (!currentQuestion) { // TODO: check this
    return null
  }

  const shuffledChoises = shuffleArray([...currentQuestion.choises])

  return (
    <div>
      <p>"{currentQuestion.snippet}"</p>
      <ul>
        {
          shuffledChoises
            .map((choise, idx) => <li key={idx}><GameChoise choise={choise} onChoiseClick={props.onChoiseClick} /></li>)
        }
      </ul>
    </div>
  )
}

export default GameQuestion
