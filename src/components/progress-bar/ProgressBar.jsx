function ProgressBar(props) {
  return (
    <div>
      <div>
        {
          [...Array(props.total)].map((_i, idx) => <div key={idx} className={
            (idx + 1) <= props.current
              ? ((idx + 1) < props.current
                ? 'past' : 'present')
              : 'future'
          } />)
        }
      </div>
      <div>{props.current}/{props.total}</div>
    </div>
  )
}

export default ProgressBar
