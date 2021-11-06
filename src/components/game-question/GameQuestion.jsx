import { useSelector } from 'react-redux'

function GameQuestion(props) {
  const currentGame = useSelector((state) => state.currentGame)
  const currentQuestion = currentGame.questions[currentGame.index]

  if (!currentQuestion) {
    return null
  }

  return (
    <div>
      <p>{currentQuestion.snippet}</p>
      <div>
        {
          currentQuestion.choises.map((choise, idx) => <button key={idx} onClick={() => props.onChoiseClick(choise.id)}>{choise.name}</button>)
        }
      </div>
    </div>
  )
}

export default GameQuestion
