function UserStatsPlayedGame(props) {
  return (
    <div>
      <div>#{props.id}</div>
      <div>{props.timestamp}</div>
      <div>+{props.totalPoints}pt.</div>
    </div>
  )
}

export default UserStatsPlayedGame
