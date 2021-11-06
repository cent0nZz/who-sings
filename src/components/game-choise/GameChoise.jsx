function GameChoise(props) {
  return (
    <button disabled={props.isDisabled} onClick={() => props.onChoiseClick(props.choise)}>{props.choise.artistName}</button>
  )
}

export default GameChoise
