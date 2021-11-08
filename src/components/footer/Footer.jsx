import './Footer.scss'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__notice">
          <span>Built by <span className="footer__name">Christian Centonze</span>.</span>
          <span>Powered by <span className="footer__name">Musixmatch</span>.</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
