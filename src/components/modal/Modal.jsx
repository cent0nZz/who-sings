function Modal(props) {
  const handleCloseClick = () => {
    props.onClose()
  }

  if (!props.isActive) {
    return null
  }

  return (
    <div>
      <button onClick={handleCloseClick}>Close</button>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default Modal
