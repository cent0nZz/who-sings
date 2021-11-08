function GameRecap(props) {
  return (
    <div className="game-recap">
      <h3 className="game-recap__title">Game recap:</h3>
      <div  className="game-recap__content">
        <div  className="game-recap__points">+{props.points} points</div>
        <div  className="game-recap__choises">Correct choises: {props.numCorrectChoises}/{props.totalChoises}</div>
        <div  className="game-recap__time">Total time: {props.time}"</div>
      </div>
    </div>
  )
}

export default GameRecap
