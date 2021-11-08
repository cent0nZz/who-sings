import { useSelector } from 'react-redux'

import './UserStats.scss'

function UserStats(props) {
  const currentUser = useSelector((state) => state.currentUser)

  return (
    <>
      {
        currentUser.isLogged && <div className="user-stats__you">{currentUser.name === props.name ? 'You' : ''}</div>
      }
      <div className="user-stats__rank">{props.rank}°</div>
      <div className="user-stats__name">{props.name}</div>
      <div className="user-stats__points">{props.overralPoints}pt.</div>
    </>
  )
}

export default UserStats
