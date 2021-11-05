import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      Welcome!
      <Link to="/quiz">Play Now</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
  )
}

export default Dashboard
