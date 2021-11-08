import User from '../user/User'

import './Header.scss'

function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">Who Sings?</h1>
        <div className="header__user">
          <User />
        </div>
      </div>
    </header>
  )
}

export default Header
