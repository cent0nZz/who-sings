import { useEffect, useState } from 'react'

function Countdown(props) {
  const [timeLeft, setTimeLeft] = useState()

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
    <div>{timeLeft}</div>
  )
}

export default Countdown
