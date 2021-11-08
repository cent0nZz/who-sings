import './List.scss'

function List(props) {
  return (
    <div className="list">
      <ul className="list__all-items">
        {props.items?.map((item, idx) => <li className="list__item" key={idx}><div className="list__item-inner">{item}</div></li>)}
      </ul>
    </div>
  )
}

export default List
