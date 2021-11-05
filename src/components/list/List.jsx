function List(props) {
  return (
    <ul>
      {props.items?.map((item, idx) => <li key={idx}>{item}</li>)}
    </ul>
  )
}

export default List
