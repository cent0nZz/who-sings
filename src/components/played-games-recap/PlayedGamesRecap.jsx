import { useSelector } from 'react-redux'
import List from '../list/List'
import PlayedGameRecap from '../played-game-recap/PlayedGameRecap'

import './PlayedGamesRecap.scss'

function PlayedGamesRecap() {
  const currentUser = useSelector((state) => state.currentUser)

  if (!currentUser?.playedGames.length) {
    return null
  }

  const playedGames =
    [...currentUser?.playedGames].sort((a, b) => b.id - a.id)
      .map(playedGame => <PlayedGameRecap id={playedGame.id} timestamp={playedGame.timestamp} totalPoints={playedGame.totalPoints} />)

  return (
    <div className="played-games-recap">
      <h3 className="played-games-recap__title">Your latest games:</h3>
      <div className="played-games-recap__list">
        <List items={playedGames} />
      </div>
    </div>
  )
}

export default PlayedGamesRecap
