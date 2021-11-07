import './Modal.scss'

function Modal(props) {
  const handleCloseClick = () => {
    props.onClose()
  }

  if (!props.isActive) {
    return null
  }

  return (
    <div className="modal">
      <button className="modal__close" onClick={handleCloseClick}>X</button>
      <div className="modal__content">
        {props.children}
      </div>
    </div>
  )
}

export default Modal
