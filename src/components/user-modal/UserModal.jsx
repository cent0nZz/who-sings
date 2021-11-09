import { useState } from 'react'
import Modal from '../modal/Modal'

import './UserModal.scss'

function UserModal(props) {
  const [usernameField, setUsernameField] = useState('')

  const handleCloseClick = () => {
    setUsernameField('')
    props.onClose()
  }

  const handleLogInClick = () => {
    if (!usernameField) {
      alert('Please insert a username!')
      return
    }
    if (usernameField.length > 15) {
      alert('The username cannot exceed 15 characters in length!')
      return
    }

    props.onSubmit(usernameField)
    setUsernameField('')
  }

  const handleUsernameChange = (evt) => {
    setUsernameField(evt.target.value)
  }

  return (
    <Modal isActive={props.isActive} title="Log-In" onClose={handleCloseClick}>
      <div className="user-modal">
        <label className="user-modal__label">
          Username:
          <input className="user-modal__input" type="text" name="username" autoComplete="off" value={usernameField} onChange={handleUsernameChange} />
        </label>
        <button className="user-modal__cta" onClick={handleLogInClick}>LogIn</button>
      </div>
    </Modal>
  )
}

export default UserModal
