import Item from "./item";

function List(props) {
  return (
    <ul>
      {props.items.map((item) => (
        <Item key={item.id} educaiton={item} />
      ))}
    </ul>
  );
}

export default List;
