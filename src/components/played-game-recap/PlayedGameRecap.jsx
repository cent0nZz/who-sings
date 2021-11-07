import './PlayedGameRecap.scss'

function PlayedGameRecap(props) {
  return (
    <div className="played-game-recap">
      <div className="played-game-recap__id">#{props.id}</div>
      <div className="played-game-recap__time">{new Date(props.timestamp).toLocaleString(navigator.language)}</div>
      <div className="played-game-recap__points">+{props.totalPoints}pt.</div>
    </div>
  )
}

export default PlayedGameRecap
