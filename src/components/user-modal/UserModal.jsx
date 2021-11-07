import { useState } from 'react'
import Modal from '../modal/Modal'

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

    props.onSubmit(usernameField)
    setUsernameField('')
  }

  const handleUsernameChange = (evt) => {
    setUsernameField(evt.target.value)
  }

  return (
    <Modal isActive={props.isActive} title="Log-In" onClose={handleCloseClick}>
      <label>
        Username:
        <input type='text' name='username' autoComplete='off' value={usernameField} onChange={handleUsernameChange} />
      </label>
      <button onClick={handleLogInClick}>LogIn</button>
    </Modal>
  )
}

export default UserModal
