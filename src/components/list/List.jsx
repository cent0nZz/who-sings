import './List.scss'

function List(props) {
  return (
    <ul className="list">
      {props.items?.map((item, idx) => <li className="list__item" key={idx}>{item}</li>)}
    </ul>
  )
}

export default List
