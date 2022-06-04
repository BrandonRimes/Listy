import { useState, useGlobal } from "reactn";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

const ListItem = (props) => {

  const [activeList, setActiveList] = useGlobal("activeList");

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/listItem/${props.id}`);
    const newItemList = activeList.listItems.filter(item => item._id != props.id)
    setActiveList({
      ...activeList,
      listItems: newItemList
    })
  };

  return (
    <div className="listItem">
      <h4>{props.name}</h4>
      <p>{props.info}</p>
      <button onClick={handleDelete} className="listItemDeleteButton">x</button>
    </div>
  );
};

export default ListItem;
