import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserStats from '../user-stats/UserStats'

function Dashboard() {
  const currentUser = useSelector((state) => state.currentUser)

  return (
    <div>
      <h2>{currentUser.isLogged ? `Welcome ${currentUser.name}` : 'Welcome!'}</h2>
      <Link to="/quiz">Play Now</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      {currentUser.isLogged && <UserStats />}
    </div>
  )
}

export default Dashboard
