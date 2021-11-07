import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PlayedGamesRecap from '../played-games-recap/PlayedGamesRecap'

import './Dashboard.scss'

function Dashboard() {
  const currentUser = useSelector((state) => state.currentUser)
  const playButtonClass = currentUser.isLogged
    ? 'dashboard__action dashboard__action--play'
    : 'dashboard__action dashboard__action--play disabled'

  return (
    <div className="dashboard">
      <h2 className="dashboard__welcome">{currentUser.isLogged ? `Welcome ${currentUser.name}!` : 'Welcome!'}</h2>
      <p className="dashboard__description">
        Challenge yourself into this musical quiz game.
        {
          !currentUser.isLogged && ' Log-In to play now!'
        }
      </p>
      <div className="dashboard__actions">
        <Link className={playButtonClass} to='/quiz'>Play Now</Link>
        <Link className="dashboard__action dashboard__action--leaderboard" to='/leaderboard'>Leaderboard</Link>
      </div>
      {currentUser.isLogged && <PlayedGamesRecap />}
    </div>
  )
}

export default Dashboard
