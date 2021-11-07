import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../modal/Modal'
import Game from '../game/Game'
import { GameStates } from '../../redux/slices/currentGameSlice'

function Quiz() {
  const currentGame = useSelector((state) => state.currentGame)
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Modal isActive={showModal} onClose={() => setShowModal(false)}>
        Are you sure you want to quit the current game? All the progress and stats will be lost!
        <div>
          <Link to='/'>Yes, quit</Link>
          <button onClick={() => setShowModal(false)}>No, stay</button>
        </div>
      </Modal>
      {
        currentGame.gameState === GameStates.inGame
          ? <button onClick={() => setShowModal(true)}>Back to Dashboard</button>
          : <Link to='/'>Back to Dashboard</Link>
      }
      <Game />
    </div>
  )
}

export default Quiz
