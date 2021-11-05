import { useSelector } from 'react-redux'

function GameQuestion(props) {
  const currentGame = useSelector((state) => state.currentGame)

  return (
    <div>
      <p>{currentGame.question.snippet}</p>
      <div>
        {
          currentGame.question.choises.map((choise, idx) => <button key={idx} onClick={() => props.onChoiseClick(choise)}>{choise}</button>)
        }
      </div>
    </div>
  )
}

export default GameQuestion
