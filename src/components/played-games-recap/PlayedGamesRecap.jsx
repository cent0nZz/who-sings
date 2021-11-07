import { useSelector } from 'react-redux'
import List from '../list/List'
import PlayedGameRecap from '../played-game-recap/PlayedGameRecap'

import './PlayedGamesRecap.scss'

function PlayedGamesRecap() {
  const currentUser = useSelector((state) => state.currentUser)
  const playedGames =
    [...currentUser?.playedGames].sort((a, b) => b.id - a.id)
      .map(playedGame => <PlayedGameRecap id={playedGame.id} timestamp={playedGame.timestamp} totalPoints={playedGame.totalPoints} />)

  return (
    <div className="played-games-recap">
      <List items={playedGames} />
    </div>
  )
}

export default PlayedGamesRecap
