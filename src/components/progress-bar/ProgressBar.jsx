import './ProgressBar.scss'

function ProgressBar(props) {
  const visualItemClass = 'progress-bar__visual-item'

  return (
    <div className="progress-bar">
      <div className="progress-bar__visual">
        {
          [...Array(props.total)].map((_i, idx) => <div key={idx} className={
            (idx + 1) <= props.current
              ? ((idx + 1) < props.current
                ? `${visualItemClass} ${visualItemClass}--past` : `${visualItemClass} ${visualItemClass}--present`)
              : `${visualItemClass} ${visualItemClass}--future`
          } />)
        }
      </div>
      <div className="progress-bar__text">{props.current}/{props.total}</div>
    </div>
  )
}

export default ProgressBar
