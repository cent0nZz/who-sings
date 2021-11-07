import { Link } from 'react-router-dom'
import UserStats from '../user-stats/UserStats'
import List from '../list/List'
import { getAllUsers } from '../../data/clientDatabase'

import './Leaderboard.scss'

function Leaderboard() {
  const user = getAllUsers()
    .map((user) => {
      const overralPoints = user.playedGames
        .map(playedGame => playedGame.totalPoints)
        .reduce((prev, curr) => prev + curr, 0)

      return {
        ...user,
        overralPoints,
      }
    })
    .sort((a, b) => b.overralPoints - a.overralPoints)
    .map((user, idx) => <UserStats rank={idx + 1} name={user.name} overralPoints={user.overralPoints} />)

  return (
    <div className="leaderboard">
      <Link className="leaderboard__back" to='/'>Back to Dashboard</Link>
      <div className="leaderboard__list">
        {
          user.length > 0
            ? <List items={user} />
            : <p className="leaderboard__notice">There isn't a played game yet. Be the first!</p>
        }
      </div>
    </div>
  )
}

export default Leaderboard
