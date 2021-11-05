import { useSelector } from 'react-redux'
import UserStatsPlayedGame from '../user-stats-played-game/UserStatsPlayedGame'

function UserStats() {
  const currentUser = useSelector((state) => state.currentUser)

  return (
    <div>
      <ul>
        {
          currentUser?.playedGames
            .map((playedGame, idx) =>
              <li key={idx}>
                <UserStatsPlayedGame id={playedGame.id} timestamp={playedGame.timestamp} totalPoints={playedGame.totalPoints} />
              </li>)
        }
      </ul>
    </div>
  )
}

export default UserStats
