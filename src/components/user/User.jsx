import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logIn, logOut } from '../../redux/slices/currentUserSlice'
import UserModal from '../user-modal/UserModal'
import { GAME_STATES } from '../../constants'

import './User.scss'

function User() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)
  const currentGame = useSelector((state) => state.currentGame)
  const [showModal, setShowModal] = useState(false)

  const handleLogIn = (name) => {
    dispatch(logIn(name))
    setShowModal(false)
  }

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className="user">
      <UserModal isActive={showModal} onSubmit={handleLogIn} onClose={() => setShowModal(false)} />
      <div className="user__name">{currentUser.isLogged && currentUser.name}</div>
      {
        currentGame.gameState !== GAME_STATES.inGame
          ? (currentUser.isLogged
            ? <button className="user__cta user__cta--logout" onClick={handleLogOut}>Log-Out</button>
            : <button className="user__cta user__cta--login" onClick={() => setShowModal(true)}>Log-In</button>)
          : ''
      }
    </div>
  )
}

export default User
