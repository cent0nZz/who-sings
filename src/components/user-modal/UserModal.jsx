import { useState } from 'react'
import Modal from '../modal/Modal'

function UserModal(props) {
  const [usernameField, setUsernameField] = useState('')

  const handleCloseClick = () => {
    setUsernameField('')
    props.onClose()
  }
  
  const handleLogInClick = () => {
    setUsernameField('')
    props.onSubmit(usernameField)
  }

  const handleUsernameChange = (evt) => {
    setUsernameField(evt.target.value)
  }

  return (
    <Modal isActive={props.isActive} onClose={handleCloseClick}>
      <label>
        Username:
        <input type='text' name='username' autoComplete='off' value={usernameField} onChange={handleUsernameChange} />
      </label>
      <button onClick={handleLogInClick}>LogIn</button>
    </Modal>
  )
}

export default UserModal
