import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logIn, logOut } from '../../redux/slices/currentUserSlice'
import UserModal from '../user-modal/UserModal'
import { GameStates } from '../../redux/slices/currentGameSlice'

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
    <div>
      <UserModal isActive={showModal} onSubmit={handleLogIn} onClose={() => setShowModal(false)} />
      {currentUser.isLogged && currentUser.name}
      {
        currentGame.gameState !== GameStates.inGame
          ? (currentUser.isLogged
            ? <button onClick={handleLogOut}>LogOut</button>
            : <button onClick={() => setShowModal(true)}>Proceed to LogIn</button>)
          : ''
      }
    </div>
  )
}

export default User
