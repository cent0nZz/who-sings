import { useEffect, useState } from 'react'

import './Countdown.scss'

function Countdown(props) {
  const [timeLeft, setTimeLeft] = useState(props.seconds)

  useEffect(() => {
    setTimeLeft(props.seconds)
  }, [props.id, props.seconds])

  useEffect(() => {
    if (!props.active) {
      return
    }
    if (!timeLeft) {
      props.onFinish()
      setTimeLeft(props.seconds)
      return
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [props, timeLeft])

  return (
    <div className="countdown">{props.leftContent}{timeLeft}{props.rightContent}</div>
  )
}

export default Countdown
