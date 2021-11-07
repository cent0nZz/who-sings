import User from '../user/User'

import './Header.scss'

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Who Sings?</h1>
      <div className="header__user">
        <User />
      </div>
    </header>
  )
}

export default Header
