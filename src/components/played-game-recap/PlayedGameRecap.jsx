function PlayedGameRecap(props) {
  return (
    <div>
      <div>#{props.id}</div>
      <div>{new Date(props.timestamp).toLocaleString(navigator.language)}</div>
      <div>+{props.totalPoints}pt.</div>
    </div>
  )
}

export default PlayedGameRecap
