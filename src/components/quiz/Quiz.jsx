import { Link } from 'react-router-dom'
import Game from '../game/Game'

function Quiz() {
  return (
    <div>
      <Link to="/">Back</Link>
      <Game />
    </div>
  )
}

export default Quiz
