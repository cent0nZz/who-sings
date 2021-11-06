function GameRecap(props) {
  return (
    <div>
      <p>Nice work!</p>
      <div>
        <div>+{props.points}pt.</div>
        <div>Correct: {props.numCorrectChoises}/{props.totalChoises}</div>
        <div>Time: {props.time}'</div>
      </div>
    </div>
  )
}

export default GameRecap
