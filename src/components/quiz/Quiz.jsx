import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../modal/Modal'
import Game from '../game/Game'
import { GameStates } from '../../redux/slices/currentGameSlice'

import './Quiz.scss'

function Quiz() {
  const currentGame = useSelector((state) => state.currentGame)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="quiz">
      <Modal isActive={showModal} onClose={() => setShowModal(false)}>
        Are you sure you want to quit the current game? All the progress and stats will be lost!
        <div className="quit-quiz">
          <Link className="quit-quiz__yes" to='/'>Yes, quit</Link>
          <button className="quit-quiz__no" onClick={() => setShowModal(false)}>No, stay</button>
        </div>
      </Modal>
      {
        currentGame.gameState === GameStates.inGame
          ? <button className="quiz__back style-as-anchor" onClick={() => setShowModal(true)}>Back to Dashboard</button>
          : <Link className="quiz__back" to='/'>Back to Dashboard</Link>
      }
      <Game />
    </div>
  )
}

export default Quiz
