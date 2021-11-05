import { useSelector } from 'react-redux'
import List from '../list/List'
import UserStatsPlayedGame from '../user-stats-played-game/UserStatsPlayedGame'

function UserStats() {
  const currentUser = useSelector((state) => state.currentUser)

  const playedGames =
    currentUser?.playedGames.map(playedGame =>
      <UserStatsPlayedGame id={playedGame.id} timestamp={playedGame.timestamp} totalPoints={playedGame.totalPoints} />)

  return (
    <div>
      <List items={playedGames} />
    </div>
  )
}

export default UserStats
