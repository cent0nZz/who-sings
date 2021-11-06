import { Link } from 'react-router-dom'
import UserStats from '../user-stats/UserStats'
import List from '../list/List'
import { getAllUsers } from '../../data/clientDatabase'

function Leaderboard() {
  const users = getAllUsers().sort((a, b) => b.overralPoints - a.overralPoints)
    .map((user, idx) => <UserStats rank={idx + 1} name={user.name} overralPoints={user.overralPoints} />) // TODO: (maybe) move this

  return (
    <div>
      <Link to='/'>Back to Dashboard</Link>
      {users.length > 0 ? <List items={users} /> : 'There isn\'t a played game yet. Be the first!'}
    </div>
  )
}

export default Leaderboard
