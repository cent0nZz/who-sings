import { useState } from 'react'
import './GameChoise.scss'

function GameChoise(props) {
  const [selected, setSelected] = useState(null)
  const selectedClass = selected ? 'game-choise selected' : 'game-choise'
  const revealResultClass = props.revealResult && props.choise.correct ? 'correct' : ''

  const handleChoiseClick = () => {
    setSelected(true)
    setTimeout(() => setSelected(false), props.revealResultTimeMs)
    props.onChoiseClick(props.choise)
  }

  return (
    <button className={`${selectedClass} ${revealResultClass}`}
      disabled={props.isDisabled}
      onClick={handleChoiseClick}
    >
      {props.choise.artistName}
    </button>
  )
}

export default GameChoise
