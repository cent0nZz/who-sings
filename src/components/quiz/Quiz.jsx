import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../modal/Modal'
import Game from '../game/Game'
import { GAME_STATES } from '../../constants'

import './Quiz.scss'

function Quiz() {
  const currentGame = useSelector((state) => state.currentGame)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="quiz">
      <Modal isActive={showModal} title="Quit confirmation" onClose={() => setShowModal(false)}>
        <div className="quit-quiz">
          Are you sure you want to quit the current game? All the progress and stats will be lost!
          <div className="quit-quiz__actions">
            <Link className="quit-quiz__action quit-quiz__action--yes" to='/'>Yes, quit</Link>
            <button className="quit-quiz__action quit-quiz__action--no" onClick={() => setShowModal(false)}>No, stay</button>
          </div>
        </div>
      </Modal>
      {
        currentGame.gameState === GAME_STATES.inGame
          ? <button className="quiz__back--button" onClick={() => setShowModal(true)}>Back to Dashboard</button>
          : <Link className="quiz__back--link" to='/'>Back to Dashboard</Link>
      }
      <Game />
    </div>
  )
}

export default Quiz
