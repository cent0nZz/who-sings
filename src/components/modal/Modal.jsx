import './Modal.scss'

function Modal(props) {
  const handleCloseClick = () => {
    props.onClose()
  }

  if (!props.isActive) {
    return null
  }

  return (
    <>
      <div className="modal-bg" aria-hidden></div>
      <div className="modal">
        <div className="modal__header">
          <h3 className="modal__title">{props.title ?? ''}</h3>
          <button className="modal__close" onClick={handleCloseClick}>X</button>
        </div>
        <div className="modal__content">
          {props.children}
        </div>
      </div>
    </>
  )
}

export default Modal
