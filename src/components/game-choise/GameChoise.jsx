function GameChoise(props) {
  return (
    <button onClick={() => props.onChoiseClick(props.choise)}>{props.choise.artistName}</button>
  )
}

export default GameChoise
