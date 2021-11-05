import { useSelector } from 'react-redux'

function UserStats(props) {
  const currentUser = useSelector((state) => state.currentUser)

  return (
    <div>
      {currentUser.isLogged && currentUser.name === props.name && <div>You</div>}
      <div>{props.rank}°</div>
      <div>{props.name}</div>
      <div>{props.overralPoints}pt.</div>
    </div>
  )
}

export default UserStats
